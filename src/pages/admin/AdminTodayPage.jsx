import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

/* ============================================================
   TODAY'S WORKSHOP SCHEDULE & ATTENDANCE SHEET
   Interactive attendance marking and email preview/dispatch modal!
   ============================================================ */

const initialSchedule = [
  {
    id: 'today-1',
    title: 'Watercolor Landscapes & Sunsets',
    time: '10:00 AM - 12:00 PM',
    instructor: 'Priyanka',
    room: 'Studio Hall 1',
    status: 'in-progress',
    students: [
      { id: 's1', name: 'Aarav Sharma', age: '8 yrs', parent: 'Priya Sharma', parentEmail: 'priya.sharma@example.com', parentPhone: '+1 (415) 444-3322', attendance: 'present', feeStatus: 'paid' },
      { id: 's2', name: 'Meera Kapoor', age: '10 yrs', parent: 'Rahul Kapoor', parentEmail: 'rahul.kapoor@example.com', parentPhone: '+1 (415) 333-1122', attendance: 'present', feeStatus: 'paid' },
      { id: 's3', name: 'Vivaan Mukherjee', age: '7 yrs', parent: 'Anita Mukherjee', parentEmail: 'anita.m@example.com', parentPhone: '+1 (415) 888-2233', attendance: 'expected', feeStatus: 'pending' },
      { id: 's4', name: 'Anaya Patel', age: '9 yrs', parent: 'Suresh Patel', parentEmail: 'suresh.p@example.com', parentPhone: '+1 (415) 999-8877', attendance: 'absent', feeStatus: 'paid' },
      { id: 's5', name: 'Kavya Singhania', age: '11 yrs', parent: 'Deepak Singhania', parentEmail: 'deepak.s@example.com', parentPhone: '+1 (415) 777-8899', attendance: 'present', feeStatus: 'pending' },
    ],
  },
  {
    id: 'today-2',
    title: 'Acrylic Canvas Explorations',
    time: '2:00 PM - 4:30 PM',
    instructor: 'Priyanka',
    room: 'Studio Hall 2',
    status: 'upcoming',
    students: [
      { id: 's6', name: 'Rohan Gupta', age: '12 yrs', parent: 'Vikram Gupta', parentEmail: 'vikram.g@example.com', parentPhone: '+1 (415) 222-3344', attendance: 'expected', feeStatus: 'paid' },
      { id: 's7', name: 'Tanya Verma', age: '13 yrs', parent: 'Sunita Verma', parentEmail: 'sunita.v@example.com', parentPhone: '+1 (415) 111-2233', attendance: 'expected', feeStatus: 'paid' },
      { id: 's8', name: 'Arjun Nair', age: '11 yrs', parent: 'Karthik Nair', parentEmail: 'karthik.n@example.com', parentPhone: '+1 (415) 666-5544', attendance: 'expected', feeStatus: 'pending' },
    ],
  },
];

