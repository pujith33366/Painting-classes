import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

/* ============================================================
   ADMIN STUDENTS & PARENTS DIRECTORY PORTAL
   Searchable rosters, family contact cards, and attendance stats!
   ============================================================ */

const initialStudents = [
  { id: 'st-1', name: 'Aarav Sharma', age: '8 yrs', parent: 'Priya Sharma', phone: '+1 (415) 444-3322', email: 'priya.sharma@example.com', enrolledClass: 'Watercolor Landscapes', attendance: '92%', status: 'active', joinDate: 'Jan 2026' },
  { id: 'st-2', name: 'Meera Kapoor', age: '10 yrs', parent: 'Rahul Kapoor', phone: '+1 (415) 333-1122', email: 'rahul.kapoor@example.com', enrolledClass: 'Watercolor Landscapes', attendance: '100%', status: 'active', joinDate: 'Feb 2026' },
  { id: 'st-3', name: 'Vivaan Mukherjee', age: '7 yrs', parent: 'Anita Mukherjee', phone: '+1 (415) 888-2233', email: 'anita.m@example.com', enrolledClass: 'Watercolor Landscapes', attendance: '85%', status: 'active', joinDate: 'Mar 2026' },
  { id: 'st-4', name: 'Anaya Patel', age: '9 yrs', parent: 'Suresh Patel', phone: '+1 (415) 999-8877', email: 'suresh.p@example.com', enrolledClass: 'Acrylic Explorations', attendance: '78%', status: 'active', joinDate: 'Nov 2025' },
  { id: 'st-5', name: 'Kavya Singhania', age: '11 yrs', parent: 'Deepak Singhania', phone: '+1 (415) 777-8899', email: 'deepak.s@example.com', enrolledClass: 'Acrylic Explorations', attendance: '95%', status: 'active', joinDate: 'Dec 2025' },
  { id: 'st-6', name: 'Rohan Gupta', age: '12 yrs', parent: 'Vikram Gupta', phone: '+1 (415) 222-3344', email: 'vikram.g@example.com', enrolledClass: 'Acrylic Explorations', attendance: '88%', status: 'active', joinDate: 'Jan 2026' },
  { id: 'st-7', name: 'Tanya Verma', age: '13 yrs', parent: 'Sunita Verma', phone: '+1 (415) 111-2233', email: 'sunita.v@example.com', enrolledClass: 'Charcoal & Pastel Portraits', attendance: '96%', status: 'active', joinDate: 'Feb 2026' },
  { id: 'st-8', name: 'Arjun Nair', age: '11 yrs', parent: 'Karthik Nair', phone: '+1 (415) 666-5544', email: 'karthik.n@example.com', enrolledClass: 'Botanical Illustration', attendance: '80%', status: 'active', joinDate: 'Mar 2026' },
  { id: 'st-9', name: 'Samaira Rao', age: '6 yrs', parent: 'Sunita Rao', phone: '+1 (415) 555-6677', email: 'sunita.rao@example.com', enrolledClass: 'Little Artists Finger Painting', attendance: '90%', status: 'active', joinDate: 'Apr 2026' },
];

