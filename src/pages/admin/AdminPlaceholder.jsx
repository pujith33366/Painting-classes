import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminPlaceholder({ title, icon, phase, description }) {
  const navigate = useNavigate();

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
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginBottom: '28px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(139, 115, 85, 0.15)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8B7355', marginBottom: '4px' }}>
            <Link to="/admin" style={{ color: '#E8A0BF', textDecoration: 'none', fontWeight: 600 }}>Studio Admin</Link>
            <span>/</span>
            <span>{title}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            {title}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
            🚀 Scheduled for {phase}
          </span>

          <button
            onClick={() => navigate('/admin')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '12px',
              background: '#FFEBEE',
              color: '#C62828',
              border: '1px solid #FFCDD2',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            title="Close this section and return to overview"
          >
            <span>✕</span>
            <span>Close Tab</span>
          </button>
        </div>
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
          position: 'relative',
        }}
      >
        {/* Quick Card Close Icon */}
        <button
          onClick={() => navigate('/admin')}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#F5F0E8',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            fontSize: '16px',
            color: '#8B7355',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
          title="Close Tab"
        >
          ✕
        </button>

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
          {icon}
        </div>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: '#3D3232', margin: '0 0 12px 0' }}>
          {title} Portal
        </h2>
        <p style={{ fontSize: '15px', color: '#6B5E5E', lineHeight: '1.6', maxWidth: '480px', margin: '0 auto 28px auto' }}>
          {description}
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFF9C4',
            color: '#8D6E63',
            padding: '10px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 500,
            border: '1px solid #FFE082',
          }}
        >
          <span>💡</span>
          <span>This interactive table and management view is being connected in {phase}.</span>
        </div>

        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate('/admin')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
              color: '#3D3232',
              border: '1px solid #FFB5A7',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(232, 160, 191, 0.25)',
            }}
          >
            ← Close & Return to Overview
          </button>
        </div>
      </div>
    </motion.div>
  );
}
