import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const stats = [
  { label: "Today's Classes", value: '2', icon: '📅', color: '#FFE8D0', link: '/admin/today' },
  { label: 'Total Students', value: '48', icon: '👧', color: '#E8F5E9', link: '/admin/students' },
  { label: 'Pending Payments', value: '12', icon: '💰', color: '#FFF9C4', link: '/admin/payments' },
  { label: 'Active Sessions', value: '6', icon: '🎨', color: '#E0F4F8', link: '/admin/sessions' },
];

const todayClasses = [
  { title: 'Watercolor Basics', time: '10:00 AM - 11:30 AM', students: 7, capacity: 12, status: 'upcoming', instructor: 'Priyanka' },
  { title: 'Acrylic Landscapes', time: '2:00 PM - 4:00 PM', students: 8, capacity: 10, status: 'upcoming', instructor: 'Priyanka' },
];

const recentPayments = [
  { parent: 'Priya Mukherjee', child: 'Aarav M.', amount: '$45', status: 'pending', date: 'Jul 26', method: 'Zelle Request' },
  { parent: 'Rahul Kapoor', child: 'Meera K.', amount: '$50', status: 'received', date: 'Jul 25', method: 'Zelle Transfer' },
  { parent: 'Anita Sharma', child: 'Vivaan S.', amount: '$45', status: 'pending', date: 'Jul 24', method: 'Zelle Transfer' },
];

export default function AdminOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Header Bar */}
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
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: '0 0 6px 0' }}>
            Studio Overview
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: 0 }}>
            Welcome back, Artist! Here is today's schedule and studio summary.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/today" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="sm" style={{ background: 'white', border: '1px solid rgba(139, 115, 85, 0.2)' }}>
              📋 Attendance Sheet
            </Button>
          </Link>
          <Link to="/admin/sessions" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="sm">
              + Create Session
            </Button>
          </Link>
        </div>
      </div>

      {/* Overdue Fee Recovery Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          background: 'linear-gradient(135deg, #FFF5F5, #FFF0F0)',
          border: '2px solid #FFCDD2',
          borderRadius: '20px',
          padding: '20px 24px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap',
          boxShadow: '0 8px 24px rgba(211, 47, 47, 0.06)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 360px' }}>
          <span style={{ fontSize: '32px', background: 'white', width: '56px', height: '56px', borderRadius: '16px', display: 'flex', alignItems: 'center', justify: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', flexShrink: 0 }}>
            🚨
          </span>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#D32F2F', margin: 0 }}>
                Overdue Fee Alert: 4 Families Pending Across Classes
              </h3>
              <Badge variant="error">Action Required</Badge>
            </div>
            <p style={{ fontSize: '14px', color: '#8D6E63', margin: 0, lineHeight: 1.4 }}>
              Total overdue dues of <strong>$195</strong> identified from recent and past workshops. You can send 1-click Zelle reminders to all pending parents.
            </p>
          </div>
        </div>

        <div>
          <Link to="/admin/payments" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF6B6B, #E53935)',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(229, 57, 53, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
            >
              <span>📧</span>
              <span>Open Fee Ledger & 1-Click Remind All →</span>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px',
        }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link to={stat.link} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <Card hoverable style={{ padding: '20px', borderRadius: '16px', background: 'white', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
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
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 2-Column Main Section (Today's Classes & Recent Payments) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* Today's Classes */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid rgba(139, 115, 85, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F5F0E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🎨</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                Today's Workshop Schedule
              </h3>
            </div>
            <Link to="/admin/today" style={{ fontSize: '13px', fontWeight: 600, color: '#E8A0BF', textDecoration: 'none' }}>
              Manage All →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {todayClasses.map((cls) => (
              <div
                key={cls.title}
                style={{
                  padding: '18px',
                  borderRadius: '14px',
                  background: '#FFFDFB',
                  border: '1px solid #F5F0E8',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#3D3232', margin: 0 }}>
                      {cls.title}
                    </h4>
                    <Badge variant="info">{cls.status}</Badge>
                  </div>
                  <p style={{ fontSize: '13px', color: '#6B5E5E', margin: '0 0 6px 0' }}>
                    🕐 {cls.time}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#8B7355', fontWeight: 500 }}>
                    <span>👩‍🏫 Instructor: {cls.instructor}</span>
                    <span>•</span>
                    <span style={{ color: cls.students >= cls.capacity ? '#D32F2F' : '#2E7D32', fontWeight: 600 }}>
                      👧 {cls.students}/{cls.capacity} seats filled
                    </span>
                  </div>
                </div>

                <Link to="/admin/today" style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: '#F5F0E8',
                      color: '#3D3232',
                      border: 'none',
                      fontWeight: 600,
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    Take Attendance →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments & Fee Requests */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid rgba(139, 115, 85, 0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F5F0E8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>💰</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                Recent Fee Activity
              </h3>
            </div>
            <Link to="/admin/payments" style={{ fontSize: '13px', fontWeight: 600, color: '#E8A0BF', textDecoration: 'none' }}>
              View Ledger →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentPayments.map((pay, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  background: '#FFFDFB',
                  border: '1px solid #F5F0E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: pay.status === 'received' ? '#E8F5E9' : '#FFF9C4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                    }}
                  >
                    {pay.status === 'received' ? '✓' : '⏳'}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#3D3232', margin: '0 0 2px 0' }}>
                      {pay.parent} <span style={{ fontWeight: 400, color: '#8B7355' }}>({pay.child})</span>
                    </h4>
                    <span style={{ fontSize: '12px', color: '#8B7355' }}>
                      📅 {pay.date} · {pay.method}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#3D3232' }}>
                    {pay.amount}
                  </span>
                  <Badge variant={pay.status === 'received' ? 'success' : 'warning'}>
                    {pay.status === 'received' ? 'Received' : 'Pending'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F5F0E8', textAlign: 'center' }}>
            <Link to="/admin/payments" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  background: '#FFF8F0',
                  color: '#D84315',
                  border: '1px dashed #FFB5A7',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                📧 Send Payment Reminder Emails to All Pending →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
