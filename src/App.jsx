import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/* Public Layout */
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

/* Auth Guards & Dashboard Layouts */
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import AdminLayout from './components/layout/AdminLayout';
import DashboardLayout from './components/layout/DashboardLayout';

/* Public Pages */
import HomePage from './pages/public/HomePage';
import GalleryPage from './pages/public/GalleryPage';
import ClassesPage from './pages/public/ClassesPage';
import ClassDetailPage from './pages/public/ClassDetailPage';
import LoginPage from './pages/public/LoginPage';

/* Dashboard Pages */
import DashboardOverview from './pages/dashboard/DashboardOverview';
import ChildProfilePage from './pages/dashboard/ChildProfilePage';
import ArtJourneyPage from './pages/dashboard/ArtJourneyPage';

/* Admin Pages */
import AdminOverview from './pages/admin/AdminOverview';
import AdminSessionsPage from './pages/admin/AdminSessionsPage';
import AdminTodayPage from './pages/admin/AdminTodayPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminStudentsPage from './pages/admin/AdminStudentsPage';
import AdminProgressPage from './pages/admin/AdminProgressPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

/* Page transition wrapper */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Routes that should NOT show the public Navbar+Footer */
const noLayoutRoutes = ['/login'];
const adminRoutes = /^\/admin/;
const dashboardRoutes = /^\/dashboard/;

export default function App() {
  const location = useLocation();
  const isNoLayout = noLayoutRoutes.includes(location.pathname);
  const isAdmin = adminRoutes.test(location.pathname);
  const isDashboard = dashboardRoutes.test(location.pathname);
  const showPublicLayout = !isNoLayout && !isAdmin && !isDashboard;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Public Navbar — only on public pages */}
      {showPublicLayout && <Navbar />}

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* ============ PUBLIC ROUTES ============ */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              }
            />
            <Route
              path="/gallery"
              element={
                <PageTransition>
                  <GalleryPage />
                </PageTransition>
              }
            />
            <Route
              path="/classes"
              element={
                <PageTransition>
                  <ClassesPage />
                </PageTransition>
              }
            />
            <Route
              path="/classes/:sessionId"
              element={
                <PageTransition>
                  <ClassDetailPage />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PageTransition>
                  <LoginPage />
                </PageTransition>
              }
            />

            {/* ============ DASHBOARD ROUTES (Parent - Protected + Dashboard Layout) ============ */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageTransition>
                      <DashboardOverview />
                    </PageTransition>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/children/:childId"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageTransition>
                      <ChildProfilePage />
                    </PageTransition>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/art-journey/:childId"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <PageTransition>
                      <ArtJourneyPage />
                    </PageTransition>
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* ============ ADMIN ROUTES (Studio Staff - Protected + Admin Sidebar Layout) ============ */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminOverview />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/today"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminTodayPage />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/sessions"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminSessionsPage />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminStudentsPage initialTab="students" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/parents"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminStudentsPage initialTab="parents" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminPaymentsPage />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/progress"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminProgressPage />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/paintings"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminGalleryPage initialTab="paintings" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminGalleryPage initialTab="gallery" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/testimonials"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminGalleryPage initialTab="testimonials" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/emails"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminSettingsPage initialTab="emails" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminRoute>
                  <AdminLayout>
                    <PageTransition>
                      <AdminSettingsPage initialTab="settings" />
                    </PageTransition>
                  </AdminLayout>
                </AdminRoute>
              }
            />

            {/* ============ 404 ============ */}
            <Route
              path="*"
              element={
                <PageTransition>
                  <div style={{ paddingTop: '120px', minHeight: '60vh' }} className="container text-center">
                    <span className="text-6xl block mb-4">🎨</span>
                    <h1 className="font-heading text-3xl font-bold mb-3">Page Not Found</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                  </div>
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Public Footer — only on public pages */}
      {showPublicLayout && <Footer />}
    </div>
  );
}
