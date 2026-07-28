import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../components/ui/Button';

const categories = ['All', 'Landscape', 'Floral', 'Abstract', 'Seascape', 'Nature', 'Portrait'];

const paintings = [
  { id: 1, title: 'Sunset Meadow', category: 'Landscape', medium: 'Oil on Canvas', year: '2024', gradient: 'linear-gradient(135deg, #FFDAB9, #FFB5A7)', aspectRatio: '3/4' },
  { id: 2, title: 'Ocean Breeze', category: 'Seascape', medium: 'Watercolor', year: '2024', gradient: 'linear-gradient(135deg, #B0E0E6, #A18CD1)', aspectRatio: '4/3' },
  { id: 3, title: 'Spring Garden', category: 'Floral', medium: 'Acrylic', year: '2023', gradient: 'linear-gradient(135deg, #C8E6C9, #FFE082)', aspectRatio: '1/1' },
  { id: 4, title: 'Golden Hour', category: 'Abstract', medium: 'Mixed Media', year: '2024', gradient: 'linear-gradient(135deg, #FFE082, #FFB5A7)', aspectRatio: '3/4' },
  { id: 5, title: 'Lavender Dreams', category: 'Floral', medium: 'Watercolor', year: '2023', gradient: 'linear-gradient(135deg, #E6E6FA, #FECFEF)', aspectRatio: '4/5' },
  { id: 6, title: 'Cherry Blossom', category: 'Nature', medium: 'Oil on Canvas', year: '2024', gradient: 'linear-gradient(135deg, #FECFEF, #FFB5A7)', aspectRatio: '3/4' },
  { id: 7, title: 'Morning Mist', category: 'Landscape', medium: 'Watercolor', year: '2023', gradient: 'linear-gradient(135deg, #E0F4F8, #E6E6FA)', aspectRatio: '16/9' },
  { id: 8, title: 'Dancing Petals', category: 'Abstract', medium: 'Acrylic', year: '2024', gradient: 'linear-gradient(135deg, #FECFEF, #FFE082)', aspectRatio: '1/1' },
  { id: 9, title: 'Coral Reef', category: 'Seascape', medium: 'Oil on Canvas', year: '2023', gradient: 'linear-gradient(135deg, #FFB5A7, #B0E0E6)', aspectRatio: '3/4' },
  { id: 10, title: 'Rose Garden', category: 'Floral', medium: 'Watercolor', year: '2024', gradient: 'linear-gradient(135deg, #F5C6D0, #E6E6FA)', aspectRatio: '4/5' },
  { id: 11, title: 'Mountain Glow', category: 'Landscape', medium: 'Acrylic', year: '2024', gradient: 'linear-gradient(135deg, #FFDAB9, #C8E6C9)', aspectRatio: '16/9' },
  { id: 12, title: 'Dreamy Waves', category: 'Abstract', medium: 'Mixed Media', year: '2023', gradient: 'linear-gradient(135deg, #A18CD1, #FECFEF)', aspectRatio: '3/4' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPainting, setSelectedPainting] = useState(null);

  const filtered = activeCategory === 'All'
    ? paintings
    : paintings.filter((p) => p.category === activeCategory);

  return (
    <div style={{ paddingTop: '120px', background: 'var(--color-cream)', minHeight: '100vh' }}>
      {/* Header */}
      <div className="container text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: '1.25rem', color: 'var(--color-primary)', display: 'block', marginBottom: '8px' }}>
            Portfolio
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '12px' }}>
            Art Gallery
          </h1>
          <div className="divider" style={{ width: '60px', height: '3px', background: 'linear-gradient(90deg, #E8A0BF, #A18CD1)', margin: '16px auto', borderRadius: '99px' }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: '550px', margin: '0 auto', lineHeight: '1.6' }}>
            A curated collection of original paintings — each piece inspired by nature, emotion, and imagination.
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 40px auto', padding: '0 24px' }}>
        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeCategory === cat
                  ? 'linear-gradient(135deg, #E8A0BF, #A18CD1)'
                  : 'white',
                color: activeCategory === cat ? 'white' : '#6B5E5E',
                border: activeCategory === cat ? 'none' : '1px solid rgba(139, 115, 85, 0.15)',
                boxShadow: activeCategory === cat ? '0 4px 15px rgba(232, 160, 191, 0.35)' : '0 2px 6px rgba(0,0,0,0.03)',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Masonry Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 80px 24px' }}>
        <motion.div className="masonry-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((painting, index) => (
              <motion.div
                key={painting.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <motion.div
                  style={{
                    background: 'white',
                    border: '1px solid rgba(139, 115, 85, 0.1)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 16px rgba(139, 115, 85, 0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(139, 115, 85, 0.12)' }}
                  onClick={() => setSelectedPainting(painting)}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: painting.aspectRatio,
                      background: painting.gradient,
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                    }}
                  >
                    🎨
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '999px',
                          fontSize: '12px',
                          fontWeight: 600,
                          background: 'rgba(255,255,255,0.92)',
                          color: '#3D3232',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        }}
                      >
                        {painting.category}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#3D3232', margin: '0 0 6px 0' }}>
                      {painting.title}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#8B7355' }}>
                      <span>{painting.medium}</span>
                      <span>{painting.year}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPainting && (
          <motion.div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              background: 'rgba(61, 50, 50, 0.75)',
              backdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPainting(null)}
          >
            <motion.div
              style={{
                background: 'white',
                borderRadius: '24px',
                maxWidth: '700px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
              }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  background: selectedPainting.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '80px',
                  position: 'relative',
                }}
              >
                🎨
                <button
                  onClick={() => setSelectedPainting(null)}
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    fontSize: '18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, background: '#F5F0E8', color: '#8B7355' }}>
                    {selectedPainting.category}
                  </span>
                  <span style={{ fontSize: '14px', color: '#8B7355' }}>{selectedPainting.year}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: '0 0 8px 0' }}>
                  {selectedPainting.title}
                </h2>
                <p style={{ fontSize: '15px', color: '#6B5E5E', margin: '0 0 24px 0' }}>
                  {selectedPainting.medium} — Original Artwork
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                  <Button variant="outline" onClick={() => setSelectedPainting(null)}>
                    Close
                  </Button>
                  <Button variant="primary">
                    Inquire About This Piece
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
