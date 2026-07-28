import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { getClasses } from '../../services/db';

export default function ClassesPage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function loadClasses() {
      setLoading(true);
      const data = await getClasses();
      setClasses(data);
      setLoading(false);
    }
    loadClasses();
  }, []);

  const categories = ['All', 'Watercolor', 'Acrylic', 'Kids Fun', 'Gouache', 'Abstract', 'Sketching'];

  const filteredClasses = filter === 'All'
    ? classes
    : classes.filter((c) => c.category === filter || c.level?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div style={{ paddingTop: '120px', background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="container text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label" style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
            Workshop Schedule
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px', color: '#3D3232' }}>
            Art Workshops for Young Creators
          </h1>
          <div className="divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #E8A0BF, #A18CD1)', margin: '16px auto', borderRadius: '99px' }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '580px', margin: '0 auto', lineHeight: '1.6' }}>
            Explore our upcoming studio painting sessions. Each class is designed to be fun, educational, and hands-on, tailored to your child's age and skill level.
          </p>
        </motion.div>
      </div>

      {/* Filter Pills */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 40px auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === cat ? '1px solid #FFB5A7' : '1px solid rgba(139, 115, 85, 0.15)',
              background: filter === cat ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'white',
              color: filter === cat ? '#3D3232' : '#6B5E5E',
              boxShadow: filter === cat ? '0 4px 12px rgba(232, 160, 191, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <span style={{ fontSize: '40px', display: 'block', marginBottom: '16px' }}>🎨</span>
          <p style={{ fontSize: '16px', color: '#8B7355', fontWeight: 600 }}>Loading studio workshops...</p>
        </div>
      ) : (
        /* Class Cards Grid */
        <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 32px 80px 32px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredClasses.map((cls, index) => {
              const seatsLeft = cls.capacity - (cls.registeredCount || 0);
              const isFull = seatsLeft <= 0 || cls.status === 'full';

              return (
                <motion.div
                  key={cls.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                >
                  <div
                    style={{
                      background: 'white',
                      border: '1px solid rgba(139, 115, 85, 0.12)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(139, 115, 85, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'space-between',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <div>
                      {/* Top Image Banner */}
                      <div style={{ height: '200px', position: 'relative', overflow: 'hidden', background: '#F5F0E8' }}>
                        <img
                          src={cls.image}
                          alt={cls.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px' }}>
                          <span
                            style={{
                              background: 'rgba(255, 255, 255, 0.92)',
                              backdropFilter: 'blur(8px)',
                              padding: '4px 12px',
                              borderRadius: '999px',
                              fontSize: '12px',
                              fontWeight: 700,
                              color: '#3D3232',
                              border: '1px solid rgba(0,0,0,0.05)',
                            }}
                          >
                            🎨 {cls.category || 'Workshop'}
                          </span>
                        </div>
                        {isFull && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(61, 50, 50, 0.65)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                            <span style={{ background: '#D32F2F', color: 'white', padding: '6px 18px', borderRadius: '999px', fontWeight: 700, fontSize: '14px', letterSpacing: '0.05em' }}>
                              HOUSE FULL
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#E8A0BF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            {cls.level || 'All Levels'}
                          </span>
                          <span style={{ fontSize: '18px', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#3D3232' }}>
                            {cls.fee}
                          </span>
                        </div>

                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: '#3D3232', margin: '0 0 10px 0', lineHeight: 1.3 }}>
                          {cls.title}
                        </h3>

                        <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '0 0 16px 0', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {cls.description}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 14px', background: '#FFFDFB', borderRadius: '12px', border: '1px solid #F5F0E8', fontSize: '13px', color: '#8B7355', marginBottom: '8px' }}>
                          <div>📅 <strong>Date:</strong> {cls.date}</div>
                          <div>🕐 <strong>Time:</strong> {cls.time}</div>
                          <div>👩‍🏫 <strong>Instructor:</strong> {cls.instructor || 'Studio Artist'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div style={{ padding: '0 24px 24px 24px', display: 'flex', alignItems: 'center', justify: 'space-between', borderTop: '1px solid #F5F0E8', paddingTop: '16px' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: isFull ? '#D32F2F' : seatsLeft <= 3 ? '#E65100' : '#2E7D32' }}>
                          {isFull ? 'Sold Out' : `${seatsLeft} seat${seatsLeft === 1 ? '' : 's'} remaining`}
                        </span>
                      </div>

                      <Link to={`/classes/${cls.id}`} style={{ textDecoration: 'none' }}>
                        <Button variant={isFull ? 'secondary' : 'primary'} size="sm">
                          {isFull ? 'View Details' : 'Register Now →'}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
