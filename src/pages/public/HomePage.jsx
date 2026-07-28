import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

/* ============================================================
   HOMEPAGE — Painting Studio
   Ultra-Robust Layout: Fail-proof CSS grid and flex rules
   to prevent text squishing, overlaps, or misalignments.
   ============================================================ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const featuredPaintings = [
  { id: 1, title: 'Sunset Meadow', color: 'linear-gradient(135deg, #FFDAB9, #FFB5A7)', category: 'Landscape' },
  { id: 2, title: 'Ocean Breeze', color: 'linear-gradient(135deg, #B0E0E6, #A18CD1)', category: 'Seascape' },
  { id: 3, title: 'Spring Garden', color: 'linear-gradient(135deg, #C8E6C9, #FFE082)', category: 'Floral' },
  { id: 4, title: 'Golden Hour', color: 'linear-gradient(135deg, #FFE082, #FFB5A7)', category: 'Abstract' },
  { id: 5, title: 'Lavender Dreams', color: 'linear-gradient(135deg, #E6E6FA, #FECFEF)', category: 'Floral' },
  { id: 6, title: 'Cherry Blossom', color: 'linear-gradient(135deg, #FECFEF, #FFB5A7)', category: 'Nature' },
];

const upcomingClasses = [
  { id: 1, title: 'Watercolor Basics', date: 'Aug 5, 2026', age: '6-10 yrs', fee: '$45', seats: 5, gradient: 'linear-gradient(135deg, #B0E0E6, #E6E6FA)' },
  { id: 2, title: 'Acrylic Landscapes', date: 'Aug 12, 2026', age: '8-14 yrs', fee: '$50', seats: 3, gradient: 'linear-gradient(135deg, #C8E6C9, #FFE082)' },
  { id: 3, title: 'Mixed Media Fun', date: 'Aug 19, 2026', age: '5-8 yrs', fee: '$40', seats: 8, gradient: 'linear-gradient(135deg, #FECFEF, #FFDAB9)' },
];

const testimonials = [
  { id: 1, name: 'Priya M.', quote: 'My daughter absolutely loves the classes! Her creativity has blossomed so much since she started.', emoji: '🎨' },
  { id: 2, name: 'Rahul K.', quote: 'The teacher has an incredible way of making art accessible and fun for kids of all skill levels.', emoji: '⭐' },
  { id: 3, name: 'Anita S.', quote: 'The Art Journey feature is wonderful — we can see exactly how our son is progressing each week.', emoji: '🌟' },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden w-full">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section
        className="relative overflow-hidden w-full"
        style={{
          minHeight: '88vh',
          paddingTop: '160px',
          paddingBottom: '80px',
          background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE8D0 25%, #FFF0F5 50%, #F0EEFF 75%, #E0F4F8 100%)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Decorative background blobs */}
        <div className="blob blob-pink" style={{ width: 400, height: 400, top: -100, right: -100 }} />
        <div className="blob blob-lavender" style={{ width: 300, height: 300, bottom: 20, left: -60 }} />
        <div className="blob blob-mint" style={{ width: 220, height: 220, top: '40%', right: '15%' }} />

        <div className="container-wide relative z-10 w-full" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '48px',
              width: '100%',
            }}
          >
            {/* Left Content (Guaranteed min-width 500px so text NEVER squishes) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                flex: '1 1 560px',
                minWidth: '300px',
                maxWidth: '750px',
                textAlign: 'left',
              }}
            >
              <motion.span
                variants={itemVariants}
                className="font-accent block mb-2"
                style={{ color: 'var(--color-primary)', fontSize: '1.85rem', fontWeight: 600 }}
              >
                Welcome to
              </motion.span>

              <motion.h1
                variants={itemVariants}
                className="font-heading font-bold mb-6"
                style={{
                  fontSize: 'clamp(2.75rem, 5.5vw, 4.5rem)',
                  lineHeight: '1.15',
                  color: 'var(--color-text-primary)',
                }}
              >
                <span className="text-gradient">Painting</span> Studio
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mb-8"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  lineHeight: '1.7',
                  maxWidth: '620px',
                }}
              >
                Where creativity blooms. Explore a world of vibrant paintings,
                join inspiring art classes, and nurture your child's artistic journey
                with a passionate artist & teacher.
              </motion.p>

              <motion.div
                variants={itemVariants}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}
              >
                <Link to="/gallery">
                  <Button variant="primary" size="lg">
                    🎨 Explore Gallery
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button variant="outline" size="lg">
                    📚 View Classes
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Decorative Floating Cards Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{
                flex: '0 0 340px',
                height: '380px',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className="hidden lg:flex"
            >
              <div style={{ position: 'relative', width: '320px', height: '360px' }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: 210 - i * 15,
                      height: 270 - i * 15,
                      background: featuredPaintings[i].color,
                      top: i * 45,
                      left: i * 45,
                      zIndex: 3 - i,
                      borderRadius: '20px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      boxShadow: '0 12px 30px rgba(139, 115, 85, 0.15)',
                      border: '1.5px solid rgba(255, 255, 255, 0.7)',
                    }}
                    initial={{ opacity: 0, rotate: -6 + i * 6 }}
                    animate={{
                      opacity: 1,
                      rotate: -8 + i * 8,
                      y: [0, -12, 0],
                    }}
                    transition={{
                      delay: 0.4 + i * 0.2,
                      duration: 0.8,
                      y: {
                        repeat: Infinity,
                        duration: 3.5 + i,
                        ease: 'easeInOut',
                      },
                    }}
                  >
                    <div
                      style={{
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block' }}>
                        {featuredPaintings[i].title}
                      </span>
                      <span style={{ fontSize: '11px', color: '#8B7355', display: 'block' }}>
                        {featuredPaintings[i].category}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FEATURED GALLERY
          ============================================================ */}
      <section style={{ padding: '80px 24px', background: 'white', width: '100%' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <span className="section-label" style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              Featured Works
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px' }}>
              A Glimpse of the Gallery
            </h2>
            <div className="divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #E8A0BF, #A18CD1)', margin: '16px auto', borderRadius: '99px' }} />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Each painting tells a story — discover the beauty in every brushstroke
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              width: '100%',
            }}
          >
            {featuredPaintings.map((painting, index) => (
              <motion.div
                key={painting.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
              >
                <motion.div
                  className="card"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'white',
                    border: '1px solid rgba(139, 115, 85, 0.1)',
                    boxShadow: '0 4px 16px rgba(139, 115, 85, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(139, 115, 85, 0.12)' }}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '4 / 3',
                      background: painting.color,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '16px',
                    }}
                  >
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(8px)',
                        color: '#3D3232',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 600,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      }}
                    >
                      {painting.category}
                    </span>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: '#3D3232', margin: 0 }}>
                        {painting.title}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#8B7355', marginTop: '4px', marginBottom: 0 }}>
                        Original Oil & Acrylic on Canvas
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                View Full Gallery →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT THE ARTIST
          ============================================================ */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #F5F0E8 0%, #FFF5EB 50%, #FFE8D0 100%)',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '48px',
            }}
          >
            {/* Portrait side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                flex: '1 1 360px',
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #FECFEF, #E6E6FA, #B0E0E6)',
                  boxShadow: '0 16px 36px rgba(139, 115, 85, 0.15)',
                  border: '6px solid white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                }}
              >
                <span style={{ fontSize: '80px' }}>👩‍🎨</span>
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: '24px', fontWeight: 700, color: '#4A4A4A' }}>
                  Studio Artist
                </span>
              </div>
            </motion.div>

            {/* Bio side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                flex: '1 1 520px',
                minWidth: '300px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
                About the Artist
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '24px', color: '#3D3232' }}>
                Meet Your Creative Guide
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1.05rem', lineHeight: '1.7', color: '#6B5E5E' }}>
                <p style={{ margin: 0 }}>
                  With over a decade of experience in fine arts and a deep passion
                  for teaching, I believe every child is born with an artist within.
                  My mission is to create a nurturing space where creativity flows
                  freely and every brushstroke is celebrated.
                </p>
                <p style={{ margin: 0 }}>
                  From watercolors to acrylics, mixed media to digital art —
                  my classes are designed to be joyful, exploratory, and tailored
                  to each child's unique creative voice.
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '32px',
                    marginTop: '24px',
                    paddingTop: '24px',
                    borderTop: '1px solid rgba(139, 115, 85, 0.15)',
                  }}
                >
                  {[
                    { num: '500+', label: 'Students Taught' },
                    { num: '10+', label: 'Years Experience' },
                    { num: '200+', label: 'Artworks Created' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <span style={{ fontSize: '28px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: 'linear-gradient(135deg, #FFB5A7, #E8A0BF, #FFCC80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
                        {stat.num}
                      </span>
                      <span style={{ fontSize: '13px', color: '#8B7355', fontWeight: 500, display: 'block', marginTop: '2px' }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AVAILABLE CLASSES
          ============================================================ */}
      <section style={{ padding: '80px 24px', background: 'white', width: '100%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              Upcoming Classes
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px', color: '#3D3232' }}>
              Join an Art Adventure
            </h2>
            <div className="divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #E8A0BF, #A18CD1)', margin: '16px auto', borderRadius: '99px' }} />
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Fun, engaging classes designed to inspire young artists of all skill levels
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {upcomingClasses.map((cls, index) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div
                  style={{
                    background: 'white',
                    border: '1px solid rgba(139, 115, 85, 0.1)',
                    borderRadius: '20px',
                    padding: '24px',
                    boxShadow: '0 4px 16px rgba(139, 115, 85, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: '100%',
                        height: '140px',
                        borderRadius: '16px',
                        marginBottom: '20px',
                        background: cls.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '44px',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)',
                      }}
                    >
                      🎨
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '999px', background: '#FFF9C4', color: '#8D6E63', border: '1px solid #FFE082' }}>
                        👦 {cls.age}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '999px', background: '#E8F5E9', color: '#2E7D32', border: '1px solid #C8E6C9' }}>
                        {cls.seats} seats left
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#3D3232', margin: '0 0 8px 0' }}>
                      {cls.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#8B7355', margin: '0 0 20px 0' }}>
                      📅 {cls.date}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#E8A0BF' }}>
                      {cls.fee}
                    </span>
                    <Link to={`/classes/${cls.id}`}>
                      <Button variant="primary" size="sm">
                        Register →
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <section
        style={{
          padding: '80px 24px',
          background: 'linear-gradient(135deg, #FFF0F5 0%, #F0EEFF 100%)',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
              Parent Love
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px', color: '#3D3232' }}>
              What Parents Say
            </h2>
            <div className="divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #E8A0BF, #A18CD1)', margin: '16px auto', borderRadius: '99px' }} />
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {testimonials.map((t, index) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow: '0 8px 24px rgba(139, 115, 85, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                  }}
                >
                  <p style={{ fontSize: '15px', fontStyle: 'italic', lineHeight: '1.7', color: '#6B5E5E', margin: '0 0 24px 0' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid rgba(139, 115, 85, 0.1)' }}>
                    <span style={{ fontSize: '28px' }}>{t.emoji}</span>
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: '#3D3232', margin: 0 }}>
                        {t.name}
                      </h5>
                      <span style={{ fontSize: '12px', color: '#8B7355' }}>Parent</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <section style={{ padding: '80px 24px', background: 'white', width: '100%', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              padding: '48px 32px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, #FFF8F0 0%, #FFE8D0 50%, #FFF0F5 100%)',
              boxShadow: '0 12px 40px rgba(139, 115, 85, 0.12)',
              border: '2px solid white',
            }}
          >
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎨</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.85rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#3D3232', marginBottom: '16px', margin: '0 0 16px 0' }}>
              Ready to Create Art Together?
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#6B5E5E', maxWidth: '520px', margin: '0 auto 32px auto', lineHeight: '1.6' }}>
              Join our upcoming painting workshops or explore our gallery to find inspiration.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
              <Link to="/classes">
                <Button variant="primary" size="lg">
                  Explore Classes
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="secondary" size="lg">
                  Browse Gallery
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
