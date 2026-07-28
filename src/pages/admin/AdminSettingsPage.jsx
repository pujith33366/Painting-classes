import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

/* ============================================================
   ADMIN SETTINGS & SYSTEM EMAIL DISPATCH LOGS
   Track automated email history and configure studio automation!
   ============================================================ */

const initialEmailLogs = [
  { id: 'log-1', timestamp: 'Today, 6:15 PM', type: 'Daily Recap & Art Timeline', recipient: '5 Enrolled Parents (Watercolor Workshop)', status: 'Delivered', subject: '✨ Workshop Recap: Watercolor Landscapes & Sunsets — Teacher Notes' },
  { id: 'log-2', timestamp: 'Today, 4:30 PM', type: 'Overdue Fee Reminder', recipient: 'Anita Mukherjee (Vivaan M.)', status: 'Delivered', subject: '⚠️ ACTION REQUIRED: Pending Fee Reminder ($45) for Vivaan Mukherjee' },
  { id: 'log-3', timestamp: 'Yesterday, 10:00 AM', type: '1-Click Bulk Fee Recovery', recipient: '4 Unpaid Families Across Classes', status: 'Delivered', subject: '⚠️ Overdue Workshop Fee Payment Reminder — Studio Accounts' },
  { id: 'log-4', timestamp: 'Jul 26, 2:15 PM', type: 'Registration Confirmation', recipient: 'Rahul Kapoor (Meera K.)', status: 'Delivered', subject: '🎨 Welcome to Watercolor Landscapes! Workshop Registration Confirmed' },
];

