import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { getClassById } from '../../services/db';

export default function ClassDetailPage() {
  const { sessionId } = useParams();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClass() {
      setLoading(true);
      const data = await getClassById(sessionId);
      setCls(data);
      setLoading(false);
    }
    loadClass();
  }, [sessionId]);

  if (loading) {
    return (
      <div style={{ paddingTop: '140px', background: 'var(--color-cream)', minHeight: '100vh', textAlign: 'center' }}>
        <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎨</span>
        <p style={{ fontSize: '18px', color: '#8B7355', fontWeight: 600 }}>Loading workshop details...</p>
      </div>
    );
  }

  if (!cls) {
    return (
      <div style={{ paddingTop: '140px', background: 'var(--color-cream)', minHeight: '100vh', textAlign: 'center', paddingBottom: '80px' }}>
        <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>❌</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#3D3232', marginBottom: '12px' }}>
          Workshop Not Found
        </h1>
        <p style={{ color: '#6B5E5E', maxWidth: '400px', margin: '0 auto 24px auto' }}>
          The painting session you are looking for may have been archived or removed by the studio instructor.
        </p>
        <Link to="/classes" style={{ textDecoration: 'none' }}>
          <Button variant="primary">← Back to All Workshops</Button>
        </Link>
      </div>
    );
  }

  const seatsLeft = (cls.capacity || 12) - (cls.registeredCount || 0);
  const isFull = seatsLeft <= 0 || cls.status === 'full';

  return (
    <div style={{ paddingTop: '100px', background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <div style={{ height: '320px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', paddingBottom: '36px', background: '#3D3232' }}>
        {cls.image && (
          <img
            src={cls.image}
            alt={cls.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(61,50,50,0.9), transparent)' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/classes"
              style={{ display: 'inline-block', fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: '#FECFEF', textDecoration: 'none', background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '999px', backdropFilter: 'blur(8px)' }}
            >
              ← Back to Workshops
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ background: '#E8A0BF', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                {cls.level || 'All Levels'}
              </span>
              {cls.category && (
                <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>
                  🎨 {cls.category}
                </span>
              )}
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'white', margin: 0, lineHeight: 1.1 }}>
              {cls.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px 24px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '36px',
            alignItems: 'flex-start',
          }}
        >
          {/* Main Content */}
          <motion.div
            style={{ flex: '1 1 560px', minWidth: '300px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              style={{
                background: 'white',
                border: '1px solid rgba(139, 115, 85, 0.1)',
                borderRadius: '24px',
                padding: '36px',
                marginBottom: '28px',
                boxShadow: '0 4px 16px rgba(139, 115, 85, 0.04)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#3D3232', margin: '0 0 16px 0' }}>
                About This Workshop
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#6B5E5E', margin: 0 }}>
                {cls.description}
              </p>
            </div>

            <div
              style={{
                background: 'white',
                border: '1px solid rgba(139, 115, 85, 0.1)',
                borderRadius: '24px',
                padding: '36px',
                boxShadow: '0 4px 16px rgba(139, 115, 85, 0.04)',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#3D3232', margin: '0 0 20px 0' }}>
                Workshop Syllabus & What to Expect
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(cls.syllabus || ['Hands-on step-by-step guidance from studio artists', 'All painting materials and canvas boards provided', 'Take home your finished masterpiece at the end of the session']).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                  >
                    <span
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
                        color: '#3D3232',
                        fontSize: '16px',
                        fontWeight: 700,
                        flexShrink: 0,
                        border: '1px solid #FFB5A7',
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontSize: '16px', color: '#6B5E5E', lineHeight: 1.4 }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Sidebar — Registration Card */}
          <motion.div
            style={{ flex: '0 0 360px', width: '100%', maxWidth: '420px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div
              style={{
                background: 'white',
                border: '2px solid #E8A0BF',
                borderRadius: '24px',
                padding: '32px',
                position: 'sticky',
                top: '100px',
                boxShadow: '0 12px 32px rgba(139, 115, 85, 0.08)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '40px', fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#E8A0BF', display: 'block', lineHeight: 1 }}>
                  {cls.fee}
                </span>
                <span style={{ fontSize: '13px', color: '#8B7355', fontWeight: 600 }}>
                  per student / workshop
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', fontSize: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F5F0E8' }}>
                  <span style={{ color: '#8B7355' }}>📅 Date</span>
                  <span style={{ fontWeight: 600, color: '#3D3232' }}>{cls.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F5F0E8' }}>
                  <span style={{ color: '#8B7355' }}>🕐 Time</span>
                  <span style={{ fontWeight: 600, color: '#3D3232' }}>{cls.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F5F0E8' }}>
                  <span style={{ color: '#8B7355' }}>👩‍🏫 Instructor</span>
                  <span style={{ fontWeight: 600, color: '#3D3232' }}>{cls.instructor || 'Studio Artist'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F5F0E8' }}>
                  <span style={{ color: '#8B7355' }}>📍 Location</span>
                  <span style={{ fontWeight: 600, color: '#3D3232' }}>Studio Hall 1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#8B7355' }}>💺 Seats Status</span>
                  <Badge variant={isFull ? 'error' : seatsLeft <= 3 ? 'warning' : 'success'}>
                    {isFull ? 'Sold Out' : `${seatsLeft} of ${cls.capacity} left`}
                  </Badge>
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  background: '#E8F5E9',
                  color: '#2E7D32',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: '1px solid #A5D6A7',
                }}
              >
                ✅ All paints, brushes & canvas included
              </div>

              {/* Capacity bar */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#8B7355', fontWeight: 600 }}>
                  <span>{cls.registeredCount || 0} registered</span>
                  <span>{cls.capacity} max</span>
                </div>
                <div style={{ width: '100%', height: '10px', borderRadius: '999px', background: '#F5F0E8', overflow: 'hidden' }}>
                  <motion.div
                    style={{
                      height: '100%',
                      borderRadius: '999px',
                      background: isFull || seatsLeft <= 3
                        ? 'linear-gradient(90deg, #FFB74D, #E53935)'
                        : 'linear-gradient(90deg, #FFE8D0, #E8A0BF)',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, ((cls.registeredCount || 0) / cls.capacity) * 100)}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>

              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant={isFull ? 'secondary' : 'primary'} size="lg" style={{ width: '100%' }}>
                  {isFull ? 'Join Waitlist ⏳' : 'Register Now 🎨'}
                </Button>
              </Link>

              <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '14px', color: '#8B7355' }}>
                Sign in to your Family Portal to enroll your child
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
