import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

/* ============================================================
   SIGN-IN PAGE — Painting Studio
   Connected to Firebase Auth & Demo Testing Mode
   ============================================================ */

export default function LoginPage() {
  const { user, loginWithGoogle, loginAsDemoAdmin, loginAsDemoParent, isDemoMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || null;

  // Auto-redirect if user is already logged in
  useEffect(() => {
    if (user) {
      const destination = from || (user.role === 'admin' ? '/admin' : '/dashboard');
      navigate(destination, { replace: true });
    }
  }, [user, navigate, from]);

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setIsSubmitting(true);
      const loggedInUser = await loginWithGoogle();
      const destination = from || (loggedInUser?.role === 'admin' ? '/admin' : '/dashboard');
      navigate(destination, { replace: true });
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    navigate(from || '/admin', { replace: true });
  };

  const handleDemoParent = () => {
    loginAsDemoParent();
    navigate(from || '/dashboard', { replace: true });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        background: '#FFFDFB',
        overflowX: 'hidden',
      }}
    >
      {/* ============================================================
          LEFT PANEL: Artistic Showcase & Studio Benefits (Desktop/Tablet)
          ============================================================ */}
      <div
        style={{
          flex: '1 1 550px',
          minWidth: '320px',
          background: 'linear-gradient(135deg, #FFE8D0 0%, #FFF0F5 50%, #F0EEFF 100%)',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          borderRight: '1px solid rgba(139, 115, 85, 0.1)',
        }}
      >
        {/* Decorative background blobs */}
        <div
          style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'rgba(255, 181, 167, 0.35)',
            filter: 'blur(60px)',
            top: '-80px',
            right: '-60px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(161, 140, 209, 0.25)',
            filter: 'blur(60px)',
            bottom: '20px',
            left: '-40px',
            pointerEvents: 'none',
          }}
        />

        {/* Top Brand Header */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF9A9E, #FECFEF, #A18CD1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            🎨
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: '#3D3232' }}>
            Painting Studio
          </span>
        </div>

        {/* Middle Content */}
        <div style={{ position: 'relative', zIndex: 10, margin: '60px 0', maxWidth: '520px' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'var(--font-accent)', fontSize: '22px', color: '#E8A0BF', display: 'block', marginBottom: '12px', fontWeight: 600 }}
          >
            Artistic Journey Starts Here
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', fontWeight: 700, color: '#3D3232', lineHeight: '1.2', marginBottom: '24px' }}
          >
            Nurturing creativity, one brushstroke at a time.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontSize: '16px', color: '#6B5E5E', lineHeight: '1.7', marginBottom: '36px' }}
          >
            Sign in to access your child's creative portfolio, register for upcoming painting sessions, and track their artistic milestones with personal teacher feedback.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {[
              { icon: '🌟', title: 'Weekly Art Journey', desc: 'See progress photos and personalized teacher notes after each class.' },
              { icon: '🖼️', title: 'Digital Portfolio', desc: 'A secure, permanent digital gallery of all your child’s completed artworks.' },
              { icon: '🗓️', title: 'Instant Registration', desc: 'Book workshops, manage attendance, and receive schedule reminders.' },
            ].map((feat, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(10px)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 12px rgba(139, 115, 85, 0.05)',
                }}
              >
                <span style={{ fontSize: '26px', flexShrink: 0 }}>{feat.icon}</span>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#3D3232', margin: '0 0 2px 0' }}>
                    {feat.title}
                  </h4>
                  <p style={{ fontSize: '13px', color: '#8B7355', margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <div style={{ position: 'relative', zIndex: 10, paddingTop: '24px', borderTop: '1px solid rgba(139, 115, 85, 0.15)' }}>
          <p style={{ fontStyle: 'italic', fontSize: '14px', color: '#6B5E5E', margin: '0 0 6px 0', lineHeight: '1.6' }}>
            "Every child is an artist. The problem is how to remain an artist once we grow up."
          </p>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#8B7355', display: 'block' }}>
            — Pablo Picasso
          </span>
        </div>
      </div>

      {/* ============================================================
          RIGHT PANEL: Sign-In Form Column
          ============================================================ */}
      <div
        style={{
          flex: '1 1 450px',
          minWidth: '320px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px',
          background: 'white',
          position: 'relative',
        }}
      >
        {/* Top Bar with Back Link */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#6B5E5E',
              background: '#F5F0E8',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Centered Sign-In Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            maxWidth: '420px',
            width: '100%',
            margin: '40px auto',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #FFF0F5, #F0EEFF)',
              border: '1.5px solid #E8A0BF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 24px rgba(232, 160, 191, 0.2)',
            }}
          >
            ✨
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: '0 0 10px 0' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '15px', color: '#6B5E5E', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            Please sign in with your Google account to access your dashboard and registered classes.
          </p>

          {error && (
            <div
              style={{
                background: '#FFEBEE',
                color: '#C62828',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                marginBottom: '20px',
                border: '1px solid #FFCDD2',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Google Sign-In Button */}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              padding: '16px 24px',
              borderRadius: '16px',
              background: 'white',
              color: '#3D3232',
              border: '2px solid rgba(139, 115, 85, 0.2)',
              fontSize: '16px',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {isSubmitting ? 'Signing in...' : 'Continue with Google'}
          </motion.button>

          {/* Demo Mode Instant Logins */}
          {isDemoMode && (
            <div
              style={{
                marginTop: '24px',
                padding: '20px',
                borderRadius: '16px',
                background: '#FFF8F0',
                border: '1.5px dashed #FFB5A7',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#D84315', marginBottom: '12px' }}>
                ⚡ DEMO TESTING MODE (No API Keys Required)
              </div>
              <p style={{ fontSize: '12px', color: '#8D6E63', margin: '0 0 14px 0', lineHeight: '1.5' }}>
                Test the full application immediately without setting up a Firebase console project:
              </p>
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <button
                  onClick={handleDemoAdmin}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #FFB5A7, #E8A0BF)',
                    color: 'white',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(232, 160, 191, 0.3)',
                  }}
                >
                  👩‍🎨 Sign In as Studio Artist (Admin Portal)
                </button>
                <button
                  onClick={handleDemoParent}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#3D3232',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    fontWeight: 600,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  👨‍👩‍👦 Sign In as Parent (Student Portal)
                </button>
              </div>
            </div>
          )}

          {/* Security & Info Notice */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '28px',
              fontSize: '13px',
              color: '#8B7355',
              background: '#FFF9C4',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid #FFE082',
            }}
          >
            <span>🔒</span>
            <span>Secure OAuth Sign-In • No passwords to remember</span>
          </div>

          <div style={{ margin: '36px 0 24px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(139, 115, 85, 0.15)' }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              For Parents & Staff
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(139, 115, 85, 0.15)' }} />
          </div>

          <p style={{ fontSize: '13px', color: '#8B7355', lineHeight: '1.6', margin: 0 }}>
            New to the studio? Signing in automatically creates your parent profile so you can immediately begin registering for workshops.
          </p>
        </motion.div>

        {/* Bottom Footer Help text */}
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#A18CD1', paddingTop: '20px' }}>
          Need assistance? Contact studio support at info@paintingstudio.art
        </div>
      </div>
    </div>
  );
}
