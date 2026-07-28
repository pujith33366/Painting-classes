import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';

/* ============================================================
   ADMIN PAYMENTS & OVERDUE FEE RECOVERY LEDGER
   1-Click bulk payment reminders for all unpaid families via Zelle!
   ============================================================ */

const initialLedger = [
  {
    id: 'pay-101',
    student: 'Vivaan Mukherjee',
    parent: 'Anita Mukherjee',
    parentEmail: 'anita.m@example.com',
    parentPhone: '+1 (415) 888-2233',
    workshop: 'Watercolor Landscapes & Sunsets',
    date: 'Aug 5, 2026',
    amount: 45,
    status: 'pending',
    daysOverdue: 2,
  },
  {
    id: 'pay-102',
    student: 'Kavya Singhania',
    parent: 'Deepak Singhania',
    parentEmail: 'deepak.s@example.com',
    parentPhone: '+1 (415) 777-8899',
    workshop: 'Watercolor Landscapes & Sunsets',
    date: 'Aug 5, 2026',
    amount: 45,
    status: 'pending',
    daysOverdue: 2,
  },
  {
    id: 'pay-103',
    student: 'Arjun Nair',
    parent: 'Karthik Nair',
    parentEmail: 'karthik.n@example.com',
    parentPhone: '+1 (415) 666-5544',
    workshop: 'Acrylic Canvas Explorations',
    date: 'Aug 12, 2026',
    amount: 50,
    status: 'pending',
    daysOverdue: 0,
  },
  {
    id: 'pay-104',
    student: 'Samaira Rao',
    parent: 'Sunita Rao',
    parentEmail: 'sunita.rao@example.com',
    parentPhone: '+1 (415) 555-6677',
    workshop: 'Pastel & Charcoal Sketching Workshop (Past Class)',
    date: 'July 28, 2026',
    amount: 60,
    status: 'overdue',
    daysOverdue: 10,
  },
  {
    id: 'pay-105',
    student: 'Aarav Sharma',
    parent: 'Priya Sharma',
    parentEmail: 'priya.sharma@example.com',
    parentPhone: '+1 (415) 444-3322',
    workshop: 'Watercolor Landscapes & Sunsets',
    date: 'Aug 5, 2026',
    amount: 45,
    status: 'paid',
    daysOverdue: 0,
  },
  {
    id: 'pay-106',
    student: 'Meera Kapoor',
    parent: 'Rahul Kapoor',
    parentEmail: 'rahul.kapoor@example.com',
    parentPhone: '+1 (415) 333-1122',
    workshop: 'Watercolor Landscapes & Sunsets',
    date: 'Aug 5, 2026',
    amount: 45,
    status: 'paid',
    daysOverdue: 0,
  },
  {
    id: 'pay-107',
    student: 'Rohan Gupta',
    parent: 'Vikram Gupta',
    parentEmail: 'vikram.g@example.com',
    parentPhone: '+1 (415) 222-3344',
    workshop: 'Acrylic Canvas Explorations',
    date: 'Aug 12, 2026',
    amount: 50,
    status: 'paid',
    daysOverdue: 0,
  },
];

