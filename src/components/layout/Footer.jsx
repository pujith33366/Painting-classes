import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PUBLIC_NAV_LINKS } from '../../utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--color-cream) 0%, var(--color-beige) 100%)',
        borderTop: '1px solid rgba(139, 115, 85, 0.08)',
      }}
    >
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 50%, #A18CD1 100%)',
                }}
              >
                P
              </div>
              <span className="font-heading text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Painting Studio
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
              A creative space where art comes alive. Explore stunning paintings,
              enroll in inspiring classes, and watch your child's artistic journey unfold.
            </p>
            {/* Social Icons Placeholder */}
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold no-underline"
                  style={{
                    background: 'white',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid rgba(139, 115, 85, 0.1)',
                  }}
                  aria-label={social}
                >
                  {social[0]}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              {PUBLIC_NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm no-underline transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="text-sm no-underline transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>
              Get in Touch
            </h4>
            <ul className="flex flex-col gap-3 list-none">
              <li className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                📧 hello@paintingstudio.com
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                📱 +1 (415) 555-0199
              </li>
              <li className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                📍 Studio Address, City
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(139, 115, 85, 0.08)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {currentYear} Painting Studio. All rights reserved.
          </p>
          <p className="text-xs font-accent text-base" style={{ color: 'var(--color-primary)' }}>
            Made with 🎨 and ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
