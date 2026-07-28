import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ADMIN_NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

/* ============================================================
   ADMIN LAYOUT — Studio Staff & Artist Portal
   Fixed/Collapsible Sidebar on BOTH Desktop & Mobile
   with Universal Top Header Bar & Seamless Tab Closing!
   ============================================================ */

export default function AdminLayout({ children }) {
  // Default sidebar open on desktop (> 1024px), closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Find current active link for header display
  const currentLink = ADMIN_NAV_LINKS.find((link) => link.path === location.pathname) || {
    label: 'Overview',
    icon: 'home',
  };

  const isNotOverview = location.pathname !== '/admin';

  // Toggle tab: if already active, close it and return to Overview
  const handleNavClick = (linkPath) => {
    if (location.pathname === linkPath && linkPath !== '/admin') {
      navigate('/admin');
    }
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F5F0E8', width: '100%', overflowX: 'hidden' }}>
      {/* Universal Top Header Bar (Desktop & Mobile) */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(139, 115, 85, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          zIndex: 40,
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: isSidebarOpen ? '#FFE8D0' : '#F5F0E8',
              border: '1px solid rgba(139, 115, 85, 0.2)',
              padding: '8px 14px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              color: '#3D3232',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            aria-label="Toggle Navigation Sidebar"
          >
            <span>☰</span>
            <span className="hidden sm:inline" style={{ fontSize: '13px' }}>
              {isSidebarOpen ? 'Hide Menu' : 'Show Menu'}
            </span>
          </button>

          {/* Current Active Tab Title Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid rgba(139, 115, 85, 0.2)', paddingLeft: '16px' }}>
            <span style={{ fontSize: '20px' }}>🎨</span>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: '#3D3232', display: 'block', lineHeight: 1.1 }}>
                Studio Admin Portal
              </span>
              <span style={{ fontSize: '12px', color: '#8B7355', fontWeight: 600, display: 'block' }}>
                Active Tab: <strong style={{ color: '#D84315' }}>{currentLink.label}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right Action Bar: Close Tab Button & Exit Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* PROMINENT CLOSE TAB BUTTON (Appears whenever not on Overview) */}
          {isNotOverview && (
            <button
              onClick={() => navigate('/admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '999px',
                background: '#FFEBEE',
                color: '#C62828',
                border: '1.5px solid #FFCDD2',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(211, 47, 47, 0.15)',
                transition: 'all 0.2s',
              }}
              title="Close current section and return to studio overview"
            >
              <span>✕</span>
              <span>Close Tab</span>
            </button>
          )}

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#6B5E5E',
              background: '#F5F0E8',
              textDecoration: 'none',
              border: '1px solid rgba(139, 115, 85, 0.15)',
            }}
          >
            ← Public Site
          </Link>
        </div>
      </header>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(61, 50, 50, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 45,
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar (Closable on BOTH Desktop & Mobile) */}
      <aside
        style={{
          width: '260px',
          background: 'white',
          borderRight: '1px solid rgba(139, 115, 85, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'fixed',
          top: '64px',
          left: 0,
          bottom: 0,
          zIndex: 50,
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: isSidebarOpen ? '4px 0 20px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div>
          {/* Sidebar Header with Close Icon */}
          <div style={{ padding: '16px 20px', background: '#FFFDFB', borderBottom: '1px solid #F5F0E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={user?.photoURL || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'}
                alt="Admin"
                style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E8A0BF' }}
              />
              <div style={{ overflow: 'hidden' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#3D3232', display: 'block', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {user?.displayName || 'Studio Artist'}
                </span>
                <span style={{ fontSize: '11px', color: '#2E7D32', background: '#E8F5E9', padding: '1px 8px', borderRadius: '999px', fontWeight: 600, display: 'inline-block' }}>
                  ✓ Staff Portal
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#8B7355', padding: '4px' }}
              title="Collapse Sidebar"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links List */}
          <nav style={{ padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: 'calc(100vh - 220px)', overflowY: 'auto' }}>
            {ADMIN_NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => {
                    if (isActive && link.path !== '/admin') {
                      e.preventDefault();
                      navigate('/admin');
                    } else {
                      handleNavClick(link.path);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: isActive ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'transparent',
                    color: isActive ? '#3D3232' : '#6B5E5E',
                    border: isActive ? '1px solid #FFB5A7' : '1px solid transparent',
                    boxShadow: isActive ? '0 2px 8px rgba(232, 160, 191, 0.15)' : 'none',
                  }}
                  title={isActive && link.path !== '/admin' ? 'Click again to close this tab and return to Overview' : `Open ${link.label}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px', width: '22px', textAlign: 'center' }}>
                      {link.icon === 'home' && '🏠'}
                      {link.icon === 'calendar' && '📅'}
                      {link.icon === 'layers' && '🎨'}
                      {link.icon === 'users' && '👧'}
                      {link.icon === 'user-check' && '👨‍👩‍👧'}
                      {link.icon === 'credit-card' && '💰'}
                      {link.icon === 'trending-up' && '📈'}
                      {link.icon === 'image' && '🖼️'}
                      {link.icon === 'grid' && '📷'}
                      {link.icon === 'message-circle' && '💬'}
                      {link.icon === 'mail' && '📧'}
                      {link.icon === 'settings' && '⚙️'}
                      {!['home','calendar','layers','users','user-check','credit-card','trending-up','image','grid','message-circle','mail','settings'].includes(link.icon) && '🔹'}
                    </span>
                    <span>{link.label}</span>
                  </div>

                  {/* Show small Close Icon on the active tab in sidebar */}
                  {isActive && link.path !== '/admin' && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate('/admin');
                      }}
                      style={{ fontSize: '12px', background: 'rgba(0,0,0,0.06)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}
                      title="Close Tab"
                    >
                      ✕
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Footer Action Area */}
        <div style={{ padding: '14px', borderTop: '1px solid #F5F0E8', display: 'flex', flexDirection: 'column', gap: '8px', background: '#FFFDFB' }}>
          <button
            onClick={logout}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '10px',
              background: '#FFEBEE',
              color: '#C62828',
              border: '1px solid #FFCDD2',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            <span>🚪</span>
            <span>Log Out of Studio Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area with generous gap between sidebar menu and font */}
      <main
        style={{
          flex: 1,
          minWidth: 0,
          minHeight: 'calc(100vh - 64px)',
          background: '#F5F0E8',
          marginTop: '64px',
          marginLeft: isSidebarOpen ? '260px' : '0',
          transition: 'margin-left 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          paddingBottom: '80px',
        }}
      >
        <div
          style={{
            maxWidth: '1350px',
            margin: '0 auto',
            padding: '48px 64px', // Increased left/right gap to 64px for clean, clear layout!
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          }}
        >
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
