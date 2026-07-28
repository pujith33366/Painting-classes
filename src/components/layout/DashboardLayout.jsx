import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DASHBOARD_NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

/* ============================================================
   DASHBOARD LAYOUT — Parent & Student Portal
   Clean top header bar with profile badge, tab navigation,
   and fail-proof centered content container.
   ============================================================ */

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#FFFDFB', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      {/* Top Header Navigation Bar */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(139, 115, 85, 0.12)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxShadow: '0 4px 20px rgba(139, 115, 85, 0.04)',
        }}
      >
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand & Title */}
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #FF9A9E, #FECFEF, #A18CD1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                boxShadow: '0 4px 12px rgba(232, 160, 191, 0.25)',
              }}
            >
              🎨
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#3D3232', display: 'block', lineHeight: 1.1 }}>
                Painting Studio
              </span>
              <span style={{ fontSize: '11px', color: '#E8A0BF', fontWeight: 600, display: 'block', marginTop: '2px', letterSpacing: '0.02em' }}>
                Family Portal
              </span>
            </div>
          </Link>

          {/* Desktop Tab Links */}
          <nav className="hidden md:flex items-center gap-2">
            {DASHBOARD_NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'linear-gradient(135deg, #E8A0BF, #A18CD1)' : 'transparent',
                    color: isActive ? 'white' : '#6B5E5E',
                    boxShadow: isActive ? '0 4px 14px rgba(232, 160, 191, 0.35)' : 'none',
                  }}
                >
                  <span style={{ marginRight: '6px' }}>
                    {link.icon === 'home' && '🏠'}
                    {link.icon === 'search' && '📚'}
                  </span>
                  {link.label}
                </Link>
              );
            })}
            <Link
              to="/"
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#6B5E5E',
                background: '#F5F0E8',
                textDecoration: 'none',
                marginLeft: '6px',
              }}
            >
              ← Public Site
            </Link>
          </nav>

          {/* User Profile Pill & Logout (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '6px 14px 6px 6px',
                borderRadius: '999px',
                background: '#FFF9F5',
                border: '1px solid rgba(139, 115, 85, 0.15)',
              }}
            >
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'}
                alt="Parent"
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {user?.displayName || 'Parent Account'}
              </span>
            </div>
            <button
              onClick={logout}
              style={{
                padding: '8px 14px',
                borderRadius: '999px',
                background: '#FFEBEE',
                color: '#C62828',
                border: '1px solid #FFCDD2',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Log Out
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
            style={{
              background: '#F5F0E8',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '20px',
              cursor: 'pointer',
            }}
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-100"
              style={{ background: 'white', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {DASHBOARD_NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    background: location.pathname === link.path ? '#FFE8D0' : '#F5F0E8',
                    color: '#3D3232',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '10px 16px', borderRadius: '12px', fontSize: '15px', fontWeight: 500, color: '#6B5E5E', background: '#F5F0E8', textDecoration: 'none' }}
              >
                ← View Public Site
              </Link>
              <div style={{ paddingTop: '10px', borderTop: '1px solid #F5F0E8', display: 'flex', alignItems: 'center', justify: 'space-between' }}>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#3D3232' }}>
                  👤 {user?.displayName || 'Parent'}
                </span>
                <button
                  onClick={logout}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#FFEBEE',
                    color: '#C62828',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  Log Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area with generous gap for clean layout */}
      <main style={{ flex: 1, width: '100%', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '48px 64px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
