import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicLayout from '@/components/PublicLayout';
// Public pages
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Stats from '@/pages/Stats';
import Contact from '@/pages/Contact';
// Admin
import AdminLayout from '@/components/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageTeam from '@/pages/admin/ManageTeam';
import ManageTimeline from '@/pages/admin/ManageTimeline';
import ManageGallery from '@/pages/admin/ManageGallery';
import ManageStats from '@/pages/admin/ManageStats';
import ManageSponsors from '@/pages/admin/ManageSponsors';
import AdminSubmissions from '@/pages/admin/AdminSubmissions';
import ManageSettings from '@/pages/admin/ManageSettings';
import Login from '@/pages/Login';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Public site */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin panel */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="team" element={<ManageTeam />} />
          <Route path="timeline" element={<ManageTimeline />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="stats" element={<ManageStats />} />
          <Route path="sponsors" element={<ManageSponsors />} />
          <Route path="submissions" element={<AdminSubmissions />} />
          <Route path="settings" element={<ManageSettings />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App