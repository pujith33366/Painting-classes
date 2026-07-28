import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

export default function ArtJourneyPage() {
  const { childId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Top Breadcrumb & Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '28px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(139, 115, 85, 0.15)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8B7355', marginBottom: '4px' }}>
            <Link to="/dashboard" style={{ color: '#E8A0BF', textDecoration: 'none', fontWeight: 600 }}>Family Portal</Link>
            <span>/</span>
            <span>Art Journey</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            Creative Timeline ({childId || 'Aarav'})
          </h1>
        </div>
        <span
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
            color: '#3D3232',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid #FFB5A7',
          }}
        >
          🚀 Scheduled for Phase 7
        </span>
      </div>

      {/* Center Showcase Card */}
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '48px 32px',
          textAlign: 'center',
          border: '1px solid rgba(139, 115, 85, 0.1)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
          maxWidth: '680px',
          margin: '20px auto',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #FFF0F5, #F0EEFF)',
            border: '1.5px solid #E8A0BF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            margin: '0 auto 24px auto',
            boxShadow: '0 8px 24px rgba(232, 160, 191, 0.15)',
          }}
        >
          🎨
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#3D3232', margin: '0 0 12px 0' }}>
          Weekly Artwork Gallery & Feedback
        </h2>
        <p style={{ fontSize: '15px', color: '#6B5E5E', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 28px auto' }}>
          A beautiful chronological timeline of your child's artistic milestones—complete with weekly artwork photos and teacher notes!
        </p>

        <div style={{ marginTop: '24px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                background: '#F5F0E8',
                color: '#3D3232',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ← Back to Family Dashboard
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