export default function AdminPaymentsPage() {
  const [ledger, setLedger] = useState(initialLedger);
  const [filter, setFilter] = useState('unpaid'); // 'all', 'unpaid', 'paid'
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);
  const [selectedPreviewIdx, setSelectedPreviewIdx] = useState(0);
  const [isSendingBulk, setIsSendingBulk] = useState(false);
  const [bulkSentSuccess, setBulkSentSuccess] = useState(false);

  const unpaidRecords = ledger.filter((item) => item.status === 'pending' || item.status === 'overdue');
  const totalUnpaidAmount = unpaidRecords.reduce((sum, item) => sum + item.amount, 0);
  const totalPaidAmount = ledger.filter((item) => item.status === 'paid').reduce((sum, item) => sum + item.amount, 0);

  const filteredLedger = ledger.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'unpaid') return item.status === 'pending' || item.status === 'overdue';
    if (filter === 'paid') return item.status === 'paid';
    return true;
  });

  const handleMarkAsPaid = (id) => {
    setLedger((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'paid', daysOverdue: 0 } : item))
    );
  };

  const handleOpenBulkModal = () => {
    if (unpaidRecords.length === 0) {
      alert('🎉 Amazing! All parents have settled their fees via Zelle. No overdue payments found.');
      return;
    }
    setBulkSentSuccess(false);
    setSelectedPreviewIdx(0);
    setIsRecoveryModalOpen(true);
  };

  const handleDispatchBulkReminders = () => {
    setIsSendingBulk(true);
    setTimeout(() => {
      setIsSendingBulk(false);
      setBulkSentSuccess(true);
    }, 1500);
  };

  const currentPreviewRecord = unpaidRecords[selectedPreviewIdx] || unpaidRecords[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: '100%' }}
    >
      {/* Header */}
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
            <span>Fee Recovery & Payments</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
            Zelle Fee Ledger & Overdue Reminders
          </h1>
          <p style={{ fontSize: '14px', color: '#6B5E5E', margin: '4px 0 0 0' }}>
            Track international workshop payments via Zelle, reconcile bank transfers, and send 1-click reminders.
          </p>
        </div>

        <div>
          <button
            onClick={handleOpenBulkModal}
            disabled={unpaidRecords.length === 0}
            style={{
              padding: '12px 22px',
              borderRadius: '14px',
              background: unpaidRecords.length > 0 ? 'linear-gradient(135deg, #FF6B6B, #E53935)' : '#E0E0E0',
              color: 'white',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: unpaidRecords.length > 0 ? 'pointer' : 'not-allowed',
              boxShadow: unpaidRecords.length > 0 ? '0 6px 20px rgba(229, 57, 53, 0.3)' : 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: '18px' }}>🚨</span>
            <span>1-Click: Remind All {unpaidRecords.length} Unpaid Parents (${totalUnpaidAmount.toLocaleString()})</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <Card hoverable={false} style={{ padding: '24px', borderRadius: '20px', background: 'white', border: '2px solid #FFCDD2' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#D32F2F', textTransform: 'uppercase' }}>🚨 Pending & Overdue Fees</span>
            <span style={{ fontSize: '24px' }}>⏳</span>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, color: '#D32F2F', margin: '0 0 4px 0' }}>
            ${totalUnpaidAmount.toLocaleString()}
          </p>
          <span style={{ fontSize: '13px', color: '#6B5E5E', fontWeight: 600 }}>
            {unpaidRecords.length} famil{unpaidRecords.length === 1 ? 'y' : 'ies'} pending across classes
          </span>
        </Card>

        <Card hoverable={false} style={{ padding: '24px', borderRadius: '20px', background: 'white', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase' }}>✅ Total Fees Collected (Zelle)</span>
            <span style={{ fontSize: '24px' }}>💰</span>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700, color: '#2E7D32', margin: '0 0 4px 0' }}>
            ${totalPaidAmount.toLocaleString()}
          </p>
          <span style={{ fontSize: '13px', color: '#6B5E5E', fontWeight: 600 }}>
            {ledger.filter((item) => item.status === 'paid').length} payments verified
          </span>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #F5F0E8', paddingBottom: '16px' }}>
        {[
          { id: 'unpaid', label: `🚨 Unpaid & Overdue (${unpaidRecords.length})` },
          { id: 'all', label: `All Payment Records (${ledger.length})` },
          { id: 'paid', label: `Verified Paid (${ledger.length - unpaidRecords.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              border: filter === tab.id ? '1px solid #FFB5A7' : '1px solid transparent',
              background: filter === tab.id ? 'linear-gradient(135deg, #FFE8D0, #FECFEF)' : 'white',
              color: filter === tab.id ? '#3D3232' : '#6B5E5E',
              boxShadow: filter === tab.id ? '0 2px 8px rgba(232, 160, 191, 0.2)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ledger List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredLedger.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', background: 'white', borderRadius: '20px', border: '1px solid rgba(139, 115, 85, 0.1)' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>🎉</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#3D3232', margin: '0 0 8px 0' }}>No records found</h3>
            <p style={{ color: '#6B5E5E', fontSize: '14px' }}>There are no payment records matching this filter.</p>
          </div>
        ) : (
          filteredLedger.map((item) => {
            const isUnpaid = item.status === 'pending' || item.status === 'overdue';
            const isSevere = item.daysOverdue >= 5;

            return (
              <div
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '18px',
                  padding: '22px 24px',
                  border: isSevere ? '2px solid #FFCDD2' : isUnpaid ? '1.5px solid #FFE082' : '1px solid rgba(139, 115, 85, 0.12)',
                  background: isSevere ? '#FFF8F8' : isUnpaid ? '#FFFDF8' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                {/* Left Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 340px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: !isUnpaid ? '#C8E6C9' : isSevere ? '#FFCDD2' : '#FFE8D0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                    }}
                  >
                    {!isUnpaid ? '✅' : isSevere ? '🚨' : '⏳'}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700, color: '#3D3232', margin: 0 }}>
                        {item.parent} <span style={{ fontSize: '14px', fontWeight: 400, color: '#8B7355' }}>(Child: {item.student})</span>
                      </h4>
                      <Badge variant={!isUnpaid ? 'success' : isSevere ? 'error' : 'warning'}>
                        {!isUnpaid ? '✓ Fee Paid' : item.daysOverdue > 0 ? `⏳ Overdue by ${item.daysOverdue} days` : '⏳ Fee Pending'}
                      </Badge>
                    </div>

                    <p style={{ fontSize: '13px', color: '#6B5E5E', margin: '0 0 4px 0' }}>
                      🎨 Workshop: <strong>{item.workshop}</strong> · Date: {item.date}
                    </p>

                    <div style={{ fontSize: '12px', color: '#8B7355' }}>
                      📧 {item.parentEmail} · 📞 {item.parentPhone}
                    </div>
                  </div>
                </div>

                {/* Amount Display */}
                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                  <span style={{ fontSize: '12px', color: '#8B7355', display: 'block', fontWeight: 600 }}>Fee Amount</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700, color: !isUnpaid ? '#2E7D32' : '#D32F2F' }}>
                    ${item.amount.toLocaleString()}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {isUnpaid ? (
                    <>
                      <button
                        onClick={() => {
                          const idx = unpaidRecords.findIndex((r) => r.id === item.id);
                          if (idx !== -1) setSelectedPreviewIdx(idx);
                          setIsRecoveryModalOpen(true);
                        }}
                        style={{
                          padding: '10px 16px',
                          borderRadius: '12px',
                          background: '#FFEBEE',
                          color: '#C62828',
                          border: '1px solid #FFCDD2',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        title="Preview & Send individual reminder"
                      >
                        <span>📧</span>
                        <span>Send Reminder</span>
                      </button>

                      <button
                        onClick={() => handleMarkAsPaid(item.id)}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '12px',
                          background: '#E8F5E9',
                          color: '#2E7D32',
                          border: '1px solid #A5D6A7',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        title="Mark fee as collected via Zelle"
                      >
                        ✓ Mark as Paid
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: '13px', color: '#2E7D32', fontWeight: 700, padding: '8px 16px', background: '#E8F5E9', borderRadius: '12px' }}>
                      Verified Paid ✓
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ============================================================
          1-CLICK OVERDUE FEE RECOVERY BROADCAST MODAL
          ============================================================ */}
      <AnimatePresence>
        {isRecoveryModalOpen && currentPreviewRecord && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRecoveryModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(61, 50, 50, 0.75)', backdropFilter: 'blur(6px)' }}
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
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                border: '2px solid #E53935',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #F5F0E8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '28px' }}>🚨</span>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: 700, color: '#D32F2F', margin: 0 }}>
                      1-Click Zelle Overdue Fee Recovery Broadcast
                    </h2>
                    <span style={{ fontSize: '13px', color: '#6B5E5E', fontWeight: 600 }}>
                      Broadcasting overdue fee reminders to all {unpaidRecords.length} pending families (Total: ${totalUnpaidAmount.toLocaleString()})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsRecoveryModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#8B7355' }}
                >
                  ✕
                </button>
              </div>

              {/* Recipient Selector Pill Bar */}
              <div style={{ marginBottom: '20px', background: '#FFF8F8', padding: '14px', borderRadius: '16px', border: '1px solid #FFCDD2' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#D32F2F', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  👥 Preview Email for Unpaid Family ({selectedPreviewIdx + 1} of {unpaidRecords.length}):
                </span>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {unpaidRecords.map((rec, idx) => (
                    <button
                      key={rec.id}
                      onClick={() => setSelectedPreviewIdx(idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        background: selectedPreviewIdx === idx ? '#D32F2F' : 'white',
                        color: selectedPreviewIdx === idx ? 'white' : '#3D3232',
                        border: selectedPreviewIdx === idx ? '1px solid #B71C1C' : '1px solid rgba(0,0,0,0.15)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {rec.parent} (${rec.amount}) {rec.daysOverdue > 0 ? `— ${rec.daysOverdue}d overdue` : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email Template Preview Box */}
              <div
                style={{
                  background: '#FFFDF8',
                  borderRadius: '18px',
                  padding: '28px',
                  border: '1.5px solid #FFCDD2',
                  marginBottom: '24px',
                  fontFamily: 'sans-serif',
                }}
              >
                <div style={{ fontSize: '13px', color: '#6B5E5E', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px dashed #FFCDD2' }}>
                  <div><strong>From:</strong> 🎨 Painting Studio Accounts &lt;billing@paintingstudio.in&gt;</div>
                  <div><strong>To:</strong> {currentPreviewRecord.parent} &lt;{currentPreviewRecord.parentEmail}&gt;</div>
                  <div><strong>Subject:</strong> ⚠️ ACTION REQUIRED: Pending Fee Reminder (${currentPreviewRecord.amount}) for {currentPreviewRecord.student}</div>
                </div>

                <div style={{ color: '#3D3232', fontSize: '15px', lineHeight: 1.6 }}>
                  <p style={{ fontWeight: 600, fontSize: '16px', margin: '0 0 12px 0' }}>
                    Dear {currentPreviewRecord.parent},
                  </p>
                  <p style={{ margin: '0 0 16px 0' }}>
                    We hope {currentPreviewRecord.student} enjoyed their studio painting experience with us! We are writing from the studio accounts desk to gently remind you that the workshop fee for the session below is currently unpaid in our system.
                  </p>

                  {/* Fee Invoice Box */}
                  <div style={{ background: '#FFF3E0', padding: '18px', borderRadius: '14px', border: '1px solid #FFE0B2', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ color: '#8D6E63' }}>🎨 Workshop Session:</span>
                      <strong style={{ color: '#3D3232' }}>{currentPreviewRecord.workshop}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ color: '#8D6E63' }}>📅 Class Date:</span>
                      <strong style={{ color: '#3D3232' }}>{currentPreviewRecord.date}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                      <span style={{ color: '#8D6E63' }}>👧 Student Name:</span>
                      <strong style={{ color: '#3D3232' }}>{currentPreviewRecord.student}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #FFE0B2', fontSize: '16px' }}>
                      <span style={{ fontWeight: 700, color: '#E65100' }}>💰 Total Amount Due:</span>
                      <strong style={{ fontSize: '20px', color: '#D32F2F' }}>${currentPreviewRecord.amount.toLocaleString()}</strong>
                    </div>
                  </div>

                  <p style={{ margin: '0 0 16px 0' }}>
                    <strong>💳 Easy Zelle Payment Instructions:</strong><br />
                    Please send the amount of <strong>${currentPreviewRecord.amount}</strong> via <strong>Zelle</strong> to our studio phone number: <strong>+1 (415) 555-0199</strong> (Recipient Name: <em>Painting Studio LLC</em>).
                  </p>

                  <p style={{ margin: 0, fontSize: '14px', color: '#8B7355' }}>
                    Once you have completed the Zelle transfer, please reply to this email with a screenshot or confirmation ID so we can check off your fee in our accounts ledger immediately.<br /><br />
                    Warm regards,<br />
                    <strong>Studio Billing & Accounts Desk</strong><br />
                    🎨 Painting Studio
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              {bulkSentSuccess ? (
                <div style={{ background: '#E8F5E9', border: '1px solid #A5D6A7', padding: '22px', borderRadius: '16px', textAlign: 'center' }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '8px' }}>🎉</span>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#2E7D32', margin: '0 0 6px 0' }}>
                    ✅ 1-Click Recovery Broadcast Complete!
                  </h3>
                  <p style={{ fontSize: '14px', color: '#388E3C', margin: '0 0 18px 0' }}>
                    Overdue fee reminder notices with Zelle payment instructions have been successfully dispatched to all {unpaidRecords.length} pending families.
                  </p>
                  <Button variant="primary" size="sm" onClick={() => setIsRecoveryModalOpen(false)}>
                    Close Recovery Dispatcher
                  </Button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '16px', borderTop: '1px solid #F5F0E8' }}>
                  <a
                    href={`mailto:${currentPreviewRecord.parentEmail}?subject=${encodeURIComponent(`⚠️ ACTION REQUIRED: Pending Fee Reminder ($${currentPreviewRecord.amount}) for ${currentPreviewRecord.student}`)}&body=${encodeURIComponent(`Dear ${currentPreviewRecord.parent},\n\nThis is a friendly reminder that the fee of $${currentPreviewRecord.amount} for ${currentPreviewRecord.student}'s workshop (${currentPreviewRecord.workshop}) is currently pending.\n\nPlease send payment via Zelle to our phone number: +1 (415) 555-0199 (Painting Studio LLC).\n\nThank you,\nPainting Studio Accounts`)}`}
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
                      onClick={() => setIsRecoveryModalOpen(false)}
                      style={{ padding: '12px 20px', borderRadius: '12px', background: 'transparent', color: '#6B5E5E', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <Button
                      variant="primary"
                      onClick={handleDispatchBulkReminders}
                      disabled={isSendingBulk}
                      style={{ padding: '14px 28px', fontSize: '15px', background: 'linear-gradient(135deg, #FF6B6B, #E53935)', border: 'none' }}
                    >
                      {isSendingBulk ? '📬 Broadcasting Reminders...' : `🚀 1-Click: Send Reminders to All ${unpaidRecords.length} Families`}
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
