import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

/* ============================================================
   ADMIN STUDENT PROGRESS & ART JOURNEY UPLOADER
   Upload paintings and write teacher praise notes for families!
   ============================================================ */

const studentsRoster = [
  { id: 'st-1', name: 'Aarav Sharma', age: '8 yrs', parent: 'Priya Sharma', class: 'Watercolor Landscapes' },
  { id: 'st-2', name: 'Meera Kapoor', age: '10 yrs', parent: 'Rahul Kapoor', class: 'Watercolor Landscapes' },
  { id: 'st-3', name: 'Vivaan Mukherjee', age: '7 yrs', parent: 'Anita Mukherjee', class: 'Watercolor Landscapes' },
  { id: 'st-4', name: 'Anaya Patel', age: '9 yrs', parent: 'Suresh Patel', class: 'Acrylic Explorations' },
  { id: 'st-5', name: 'Kavya Singhania', age: '11 yrs', parent: 'Deepak Singhania', class: 'Acrylic Explorations' },
];

const initialArtTimeline = {
  'st-1': [
    { id: 'art-1', title: 'Sunset Glow Silhouette', date: 'Jul 28, 2026', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400', notes: 'Aarav mastered wet-on-wet watercolor blending today! Notice the smooth transition between orange and deep violet.', teacher: 'Priyanka' },
    { id: 'art-2', title: 'Autumn Leaf Study', date: 'Jul 21, 2026', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=400', notes: 'Excellent attention to leaf vein texture and stippling details using fine ink pens.', teacher: 'Priyanka' },
  ],
  'st-2': [
    { id: 'art-3', title: 'Golden Horizon Landscape', date: 'Jul 28, 2026', image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=400', notes: 'Meera showed incredible patience with layering acrylic washes. Her brushwork is getting very confident!', teacher: 'Priyanka' },
  ],
};

export default function AdminProgressPage() {
  const [selectedStudentId, setSelectedStudentId] = useState('st-1');
  const [timelines, setTimelines] = useState(initialArtTimeline);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    date: 'Aug 5, 2026',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=500',
    notes: '',
  });

  const currentStudent = studentsRoster.find((s) => s.id === selectedStudentId) || studentsRoster[0];
  const currentTimeline = timelines[selectedStudentId] || [];

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.notes) {
      alert('Please enter an artwork title and teacher notes!');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newEntry = {
        id: `art-${Date.now()}`,
        title: form.title,
        date: form.date,
        image: form.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=500',
        notes: form.notes,
        teacher: 'Priyanka (Studio Artist)',
      };
      setTimelines((prev) => ({
        ...prev,
        [selectedStudentId]: [newEntry, ...(prev[selectedStudentId] || [])],
      }));
      setIsSubmitting(false);
      setIsModalOpen(false);
      setForm({
        title: '',
        date: 'Aug 5, 2026',
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=500',
        notes: '',
      });
      alert(`✨ Successfully published new artwork for ${currentStudent.name}! The family can now view it on their dashboard.`);
    }, 800);
  };

  const handleDeleteArt = (artId, title) => {
    if (window.confirm(`Delete "${title}" from ${currentStudent.name}'s Art Journey timeline?`)) {
      setTimelines((prev) => ({
        ...prev,
        [selectedStudentId]: prev[selectedStudentId].filter((a) => a.id !== artId),
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Header */}
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
            <span>Student Progress & Art Journey</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            Art Journey & Praise Note Uploader
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            Upload photos of completed paintings and publish teacher feedback directly to each student's family portal.
          </p>
        </div>

        <div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + Upload New Artwork & Praise Note
          </Button>
        </div>
      </div>

      {/* Student Selection Pill Bar */}
      <div style={{ background: '#FFFDFB', padding: '16px', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.15)', marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#8B7355', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
          👧 Select Student to View or Upload Art Journey:
        </span>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {studentsRoster.map((st) => {
            const isSelected = st.id === selectedStudentId;
            return (
              <button
                key={st.id}
                onClick={() => setSelectedStudentId(st.id)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '14px',
                  background: isSelected ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'white',
                  color: isSelected ? '#3D3232' : '#6B5E5E',
                  border: isSelected ? '1.5px solid #FFB5A7' : '1px solid rgba(0,0,0,0.1)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(232, 160, 191, 0.25)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                👧 {st.name} ({st.age})
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Student Profile Header Box */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid rgba(139, 115, 85, 0.12)', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '32px', border: '2px solid #FFB5A7' }}>
            🎨
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#3D3232', margin: '0 0 4px 0' }}>
              {currentStudent.name}'s Art Journey Timeline
            </h2>
            <p style={{ fontSize: '14px', color: '#6B5E5E', margin: 0 }}>
              👨‍👩‍👧 Parent: <strong>{currentStudent.parent}</strong> · Enrolled in: <strong>{currentStudent.class}</strong> · Total Artworks Uploaded: <strong>{currentTimeline.length}</strong>
            </p>
          </div>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
          ✨ Add Artwork for {currentStudent.name}
        </Button>
      </div>

      {/* Timeline Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {currentTimeline.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>🖼️</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#3D3232', margin: '0 0 6px 0' }}>No artworks published yet for {currentStudent.name}</h3>
            <p style={{ color: '#6B5E5E', fontSize: '14px', margin: '0 0 20px 0' }}>Click the upload button above to add their first painting and teacher praise!</p>
            <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>+ Upload Artwork Now</Button>
          </div>
        ) : (
          currentTimeline.map((art) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(139, 115, 85, 0.12)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ height: '240px', position: 'relative', background: '#F5F0E8' }}>
                  <img src={art.image} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.9)', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#3D3232' }}>
                    📅 {art.date}
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: '#3D3232', margin: '0 0 10px 0' }}>
                    {art.title}
                  </h3>

                  <div style={{ background: '#FFF8F0', padding: '16px', borderRadius: '16px', borderLeft: '4px solid #E8A0BF', marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#E8A0BF', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                      🌟 Teacher Praise & Notes ({art.teacher || 'Studio Artist'})
                    </span>
                    <p style={{ fontSize: '14px', color: '#6B5E5E', margin: 0, lineHeight: 1.5, fontStyle: 'italic' }}>
                      "{art.notes}"
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ padding: '0 24px 20px 24px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F5F0E8', paddingTop: '16px' }}>
                <button
                  onClick={() => handleDeleteArt(art.id, art.title)}
                  style={{ padding: '8px 14px', borderRadius: '10px', background: '#FFEBEE', color: '#C62828', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  🗑️ Delete Entry
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* UPLOAD MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(61, 50, 50, 0.7)', backdropFilter: 'blur(6px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ background: 'white', borderRadius: '24px', padding: '36px', width: '100%', maxWidth: '580px', position: 'relative', zIndex: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.25)', border: '1px solid rgba(139, 115, 85, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F5F0E8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '26px' }}>✨</span>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                    Add Art Journey for {currentStudent.name}
                  </h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#8B7355' }}>✕</button>
              </div>

              <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Artwork Title <span style={{ color: '#D32F2F' }}>*</span></label>
                  <input type="text" required placeholder="e.g., Sunset Glow Silhouette Study" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', outline: 'none' }} />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Workshop Date / Phase</label>
                  <input type="text" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Artwork Image URL</label>
                  <input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} />
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>🌟 Teacher Praise & Notes <span style={{ color: '#D32F2F' }}>*</span></label>
                  <textarea rows="4" required placeholder="Write encouraging feedback about their technique, brushwork, or color choice..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 20px', borderRadius: '12px', background: '#F5F0E8', color: '#6B5E5E', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>{isSubmitting ? 'Publishing...' : '✨ Publish to Art Journey'}</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