export default function AdminTodayPage() {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [activeTab, setActiveTab] = useState('today-1');

  // Email Preview Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);

  const handleAttendanceChange = (sessionId, studentId, newStatus) => {
    setSchedule((prev) =>
      prev.map((sess) => {
        if (sess.id !== sessionId) return sess;
        return {
          ...sess,
          students: sess.students.map((st) => (st.id === studentId ? { ...st, attendance: newStatus } : st)),
        };
      })
    );
  };

  const handleToggleFee = (sessionId, studentId) => {
    setSchedule((prev) =>
      prev.map((sess) => {
        if (sess.id !== sessionId) return sess;
        return {
          ...sess,
          students: sess.students.map((st) => {
            if (st.id !== studentId) return st;
            const nextFee = st.feeStatus === 'paid' ? 'pending' : 'paid';
            return { ...st, feeStatus: nextFee };
          }),
        };
      })
    );
  };

  const activeSession = schedule.find((s) => s.id === activeTab) || schedule[0];
  const presentCount = activeSession.students.filter((s) => s.attendance === 'present').length;
  const absentCount = activeSession.students.filter((s) => s.attendance === 'absent').length;

  const currentPreviewStudent = activeSession.students[selectedStudentIndex] || activeSession.students[0];

  const handleSendEmails = () => {
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setEmailSentSuccess(true);
    }, 1500);
  };

  const openEmailModal = () => {
    setEmailSentSuccess(false);
    setSelectedStudentIndex(0);
    setIsEmailModalOpen(true);
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
            <span>Today's Schedule</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            Daily Workshop Attendance Sheet
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            Mark student attendance for today's sessions, verify workshop fees, and send class updates.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={openEmailModal}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFE8D0, #FECFEF)',
              color: '#3D3232',
              border: '1px solid #FFB5A7',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(232, 160, 191, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>📧</span>
            <span>Send Daily Recap Email to Parents</span>
          </button>
        </div>
      </div>

      {/* Session Tab Selection */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {schedule.map((sess) => {
          const isSelected = sess.id === activeTab;
          return (
            <button
              key={sess.id}
              onClick={() => setActiveTab(sess.id)}
              style={{
                padding: '14px 20px',
                borderRadius: '16px',
                background: isSelected ? 'white' : '#FFFDFB',
                border: isSelected ? '2px solid #E8A0BF' : '1px solid rgba(139, 115, 85, 0.15)',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: isSelected ? '0 6px 20px rgba(232, 160, 191, 0.2)' : 'none',
                transition: 'all 0.2s',
                minWidth: '260px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: isSelected ? '#E8A0BF' : '#8B7355', textTransform: 'uppercase' }}>
                  🕐 {sess.time}
                </span>
                <Badge variant={sess.status === 'in-progress' ? 'success' : 'info'}>
                  {sess.status === 'in-progress' ? '🔴 Live Now' : 'Upcoming'}
                </Badge>
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#3D3232', margin: '0 0 4px 0' }}>
                {sess.title}
              </h4>
              <span style={{ fontSize: '12px', color: '#6B5E5E' }}>
                📍 {sess.room} · 👩‍🏫 {sess.instructor}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Session Attendance Roster Box */}
      <div
        style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px',
          border: '1px solid rgba(139, 115, 85, 0.12)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justify: 'space-between', gap: '16px', marginBottom: '24px', paddingBottom: '18px', borderBottom: '1px solid #F5F0E8' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#3D3232', margin: '0 0 4px 0' }}>
              Student Roster — {activeSession.title}
            </h2>
            <p style={{ fontSize: '14px', color: '#6B5E5E', margin: 0 }}>
              Total Enrolled: <strong>{activeSession.students.length}</strong> · Present: <strong style={{ color: '#2E7D32' }}>{presentCount}</strong> · Absent: <strong style={{ color: '#D32F2F' }}>{absentCount}</strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                activeSession.students.forEach((st) => handleAttendanceChange(activeSession.id, st.id, 'present'));
              }}
              style={{ padding: '8px 14px', borderRadius: '10px', background: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              ✅ Mark All Present
            </button>
          </div>
        </div>

        {/* Student List Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {activeSession.students.map((student, idx) => (
            <div
              key={student.id}
              style={{
                padding: '18px',
                borderRadius: '16px',
                background: student.attendance === 'present' ? '#F1F8E9' : student.attendance === 'absent' ? '#FFEBEE' : '#FFFDFB',
                border: student.attendance === 'present' ? '1.5px solid #A5D6A7' : student.attendance === 'absent' ? '1.5px solid #FFCDD2' : '1px solid rgba(139, 115, 85, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
                transition: 'all 0.2s',
              }}
            >
              {/* Student Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: '1 1 240px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: student.attendance === 'present' ? '#C8E6C9' : student.attendance === 'absent' ? '#FFCDD2' : '#FFE8D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    fontWeight: 700,
                  }}
                >
                  {student.attendance === 'present' ? '😊' : student.attendance === 'absent' ? '😴' : '👧'}
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#3D3232', margin: '0 0 2px 0' }}>
                    {idx + 1}. {student.name} <span style={{ fontWeight: 400, color: '#8B7355', fontSize: '13px' }}>({student.age})</span>
                  </h4>
                  <span style={{ fontSize: '12px', color: '#6B5E5E' }}>
                    👨‍👩‍👧 {student.parent} · 📧 {student.parentEmail}
                  </span>
                </div>
              </div>

              {/* Fee Status Button */}
              <div>
                <button
                  onClick={() => handleToggleFee(activeSession.id, student.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: student.feeStatus === 'paid' ? '#E8F5E9' : '#FFF9C4',
                    color: student.feeStatus === 'paid' ? '#2E7D32' : '#8D6E63',
                    border: '1px solid rgba(0,0,0,0.1)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title="Click to toggle fee paid status"
                >
                  {student.feeStatus === 'paid' ? '✓ Fee Paid' : '⏳ Fee Pending (Click to Pay)'}
                </button>
              </div>

              {/* Attendance Toggle Buttons */}
              <div style={{ display: 'flex', gap: '6px', background: 'white', padding: '4px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
                {[
                  { id: 'present', label: '✅ Present', bg: '#2E7D32' },
                  { id: 'expected', label: '⏳ Expected', bg: '#F57C00' },
                  { id: 'absent', label: '❌ Absent', bg: '#D32F2F' },
                ].map((btn) => {
                  const isCur = student.attendance === btn.id;
                  return (
                    <button
                      key={btn.id}
                      onClick={() => handleAttendanceChange(activeSession.id, student.id, btn.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: isCur ? btn.bg : 'transparent',
                        color: isCur ? 'white' : '#6B5E5E',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: isCur ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {btn.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          INTERACTIVE EMAIL PREVIEW & DISPATCH MODAL
          ============================================================ */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmailModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(61, 50, 50, 0.7)', backdropFilter: 'blur(6px)' }}
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '36px',
                width: '100%',
                maxWidth: '740px',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
                border: '1px solid rgba(139, 115, 85, 0.15)',
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F5F0E8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '26px' }}>📬</span>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                      Daily Workshop Recap Email Dispatcher
                    </h2>
                    <span style={{ fontSize: '13px', color: '#8B7355', fontWeight: 600 }}>
                      Previewing HTML email before broadcasting to {activeSession.students.length} enrolled families
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsEmailModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#8B7355' }}
                >
                  ✕
                </button>
              </div>

              {/* Parent Selector Tab */}
              <div style={{ marginBottom: '20px', background: '#FFFDFB', padding: '14px', borderRadius: '16px', border: '1px solid rgba(139, 115, 85, 0.15)' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#8B7355', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  👤 Select Parent to Preview Customized Email:
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {activeSession.students.map((st, idx) => (
                    <button
                      key={st.id}
                      onClick={() => setSelectedStudentIndex(idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: selectedStudentIndex === idx ? '#E8A0BF' : 'white',
                        color: selectedStudentIndex === idx ? 'white' : '#3D3232',
                        border: selectedStudentIndex === idx ? '1px solid #D81B60' : '1px solid rgba(0,0,0,0.1)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {st.parent} ({st.name.split(' ')[0]})
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Newsletter HTML Preview Box */}
              <div
                style={{
                  background: '#FFF8F0',
                  borderRadius: '18px',
                  padding: '28px',
                  border: '1.5px solid #FFB5A7',
                  marginBottom: '24px',
                  fontFamily: 'sans-serif',
                }}
              >
                {/* Email Metadata */}
                <div style={{ fontSize: '13px', color: '#6B5E5E', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px dashed #FFB5A7' }}>
                  <div><strong>From:</strong> 🎨 Painting Studio &lt;workshop-updates@paintingstudio.in&gt;</div>
                  <div><strong>To:</strong> {currentPreviewStudent.parent} &lt;{currentPreviewStudent.parentEmail}&gt;</div>
                  <div><strong>Subject:</strong> ✨ Workshop Recap: {activeSession.title} — Teacher Notes & Art Timeline</div>
                </div>

                {/* Email Body Preview */}
                <div style={{ color: '#3D3232', fontSize: '15px', lineHeight: 1.6 }}>
                  <p style={{ fontWeight: 600, fontSize: '16px', margin: '0 0 12px 0' }}>
                    Dear {currentPreviewStudent.parent},
                  </p>
                  <p style={{ margin: '0 0 16px 0' }}>
                    We hope {currentPreviewStudent.name} had a wonderful time in today's <strong>{activeSession.title}</strong> workshop! Our young artists explored new painting techniques and created vibrant artwork in {activeSession.room} with instructor {activeSession.instructor}.
                  </p>

                  {/* Attendance Summary Pill */}
                  <div style={{ background: 'white', padding: '14px 18px', borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ fontSize: '13px', color: '#8B7355', display: 'block' }}>Today's Attendance Status:</span>
                      <strong style={{ fontSize: '16px', color: currentPreviewStudent.attendance === 'present' ? '#2E7D32' : currentPreviewStudent.attendance === 'absent' ? '#D32F2F' : '#F57C00' }}>
                        {currentPreviewStudent.attendance === 'present' ? '✅ Present in Class' : currentPreviewStudent.attendance === 'absent' ? '❌ Absent today' : '⏳ Expected / Checked in'}
                      </strong>
                    </div>
                    <span style={{ fontSize: '24px' }}>
                      {currentPreviewStudent.attendance === 'present' ? '🎨' : '📝'}
                    </span>
                  </div>

                  {/* Fee Reminder Alert Box (if pending) */}
                  {currentPreviewStudent.feeStatus === 'pending' ? (
                    <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '14px 18px', borderRadius: '8px', marginBottom: '18px', color: '#8D6E63' }}>
                      <strong style={{ display: 'block', marginBottom: '4px', color: '#E65100' }}>
                        ⚠️ Workshop Fee Payment Reminder ($45 Pending)
                      </strong>
                      <span style={{ fontSize: '14px' }}>
                        Our records indicate that the session fee of <strong>$45</strong> for <strong>{currentPreviewStudent.name}</strong> is currently pending. Please send payment via <strong>Zelle</strong> to our studio phone number: <strong>+1 (415) 555-0199</strong> (Painting Studio LLC) at your earliest convenience.
                      </span>
                    </div>
                  ) : (
                    <div style={{ background: '#E8F5E9', borderLeft: '4px solid #4CAF50', padding: '12px 16px', borderRadius: '8px', marginBottom: '18px', color: '#2E7D32', fontSize: '14px' }}>
                      <strong>✓ Fee Verification Complete:</strong> Thank you for your prompt fee payment for {currentPreviewStudent.name}'s workshop!
                    </div>
                  )}

                  <p style={{ margin: '0 0 16px 0' }}>
                    📸 <strong>New Artwork Uploaded!</strong> Teacher notes and weekly progress photos from today's session have been published. Log in to the <strong>Family Portal</strong> to view {currentPreviewStudent.name}'s Art Journey timeline!
                  </p>

                  <p style={{ margin: 0, fontSize: '14px', color: '#8B7355' }}>
                    Warm regards,<br />
                    <strong>The Studio Artist Team</strong><br />
                    🎨 Painting Studio
                  </p>
                </div>
              </div>

              {/* Dispatch Actions Footer */}
              {emailSentSuccess ? (
                <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', padding: '20px', borderRadius: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>🎉</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: '#2E7D32', margin: '0 0 6px 0' }}>
                    ✅ 5 Daily Recap Emails Successfully Dispatched!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#388E3C', margin: '0 0 16px 0' }}>
                    All enrolled parents for "{activeSession.title}" have been sent their personalized attendance and fee updates.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => setIsEmailModalOpen(false)}>
                    Close Dispatcher
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                  <a
                    href={`mailto:${currentPreviewStudent.parentEmail}?subject=${encodeURIComponent(`✨ Workshop Recap: ${activeSession.title}`)}&body=${encodeURIComponent(`Dear ${currentPreviewStudent.parent},\n\nWe hope ${currentPreviewStudent.name} enjoyed today's workshop! Attendance: ${currentPreviewStudent.attendance.toUpperCase()}.\n\nBest regards,\nPainting Studio`)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <button
                      type="button"
                      style={{ padding: '12px 18px', borderRadius: '12px', background: '#F5F0E8', color: '#3D3232', border: '1px solid rgba(0,0,0,0.1)', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <span>📬</span>
                      <span>Open in Mail App (Mailto)</span>
                    </button>
                  </a>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setIsEmailModalOpen(false)}
                      style={{ padding: '12px 20px', borderRadius: '12px', background: 'transparent', color: '#6B5E5E', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <Button
                      variant="primary"
                      onClick={handleSendEmails}
                      disabled={isSendingEmail}
                      style={{ padding: '12px 24px', fontSize: '14px' }}
                    >
                      {isSendingEmail ? '📬 Dispatching Emails...' : `🚀 Dispatch Emails to All ${activeSession.students.length} Parents`}
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
