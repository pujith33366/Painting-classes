import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getClasses, createClass, updateClass, deleteClass, resetDemoData } from '../../services/db';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

/* ============================================================
   ADMIN SESSION & WORKSHOP MANAGEMENT PORTAL
   Create, Edit, Toggle Status, and Delete painting classes!
   ============================================================ */

export default function AdminSessionsPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for creating a new class
  const [formData, setFormData] = useState({
    title: '',
    category: 'Watercolor',
    date: '2026-09-10',
    time: '10:00 AM - 12:30 PM',
    instructor: 'Priyanka',
    fee: '$50',
    capacity: 12,
    level: 'Beginner',
    description: '',
    image: '',
  });

  const fetchClasses = async () => {
    setLoading(true);
    const data = await getClasses();
    setClasses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      alert('Please enter a workshop title and date!');
      return;
    }
    setIsSubmitting(true);
    await createClass({
      ...formData,
      capacity: Number(formData.capacity) || 12,
    });
    setIsSubmitting(false);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      title: '',
      category: 'Watercolor',
      date: '2026-09-10',
      time: '10:00 AM - 12:30 PM',
      instructor: 'Priyanka',
      fee: '$50',
      capacity: 12,
      level: 'Beginner',
      description: '',
      image: '',
    });
    fetchClasses();
  };

  const handleToggleStatus = async (cls) => {
    const newStatus = cls.status === 'open' ? 'full' : 'open';
    await updateClass(cls.id, { status: newStatus });
    fetchClasses();
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      await deleteClass(id);
      fetchClasses();
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset all workshop classes to default sample data?')) {
      resetDemoData();
      fetchClasses();
    }
  };

  const filteredClasses = classes.filter((cls) => {
    if (filter === 'all') return true;
    if (filter === 'open') return cls.status === 'open' && (cls.capacity - (cls.registeredCount || 0)) > 0;
    if (filter === 'full') return cls.status === 'full' || (cls.capacity - (cls.registeredCount || 0)) <= 0;
    return true;
  });

  // Calculate quick stats
  const totalSeats = classes.reduce((acc, c) => acc + (Number(c.capacity) || 0), 0);
  const totalRegistered = classes.reduce((acc, c) => acc + (Number(c.registeredCount) || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Top Header & Actions */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(139, 115, 85, 0.15)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8B7355', marginBottom: '4px' }}>
            <Link to="/admin" style={{ color: '#E8A0BF', textDecoration: 'none', fontWeight: 600 }}>Studio Admin</Link>
            <span>/</span>
            <span>Workshop Sessions</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            Session Management Portal
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            Create, schedule, edit capacity, and manage student enrollments for all studio painting workshops.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleResetDemo}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              background: '#FFF8F0',
              color: '#8B7355',
              border: '1px dashed rgba(139, 115, 85, 0.4)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Restore original 6 demo workshops"
          >
            🔄 Reset Demo Data
          </button>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Create New Workshop
          </Button>
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        <Card hoverable={false} style={{ padding: '20px', borderRadius: '18px', background: 'white', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#8B7355', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Total Workshops</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>{classes.length}</p>
        </Card>
        <Card hoverable={false} style={{ padding: '20px', borderRadius: '18px', background: 'white', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#8B7355', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Total Seats Filled</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#2E7D32', margin: 0 }}>
            {totalRegistered} <span style={{ fontSize: '16px', fontWeight: 500, color: '#8B7355' }}>/ {totalSeats}</span>
          </p>
        </Card>
        <Card hoverable={false} style={{ padding: '20px', borderRadius: '18px', background: 'white', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#8B7355', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Overall Occupancy</p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#E8A0BF', margin: 0 }}>
            {totalSeats > 0 ? Math.round((totalRegistered / totalSeats) * 100) : 0}%
          </p>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #F5F0E8', paddingBottom: '16px' }}>
        {[
          { id: 'all', label: `All Sessions (${classes.length})` },
          { id: 'open', label: 'Open for Booking' },
          { id: 'full', label: 'House Full / Closed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === tab.id ? '1px solid #FFB5A7' : '1px solid transparent',
              background: filter === tab.id ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'white',
              color: filter === tab.id ? '#3D3232' : '#6B5E5E',
              boxShadow: filter === tab.id ? '0 2px 8px rgba(232, 160, 191, 0.2)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Workshop List Table/Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>🎨</span>
          <p style={{ fontSize: '15px', color: '#8B7355', fontWeight: 600 }}>Loading studio workshops...</p>
        </div>
      ) : filteredClasses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', background: 'white', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>📭</span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#3D3232', margin: '0 0 8px 0' }}>No workshops match this filter</h3>
          <p style={{ color: '#6B5E5E', fontSize: '14px', margin: '0 0 20px 0' }}>Try changing your filter or create a new workshop session.</p>
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>+ Create New Workshop</Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredClasses.map((cls) => {
            const seatsLeft = (cls.capacity || 12) - (cls.registeredCount || 0);
            const isFull = seatsLeft <= 0 || cls.status === 'full';

            return (
              <div
                key={cls.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  border: isFull ? '1px solid #FFCDD2' : '1px solid rgba(139, 115, 85, 0.12)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Left info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '1 1 340px' }}>
                  <img
                    src={cls.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=200'}
                    alt={cls.title}
                    style={{ width: '70px', height: '70px', borderRadius: '16px', objectFit: 'cover', border: '1px solid #F5F0E8', flexShrink: 0 }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                        {cls.title}
                      </h3>
                      <Badge variant={isFull ? 'error' : 'success'}>
                        {isFull ? 'House Full' : 'Open for Booking'}
                      </Badge>
                      <span style={{ fontSize: '12px', background: '#FFF9F5', color: '#8B7355', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                        🎨 {cls.category || 'Workshop'}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', color: '#6B5E5E', margin: '0 0 6px 0' }}>
                      📅 {cls.date} · 🕐 {cls.time}
                    </p>

                    <div style={{ fontSize: '12px', color: '#8B7355', display: 'flex', gap: '14px', flexWrap: 'wrap', fontWeight: 500 }}>
                      <span>👩‍🏫 Instructor: {cls.instructor}</span>
                      <span>•</span>
                      <span>🎓 Level: {cls.level}</span>
                      <span>•</span>
                      <span style={{ color: '#3D3232', fontWeight: 700 }}>💰 {cls.fee}</span>
                    </div>
                  </div>
                </div>

                {/* Center Capacity Indicator */}
                <div style={{ flex: '0 1 200px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', fontWeight: 600, color: isFull ? '#D32F2F' : '#2E7D32' }}>
                    <span>👧 {cls.registeredCount || 0} enrolled</span>
                    <span>{seatsLeft > 0 ? `${seatsLeft} seats left` : 'Sold Out'}</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: '#F5F0E8', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(100, ((cls.registeredCount || 0) / (cls.capacity || 12)) * 100)}%`,
                        background: isFull ? '#E53935' : 'linear-gradient(90deg, #FFE8D0, #E8A0BF)',
                        borderRadius: '999px',
                      }}
                    />
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={() => handleToggleStatus(cls)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: isFull ? '#E8F5E9' : '#FFF9C4',
                      color: isFull ? '#2E7D32' : '#8D6E63',
                      border: '1px solid rgba(0,0,0,0.08)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    title="Toggle Open or Full status"
                  >
                    {isFull ? '🔓 Reopen Seats' : '🔒 Mark House Full'}
                  </button>

                  <Link to={`/classes/${cls.id}`} target="_blank" style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        background: '#F5F0E8',
                        color: '#3D3232',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      title="View public page"
                    >
                      🌐 View
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(cls.id, cls.title)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      background: '#FFEBEE',
                      color: '#C62828',
                      border: 'none',
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                    title="Delete workshop"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CREATE CLASS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(61, 50, 50, 0.65)', backdropFilter: 'blur(6px)' }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '36px',
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                border: '1px solid rgba(139, 115, 85, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #F5F0E8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>🎨</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                    Schedule New Painting Workshop
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#8B7355' }}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                    Workshop Title <span style={{ color: '#D32F2F' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Oil Pastel Sunset Explorations"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', background: 'white' }}
                    >
                      <option value="Watercolor">Watercolor</option>
                      <option value="Acrylic">Acrylic</option>
                      <option value="Kids Fun">Kids Fun</option>
                      <option value="Gouache">Gouache</option>
                      <option value="Abstract">Abstract</option>
                      <option value="Sketching">Sketching</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Skill Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', background: 'white' }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Kids (Ages 4-7)">Kids (Ages 4-7)</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Date <span style={{ color: '#D32F2F' }}>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., 2026-09-15 or Aug 25"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Time Window
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 10:00 AM - 12:30 PM"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Instructor
                    </label>
                    <input
                      type="text"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Fee ($ USD)
                    </label>
                    <input
                      type="text"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>
                      Seat Capacity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: 6 }}>
                    Cover Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: 6 }}>
                    Workshop Description
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Describe what young artists will learn and experience..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{ padding: '12px 20px', borderRadius: '12px', background: '#F5F0E8', color: '#6B5E5E', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Publishing...' : '✨ Publish Workshop'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
