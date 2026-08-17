import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LocationsPage } from './pages/LocationsPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminLocationsPage } from './pages/admin/AdminLocationsPage';
import { AdminQuotationsPage } from './pages/admin/AdminQuotationsPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="request-quote" element={<QuotePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="projects" element={<AdminProjectsPage />} />
          <Route path="locations" element={<AdminLocationsPage />} />
          <Route path="quotations" element={<AdminQuotationsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