export default function AdminSettingsPage({ initialTab = 'settings' }) {
  const location = useLocation();
  const isEmailsRoute = location.pathname.includes('emails') || initialTab === 'emails';
  const [activeTab, setActiveTab] = useState(isEmailsRoute ? 'emails' : 'settings');
  const [logs, setLogs] = useState(initialEmailLogs);

  const [settings, setSettings] = useState({
    studioName: 'Painting Studio',
    contactPhone: '+1 (415) 555-0199',
    contactEmail: 'hello@paintingstudio.in',
    zellePhone: '+1 (415) 555-0199',
    autoReminders: true,
    reminderDays: '2',
    weeklyRecaps: true,
    maxCapacityDefault: 12,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleClearLogs = () => {
    if (window.confirm('Clear all system email dispatch history logs?')) {
      setLogs([]);
    }
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
            <span>{activeTab === 'emails' ? 'Email Dispatch Logs' : 'Studio Automation Settings'}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            {activeTab === 'emails' ? 'System Email Dispatch Logs' : 'Studio Automation & Preferences'}
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            {activeTab === 'emails'
              ? 'Real-time ledger of all automated payment reminders, attendance recaps, and parent emails.'
              : 'Configure your studio Zelle phone number, automated fee reminder schedules, and contact preferences.'}
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', background: 'white', padding: '6px', borderRadius: '16px', border: '1px solid rgba(139, 115, 85, 0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: activeTab === 'settings' ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'transparent',
              color: activeTab === 'settings' ? '#3D3232' : '#6B5E5E',
              border: activeTab === 'settings' ? '1px solid #FFB5A7' : '1px solid transparent',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            ⚙️ Automation Settings
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              background: activeTab === 'emails' ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'transparent',
              color: activeTab === 'emails' ? '#3D3232' : '#6B5E5E',
              border: activeTab === 'emails' ? '1px solid #FFB5A7' : '1px solid transparent',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            📧 Email Logs ({logs.length})
          </button>
        </div>
      </div>

      {activeTab === 'settings' ? (
        /* STUDIO AUTOMATION SETTINGS FORM */
        <div style={{ maxWidth: '800px' }}>
          {savedSuccess && (
            <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', padding: '16px 20px', borderRadius: '14px', marginBottom: '24px', color: '#2E7D32', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>✅</span>
              <span>Studio automation settings and Zelle preferences saved successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Box 1: Contact & Zelle */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid rgba(139, 115, 85, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: '#3D3232', margin: '0 0 20px 0', paddingBottom: '12px', borderBottom: '1px solid #F5F0E8' }}>
                🏢 Studio Identity & Billing Details
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Studio Name</label>
                  <input type="text" value={settings.studioName} onChange={(e) => setSettings({ ...settings, studioName: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Studio Zelle Phone Number (For Fee Payments)</label>
                  <input type="text" value={settings.zellePhone} onChange={(e) => setSettings({ ...settings, zellePhone: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px', fontWeight: 600, color: '#2E7D32' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>Contact Phone / WhatsApp</label>
                  <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#3D3232', display: 'block', marginBottom: '6px' }}>System Email Sender Address</label>
                  <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(139, 115, 85, 0.3)', fontSize: '14px' }} />
                </div>
              </div>
            </div>

            {/* Box 2: Automated Reminders Config */}
            <div style={{ background: 'white', borderRadius: '24px', padding: '32px', border: '1px solid rgba(139, 115, 85, 0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700, color: '#3D3232', margin: '0 0 20px 0', paddingBottom: '12px', borderBottom: '1px solid #F5F0E8' }}>
                🤖 Automated Email & Fee Reminders
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: '#FFFDFB', padding: '16px', borderRadius: '14px', border: '1px solid #F5F0E8' }}>
                  <div>
                    <strong style={{ fontSize: '15px', color: '#3D3232', display: 'block' }}>Enable Automatic Fee Reminder Emails</strong>
                    <span style={{ fontSize: '13px', color: '#6B5E5E' }}>Automatically send overdue reminders to parents if payment is pending after class.</span>
                  </div>
                  <input type="checkbox" checked={settings.autoReminders} onChange={(e) => setSettings({ ...settings, autoReminders: e.target.checked })} style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#E8A0BF' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: '#FFFDFB', padding: '16px', borderRadius: '14px', border: '1px solid #F5F0E8' }}>
                  <div>
                    <strong style={{ fontSize: '15px', color: '#3D3232', display: 'block' }}>Automatic Daily Workshop Recap Broadcasts</strong>
                    <span style={{ fontSize: '13px', color: '#6B5E5E' }}>Send summary emails with teacher praise notes when attendance is marked present.</span>
                  </div>
                  <input type="checkbox" checked={settings.weeklyRecaps} onChange={(e) => setSettings({ ...settings, weeklyRecaps: e.target.checked })} style={{ width: '22px', height: '22px', cursor: 'pointer', accentColor: '#E8A0BF' }} />
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
              <Button type="submit" variant="primary" size="lg">
                💾 Save Studio Automation Settings
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* EMAIL DISPATCH LOGS TABLE */
        <div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <button onClick={handleClearLogs} style={{ padding: '8px 16px', borderRadius: '12px', background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              🗑️ Clear Email History Logs
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {logs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>📭</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#3D3232', margin: '0 0 6px 0' }}>No email logs found</h3>
                <p style={{ color: '#6B5E5E', fontSize: '14px', margin: 0 }}>All outgoing system reminders and recaps will be logged here.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  style={{
                    background: 'white',
                    borderRadius: '18px',
                    padding: '22px 24px',
                    border: '1px solid rgba(139, 115, 85, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 340px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#E8F5E9', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '24px' }}>
                      📬
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                          {log.subject}
                        </h4>
                        <Badge variant="success">✓ {log.status}</Badge>
                      </div>
                      <p style={{ fontSize: '13px', color: '#6B5E5E', margin: '0 0 4px 0' }}>
                        👥 <strong>Recipient:</strong> {log.recipient} · 🏷️ <strong>Type:</strong> {log.type}
                      </p>
                      <span style={{ fontSize: '12px', color: '#8B7355', fontWeight: 600 }}>🕐 Dispatched: {log.timestamp}</span>
                    </div>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', background: '#F5F0E8', color: '#6B5E5E', padding: '6px 14px', borderRadius: '10px', fontWeight: 600 }}>
                      System Auto-Log
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
