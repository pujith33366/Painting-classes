/* ============================================================
   ADMIN UID — Replace with the actual Firebase UID
   of the artist/admin account.
   This is checked client-side for UI gating only;
   real enforcement happens in Firestore rules + Cloud Functions.
   ============================================================ */
export const ADMIN_UID = import.meta.env.VITE_ADMIN_UID || 'REPLACE_WITH_ADMIN_FIREBASE_UID';
export const DEMO_ADMIN_UID = 'demo-admin-uid-12345';
export const DEMO_PARENT_UID = 'demo-parent-uid-67890';

/* ---- Payment Statuses ---- */
export const PAYMENT_STATUS = {
  NOT_REQUESTED: 'not_requested',
  PENDING: 'pending',
  RECEIVED: 'received',
  WAIVED: 'waived',
};

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.NOT_REQUESTED]: 'Not Requested',
  [PAYMENT_STATUS.PENDING]: 'Pending',
  [PAYMENT_STATUS.RECEIVED]: 'Received',
  [PAYMENT_STATUS.WAIVED]: 'Waived',
};

/* ---- Registration Statuses ---- */
export const REGISTRATION_STATUS = {
  REGISTERED: 'registered',
  CANCELLED: 'cancelled',
  ATTENDED: 'attended',
  ABSENT: 'absent',
};

/* ---- Attendance Statuses ---- */
export const ATTENDANCE_STATUS = {
  PRESENT: 'present',
  ABSENT: 'absent',
};

/* ---- Session Statuses ---- */
export const SESSION_STATUS = {
  OPEN: 'open',
  CLOSED: 'closed',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
};

/* ---- Email Types ---- */
export const EMAIL_TYPES = {
  REGISTRATION_CONFIRMATION: 'registration_confirmation',
  PAYMENT_REQUEST: 'payment_request',
  PAYMENT_REMINDER: 'payment_reminder',
  CLASS_REMINDER: 'class_reminder',
  PROGRESS_UPDATE: 'progress_update',
};

/* ---- Navigation Links ---- */
export const PUBLIC_NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/classes', label: 'Classes' },
];

export const ADMIN_NAV_LINKS = [
  { path: '/admin', label: 'Overview', icon: 'home' },
  { path: '/admin/today', label: "Today's Classes", icon: 'calendar' },
  { path: '/admin/sessions', label: 'Sessions', icon: 'layers' },
  { path: '/admin/students', label: 'Students', icon: 'users' },
  { path: '/admin/parents', label: 'Parents', icon: 'user-check' },
  { path: '/admin/payments', label: 'Payments', icon: 'credit-card' },
  { path: '/admin/progress', label: 'Progress', icon: 'trending-up' },
  { path: '/admin/paintings', label: 'Paintings', icon: 'image' },
  { path: '/admin/gallery', label: 'Gallery', icon: 'grid' },
  { path: '/admin/testimonials', label: 'Testimonials', icon: 'message-circle' },
  { path: '/admin/emails', label: 'Email Logs', icon: 'mail' },
  { path: '/admin/settings', label: 'Settings', icon: 'settings' },
];

export const DASHBOARD_NAV_LINKS = [
  { path: '/dashboard', label: 'Overview', icon: 'home' },
  { path: '/classes', label: 'Browse Classes', icon: 'search' },
];
