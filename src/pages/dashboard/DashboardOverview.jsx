import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export default function DashboardOverview() {
  const { user } = useAuth();

  const stats = [
    { label: 'Registered Children', value: '2', icon: '👧', color: '#FFE8D0' },
    { label: 'Upcoming Workshops', value: '3', icon: '📅', color: '#E8F5E9' },
    { label: 'Pending Course Fees', value: '$95', icon: '💰', color: '#FFF9C4' },
  ];

  const upcomingClasses = [
    { title: 'Watercolor Basics', child: 'Aarav Sharma', date: 'Aug 5, 10:00 AM', status: 'registered', payment: 'pending', fee: '$45', instructor: 'Priyanka' },
    { title: 'Mixed Media Fun', child: 'Meera Sharma', date: 'Aug 19, 2:00 PM', status: 'registered', payment: 'received', fee: '$50', instructor: 'Priyanka' },
  ];

  const myChildren = [
    { id: 'child-1', name: 'Aarav Sharma', age: '8 years old', classesCount: 2, latestArtwork: 'Sunset Watercolor', photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200' },
    { id: 'child-2', name: 'Meera Sharma', age: '11 years old', classesCount: 1, latestArtwork: 'Abstract Acrylic', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Welcome Header Bar */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              border: '1px solid #FFB5A7',
              boxShadow: '0 4px 12px rgba(232, 160, 191, 0.2)',
            }}
          >
            👋
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: '0 0 4px 0' }}>
              Welcome back, {user?.displayName?.split(' ')[0] || 'Family'}!
            </h1>
            <p style={{ fontSize: '14px', color: '#6B5E5E', margin: 0 }}>
              Here is your family's creative portfolio, upcoming schedule, and class registrations.
            </p>
          </div>
        </div>
        <Link to="/classes" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="sm">
            + Register for Workshop
          </Button>
        </Link>
      </div>

      {/* Stats Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card hoverable={false} style={{ padding: '22px', borderRadius: '18px', background: 'white', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>
                    {stat.label}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 700, color: '#3D3232', margin: 0, lineHeight: 1 }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 2-Column Split: Upcoming Classes & My Children */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Upcoming Classes & Fee Actions */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid rgba(139, 115, 85, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F5F0E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>📅</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                Upcoming Workshops
              </h3>
            </div>
            <Link to="/classes" style={{ fontSize: '13px', fontWeight: 600, color: '#E8A0BF', textDecoration: 'none' }}>
              Browse Schedule →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {upcomingClasses.map((cls, idx) => (
              <div
                key={idx}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: '#FFFDFB',
                  border: cls.payment === 'pending' ? '1.5px solid #FFB5A7' : '1px solid #F5F0E8',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#3D3232', margin: '0 0 4px 0' }}>
                      {cls.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: '#8B7355', margin: '0 0 6px 0', fontWeight: 500 }}>
                      👧 Student: {cls.child}
                    </p>
                    <span style={{ fontSize: '12px', color: '#6B5E5E' }}>
                      🕐 {cls.date} · 👩‍🏫 {cls.instructor}
                    </span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <Badge variant={cls.payment === 'received' ? 'success' : 'warning'}>
                      {cls.payment === 'received' ? '✓ Fee Paid' : '⏳ Payment Pending'}
                    </Badge>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#3D3232', marginTop: '4px' }}>
                      {cls.fee}
                    </div>
                  </div>
                </div>

                {cls.payment === 'pending' && (
                  <div style={{ paddingTop: '10px', borderTop: '1px dashed #FFCDD2', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', color: '#D84315', fontWeight: 500 }}>
                      ⚠️ Please send fee via Zelle before class
                    </span>
                    <button
                      onClick={() => alert(`Please send ${cls.fee} via Zelle to our studio phone number: +1 (415) 555-0199 (Painting Studio LLC).`)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #FFB5A7, #E8A0BF)',
                        color: 'white',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(232, 160, 191, 0.3)',
                      }}
                    >
                      Pay Now →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Registered Children & Art Journeys */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid rgba(139, 115, 85, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F5F0E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>👧</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                My Children & Art Profiles
              </h3>
            </div>
            <button
              onClick={() => alert('Add New Child profile will be enabled in Phase 6!')}
              style={{ background: 'transparent', border: 'none', fontSize: '13px', fontWeight: 600, color: '#E8A0BF', cursor: 'pointer' }}
            >
              + Add Child
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {myChildren.map((child) => (
              <div
                key={child.id}
                style={{
                  padding: '16px',
                  borderRadius: '16px',
                  background: '#FFFDFB',
                  border: '1px solid #F5F0E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img
                    src={child.photo}
                    alt={child.name}
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #FFE8D0' }}
                  />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#3D3232', margin: '0 0 2px 0' }}>
                      {child.name}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#8B7355' }}>
                      {child.age} · 🎨 {child.classesCount} Active Classes
                    </span>
                    <div style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 500, marginTop: '2px' }}>
                      ✨ Latest Piece: {child.latestArtwork}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link to={`/dashboard/children/${child.id}`} style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: '#F5F0E8',
                        color: '#3D3232',
                        border: 'none',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Profile
                    </button>
                  </Link>
                  <Link to={`/dashboard/art-journey/${child.id}`} style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
                        color: '#3D3232',
                        border: '1px solid #FFB5A7',
                        fontWeight: 600,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Art Journey ✨
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', padding: '16px', borderRadius: '14px', background: '#FFF9F5', border: '1px dashed #FFB5A7', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: '#8B7355', margin: 0 }}>
              🌟 <strong>Tip:</strong> Click "Art Journey ✨" to view weekly teacher notes and progress photos uploaded after each painting session!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
