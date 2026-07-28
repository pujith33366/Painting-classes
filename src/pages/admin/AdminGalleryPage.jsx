import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

/* ============================================================
   ADMIN GALLERY, PORTFOLIO & TESTIMONIALS MANAGER
   Manage public website portfolio paintings, photos, and reviews!
   ============================================================ */

const initialPaintings = [
  { id: 'p1', title: 'Serene Sunset Waves', artist: 'Priyanka (Senior Artist)', category: 'Watercolor', year: '2026', featured: true, image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=500' },
  { id: 'p2', title: 'Vibrant Floral Meadow', artist: 'Ananya (Studio Artist)', category: 'Acrylic', year: '2026', featured: true, image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=500' },
  { id: 'p3', title: 'Abstract Gold & Turquoise', artist: 'Priyanka', category: 'Abstract', year: '2025', featured: false, image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=500' },
];

const initialGalleryPhotos = [
  { id: 'g1', caption: 'Little Artists in Studio Hall 1', date: 'Jul 2026', category: 'Workshop Fun', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=500' },
  { id: 'g2', caption: 'Outdoor Botanical Sketching Session', date: 'Jun 2026', category: 'Special Event', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=500' },
];

const initialTestimonials = [
  { id: 't1', parent: 'Priya Sharma', child: 'Aarav (8 yrs)', quote: 'The studio environment is so warm and encouraging. Aarav looks forward to his watercolor class every single week!', rating: 5, status: 'approved' },
  { id: 't2', parent: 'Rahul Kapoor', child: 'Meera (10 yrs)', quote: 'Priyanka is an incredible teacher. Noticeable improvement in Meera’s patience and brushwork within just 4 sessions!', rating: 5, status: 'approved' },
  { id: 't3', parent: 'Anita Mukherjee', child: 'Vivaan (7 yrs)', quote: 'Love the family dashboard where we can see his artwork photos uploaded after every class. Highly recommended!', rating: 5, status: 'approved' },
];

export default function AdminGalleryPage({ initialTab = 'paintings' }) {
  const location = useLocation();
  const getTabFromRoute = () => {
    if (location.pathname.includes('gallery')) return 'gallery';
    if (location.pathname.includes('testimonials')) return 'testimonials';
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState(getTabFromRoute());
  const [paintings, setPaintings] = useState(initialPaintings);
  const [photos, setPhotos] = useState(initialGalleryPhotos);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ title: '', caption: '', quote: '', parent: '', child: '', image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=500', category: 'Watercolor' });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'paintings') {
      const newP = { id: `p-${Date.now()}`, title: form.title || 'New Masterpiece', artist: 'Studio Artist', category: form.category, year: '2026', featured: true, image: form.image };
      setPaintings([newP, ...paintings]);
    } else if (activeTab === 'gallery') {
      const newG = { id: `g-${Date.now()}`, caption: form.caption || 'Studio Workshop Photo', date: 'Jul 2026', category: form.category, image: form.image };
      setPhotos([newG, ...photos]);
    } else {
      const newT = { id: `t-${Date.now()}`, parent: form.parent || 'Happy Parent', child: form.child || 'Enrolled Student', quote: form.quote || 'Wonderful painting classes!', rating: 5, status: 'approved' };
      setTestimonials([newT, ...testimonials]);
    }
    setIsModalOpen(false);
    alert('✨ Successfully published to the public website!');
  };

  const handleDelete = (id, type) => {
    if (!window.confirm('Delete this item from the public website?')) return;
    if (type === 'painting') setPaintings(paintings.filter((i) => i.id !== id));
    if (type === 'photo') setPhotos(photos.filter((i) => i.id !== id));
    if (type === 'testimonial') setTestimonials(testimonials.filter((i) => i.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(139, 115, 85, 0.15)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#8B7355', marginBottom: '4px' }}>
            <Link to="/admin" style={{ color: '#E8A0BF', textDecoration: 'none', fontWeight: 600 }}>Studio Admin</Link>
            <span>/</span>
            <span>{activeTab === 'paintings' ? 'Portfolio Paintings' : activeTab === 'gallery' ? 'Workshop Photo Gallery' : 'Parent Testimonials'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            {activeTab === 'paintings' ? 'Studio Portfolio Artwork' : activeTab === 'gallery' ? 'Workshop & Event Gallery' : 'Parent Review Manager'}
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            {activeTab === 'paintings'
              ? 'Upload finished master paintings and featured artwork displayed on the website showcase.'
              : activeTab === 'gallery'
              ? 'Share live studio workshop photos, student collaborative sessions, and event highlights.'
              : 'Approve, edit, or publish quotes and 5-star reviews from happy parents.'}
          </p>
        </div>

        <div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            + {activeTab === 'paintings' ? 'Upload Portfolio Painting' : activeTab === 'gallery' ? 'Upload Workshop Photo' : 'Add Testimonial'}
          </Button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', borderBottom: '1px solid #F5F0E8', paddingBottom: '16px', flexWrap: 'wrap' }}>
        {[
          { id: 'paintings', label: `🖼️ Portfolio Paintings (${paintings.length})` },
          { id: 'gallery', label: `📷 Workshop Gallery (${photos.length})` },
          { id: 'testimonials', label: `💬 Parent Testimonials (${testimonials.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              border: activeTab === tab.id ? '1px solid #FFB5A7' : '1px solid transparent',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'white',
              color: activeTab === tab.id ? '#3D3232' : '#6B5E5E',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(232, 160, 191, 0.25)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'paintings' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {paintings.map((p) => (
            <div key={p.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(139, 115, 85, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '220px', position: 'relative', background: '#F5F0E8' }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {p.featured && <span style={{ position: 'absolute', top: '14px', left: '14px', background: '#E8A0BF', color: 'white', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>🌟 Featured</span>}
                  <span style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.9)', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#3D3232' }}>🎨 {p.category}</span>
                </div>
                <div style={{ padding: '22px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: '0 0 4px 0' }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: '#8B7355', margin: 0 }}>👩‍🎨 Artist: {p.artist} ({p.year})</p>
                </div>
              </div>
              <div style={{ padding: '0 22px 20px 22px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F5F0E8', paddingTop: '14px' }}>
                <button onClick={() => handleDelete(p.id, 'painting')} style={{ padding: '8px 14px', borderRadius: '10px', background: '#FFEBEE', color: '#C62828', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>🗑️ Delete from Portfolio</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'gallery' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {photos.map((g) => (
            <div key={g.id} style={{ background: 'white', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(139, 115, 85, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '220px', position: 'relative', background: '#F5F0E8' }}>
                  <img src={g.image} alt={g.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.9)', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, color: '#3D3232' }}>📸 {g.category}</span>
                </div>
                <div style={{ padding: '22px' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: '0 0 4px 0' }}>{g.caption}</h3>
                  <p style={{ fontSize: '13px', color: '#8B7355', margin: 0 }}>📅 {g.date}</p>
                </div>
              </div>
              <div style={{ padding: '0 22px 20px 22px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #F5F0E8', paddingTop: '14px' }}>
                <button onClick={() => handleDelete(g.id, 'photo')} style={{ padding: '8px 14px', borderRadius: '10px', background: '#FFEBEE', color: '#C62828', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>🗑️ Delete Photo</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'testimonials' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {testimonials.map((t) => (
            <div key={t.id} style={{ background: 'white', borderRadius: '24px', padding: '26px', border: '1px solid rgba(139, 115, 85, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '18px', color: '#FFB300' }}>⭐⭐⭐⭐⭐</span>
                  <Badge variant="success">Approved & Live</Badge>
                </div>
                <p style={{ fontSize: '15px', color: '#3D3232', margin: '0 0 16px 0', lineHeight: 1.6, fontStyle: 'italic' }}>"{t.quote}"</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#3D3232', margin: 0 }}>{t.parent}</h4>
                  <span style={{ fontSize: '12px', color: '#8B7355' }}>Parent of {t.child}</span>
                </div>
                <button onClick={() => handleDelete(t.id, 'testimonial')} style={{ padding: '8px 14px', borderRadius: '10px', background: '#FFEBEE', color: '#C62828', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD / CREATE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(61, 50, 50, 0.7)', backdropFilter: 'blur(6px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ background: 'white', borderRadius: '24px', padding: '36px', width: '100%', maxWidth: '560px', position: 'relative', zIndex: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F5F0E8' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                  {activeTab === 'paintings' ? '✨ Add Portfolio Masterpiece' : activeTab === 'gallery' ? '📸 Add Workshop Gallery Photo' : '💬 Add Parent Testimonial'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#8B7355' }}>✕</button>
              </div>

              <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeTab === 'paintings' && (
                  <>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Painting Title *</label><input type="text" required placeholder="e.g., Sunset Glow Silhouette" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Category</label><input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Image URL</label><input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                  </>
                )}
                {activeTab === 'gallery' && (
                  <>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Photo Caption *</label><input type="text" required placeholder="e.g., Little Artists Collaborative Canvas" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Image URL</label><input type="url" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                  </>
                )}
                {activeTab === 'testimonials' && (
                  <>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Parent Name *</label><input type="text" required placeholder="e.g., Priya Sharma" value={form.parent} onChange={(e) => setForm({ ...form, parent: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Child Name & Age</label><input type="text" placeholder="e.g., Aarav (8 yrs)" value={form.child} onChange={(e) => setForm({ ...form, child: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} /></div>
                    <div><label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Quote / Review *</label><textarea rows="3" required placeholder="Write what the parent said about the studio..." value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', fontFamily: 'inherit' }} /></div>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '14px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '12px 20px', borderRadius: '12px', background: '#F5F0E8', color: '#6B5E5E', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                  <Button type="submit" variant="primary">✨ Publish to Website</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
