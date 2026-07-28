import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PUBLIC_NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-white/70 backdrop-blur-sm border-b border-white/40 py-4'
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline group">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-sm shrink-0"
            style={{
              background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 50%, #A18CD1 100%)',
            }}
          >
            🎨
          </div>
          <div>
            <span
              className="font-heading text-lg sm:text-xl font-bold block leading-none"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Painting Studio
            </span>
            <span
              className="font-accent text-xs block mt-1"
              style={{ color: 'var(--color-primary)' }}
            >
              Art & Classes
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {PUBLIC_NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative font-medium text-sm tracking-wide no-underline py-1"
              style={{
                color:
                  location.pathname === link.path
                    ? 'var(--color-primary)'
                    : 'var(--color-text-secondary)',
              }}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                  style={{
                    background:
                      'linear-gradient(90deg, var(--color-rose), var(--color-lavender))',
                  }}
                />
              )}
            </Link>
          ))}

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="btn btn-secondary btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
                  color: '#3D3232',
                  border: '1px solid #FFB5A7',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                {user.role === 'admin' ? '👩‍🎨 Studio Admin' : '👶 My Dashboard'}
              </Link>
              <button
                onClick={logout}
                className="btn btn-ghost btn-sm"
                style={{ color: '#8B7355', fontSize: '13px' }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <motion.span
            animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 rounded-full"
            style={{ background: 'var(--color-text-primary)', display: 'block' }}
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 rounded-full"
            style={{ background: 'var(--color-text-primary)', display: 'block' }}
          />
          <motion.span
            animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 rounded-full"
            style={{ background: 'var(--color-text-primary)', display: 'block' }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-gray-100"
            style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)' }}
          >
            <div className="container py-4 flex flex-col gap-3">
              {PUBLIC_NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="py-2.5 px-4 rounded-xl text-base font-medium no-underline"
                  style={{
                    color:
                      location.pathname === link.path
                        ? 'var(--color-primary)'
                        : 'var(--color-text-secondary)',
                    background:
                      location.pathname === link.path
                        ? 'var(--color-primary-light)'
                        : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F5F0E8' }}>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="btn btn-secondary"
                    style={{
                      background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
                      color: '#3D3232',
                      textAlign: 'center',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {user.role === 'admin' ? '👩‍🎨 Studio Admin Portal' : '👶 My Dashboard'}
                  </Link>
                  <button
                    onClick={logout}
                    className="btn btn-ghost"
                    style={{ color: '#8B7355', width: '100%' }}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary mt-2" style={{ textDecoration: 'none', textAlign: 'center' }}>
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