export default function AdminStudentsPage({ initialTab = 'students' }) {
  const location = useLocation();
  const isParentsRoute = location.pathname.includes('parents') || initialTab === 'parents';
  const [activeTab, setActiveTab] = useState(isParentsRoute ? 'parents' : 'students');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');

  // Extract unique parents list from students
  const uniqueParentsMap = {};
  initialStudents.forEach((st) => {
    if (!uniqueParentsMap[st.parent]) {
      uniqueParentsMap[st.parent] = {
        name: st.parent,
        email: st.email,
        phone: st.phone,
        children: [st.name],
        classes: [st.enrolledClass],
        memberSince: st.joinDate,
      };
    } else {
      uniqueParentsMap[st.parent].children.push(st.name);
      if (!uniqueParentsMap[st.parent].classes.includes(st.enrolledClass)) {
        uniqueParentsMap[st.parent].classes.push(st.enrolledClass);
      }
    }
  });
  const parentsList = Object.values(uniqueParentsMap);

  const classesList = ['All', 'Watercolor Landscapes', 'Acrylic Explorations', 'Charcoal & Pastel Portraits', 'Botanical Illustration', 'Little Artists Finger Painting'];

  const filteredStudents = initialStudents.filter((st) => {
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) || st.parent.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'All' || st.enrolledClass === selectedClass;
    return matchesSearch && matchesClass;
  });

  const filteredParents = parentsList.filter((p) => {
    return p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase()) || p.children.some((ch) => ch.toLowerCase().includes(searchQuery.toLowerCase()));
  });

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
            <span>{activeTab === 'students' ? 'Student Directory' : 'Parent Profiles'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            {activeTab === 'students' ? 'Enrolled Students Roster' : 'Family & Parent Directory'}
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            {activeTab === 'students'
              ? 'View student ages, enrolled workshops, attendance percentages, and parent contacts.'
              : 'Manage family accounts, phone contacts, and multi-child workshop registrations.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'white', padding: '6px', borderRadius: '16px', border: '1px solid rgba(139, 115, 85, 0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <button
            onClick={() => setActiveTab('students')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: activeTab === 'students' ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'transparent',
              color: activeTab === 'students' ? '#3D3232' : '#6B5E5E',
              border: activeTab === 'students' ? '1px solid #FFB5A7' : '1px solid transparent',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            👧 Students ({initialStudents.length})
          </button>
          <button
            onClick={() => setActiveTab('parents')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: activeTab === 'parents' ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'transparent',
              color: activeTab === 'parents' ? '#3D3232' : '#6B5E5E',
              border: activeTab === 'parents' ? '1px solid #FFB5A7' : '1px solid transparent',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            👨‍👩‍👧 Parents ({parentsList.length})
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '28px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ flex: '1 1 300px', maxWidth: '420px', position: 'relative' }}>
          <input
            type="text"
            placeholder={activeTab === 'students' ? 'Search student name or parent...' : 'Search parent name or email...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 18px 12px 42px',
              borderRadius: '14px',
              border: '1px solid rgba(139, 115, 85, 0.25)',
              background: 'white',
              fontSize: '14px',
              outline: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
            }}
          />
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#8B7355' }}>
            🔍
          </span>
        </div>

        {activeTab === 'students' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#8B7355' }}>Filter Workshop:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(139, 115, 85, 0.25)',
                background: 'white',
                fontSize: '14px',
                fontWeight: 600,
                color: '#3D3232',
              }}
            >
              {classesList.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Roster / Directory Content */}
      {activeTab === 'students' ? (
        /* STUDENTS ROSTER TABLE / GRID */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filteredStudents.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>👧</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#3D3232', margin: '0 0 6px 0' }}>No students found</h3>
              <p style={{ color: '#6B5E5E', fontSize: '14px', margin: 0 }}>Try adjusting your search query or class filter.</p>
            </div>
          ) : (
            filteredStudents.map((st) => (
              <div
                key={st.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '24px',
                  border: '1px solid rgba(139, 115, 85, 0.12)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'transform 0.2s',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        👧
                      </div>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                          {st.name} <span style={{ fontSize: '13px', fontWeight: 400, color: '#8B7355' }}>({st.age})</span>
                        </h3>
                        <span style={{ fontSize: '12px', color: '#2E7D32', fontWeight: 600 }}>● Active Student · Joined {st.joinDate}</span>
                      </div>
                    </div>
                    <Badge variant="success">Attendance {st.attendance}</Badge>
                  </div>

                  <div style={{ background: '#FFFDFB', padding: '14px', borderRadius: '14px', border: '1px solid #F5F0E8', marginBottom: '14px', fontSize: '13px', color: '#6B5E5E' }}>
                    <div style={{ marginBottom: '6px' }}>🎨 <strong>Workshop:</strong> {st.enrolledClass}</div>
                    <div>👨‍👩‍👧 <strong>Parent:</strong> {st.parent}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #F5F0E8' }}>
                  <span style={{ fontSize: '12px', color: '#8B7355', fontWeight: 500 }}>📞 {st.phone}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`tel:${st.phone}`} style={{ textDecoration: 'none' }}>
                      <button style={{ padding: '8px 12px', borderRadius: '10px', background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                        📞 Call
                      </button>
                    </a>
                    <a href={`mailto:${st.email}?subject=${encodeURIComponent(`Art Studio update for ${st.name}`)}`} style={{ textDecoration: 'none' }}>
                      <button style={{ padding: '8px 12px', borderRadius: '10px', background: '#FFF8E7', color: '#8D6E63', border: '1px solid #FFE082', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                        📧 Email
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* PARENTS DIRECTORY TABLE / GRID */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {filteredParents.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
              <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>👨‍👩‍👧</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#3D3232', margin: '0 0 6px 0' }}>No parent accounts found</h3>
              <p style={{ color: '#6B5E5E', fontSize: '14px', margin: 0 }}>Try adjusting your search query.</p>
            </div>
          ) : (
            filteredParents.map((parent) => (
              <div
                key={parent.email}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '26px',
                  border: '1px solid rgba(139, 115, 85, 0.12)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '26px' }}>
                      👨‍👩‍👧
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                        {parent.name}
                      </h3>
                      <span style={{ fontSize: '13px', color: '#8B7355', fontWeight: 600 }}>Family Member since {parent.memberSince}</span>
                    </div>
                  </div>

                  <div style={{ background: '#FFFDFB', padding: '16px', borderRadius: '14px', border: '1px solid #F5F0E8', marginBottom: '16px', fontSize: '13px', color: '#6B5E5E', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>👧 <strong>Children ({parent.children.length}):</strong> <span style={{ color: '#3D3232', fontWeight: 600 }}>{parent.children.join(', ')}</span></div>
                    <div>🎨 <strong>Enrolled Classes:</strong> {parent.classes.join(', ')}</div>
                    <div>📧 <strong>Email:</strong> {parent.email}</div>
                    <div>📞 <strong>Phone:</strong> {parent.phone}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                  <Badge variant="info">{parent.children.length} Child Enrolled</Badge>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a href={`tel:${parent.phone}`} style={{ textDecoration: 'none' }}>
                      <Button variant="secondary" size="sm">📞 Call Family</Button>
                    </a>
                    <a href={`mailto:${parent.email}?subject=${encodeURIComponent(`Painting Studio Family Update`)}`} style={{ textDecoration: 'none' }}>
                      <Button variant="primary" size="sm">📧 Send Email</Button>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
