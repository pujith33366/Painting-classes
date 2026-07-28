import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hoverable = true,
  padding = true,
  onClick,
  style,
  ...props
}) {
  const Component = hoverable ? motion.div : 'div';
  const motionProps = hoverable
    ? {
        whileHover: { y: -4, boxShadow: '0 12px 40px rgba(139, 115, 85, 0.12)' },
        transition: { duration: 0.25 },
      }
    : {};

  return (
    <Component
      className={`card ${padding ? 'p-6' : ''} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
      style={style}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`font-heading text-lg font-semibold ${className}`} style={{ color: 'var(--color-text-primary)' }}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`text-sm mt-1 ${className}`} style={{ color: 'var(--color-text-secondary)' }}>
      {children}
    </p>
  );
}
