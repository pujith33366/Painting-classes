export default function Loader({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`spinner ${sizeMap[size]}`} />
    </div>
  );
}

export function PageLoader() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4"
      style={{ minHeight: '60vh' }}
    >
      <Loader size="lg" />
      <p className="text-sm font-accent text-lg" style={{ color: 'var(--color-primary)' }}>
        Loading beautiful things...
      </p>
    </div>
  );
}
