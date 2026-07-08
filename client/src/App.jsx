import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import DynamicPage from './pages/DynamicPage';
import Blog from './pages/Blog';
import About from './pages/About';
import SaasDevelopment from './pages/SaasDevelopment';
import WebDevelopment from './pages/WebDevelopment';
import AppDevelopment from './pages/AppDevelopment';
import BrandPositioning from './pages/BrandPositioning';
import ContentCreation from './pages/ContentCreation';
import DigitalMarketing from './pages/DigitalMarketing';
import PaidAdsSeo from './pages/PaidAdsSeo';
import BlogPost from './pages/BlogPost';
import AnalyticsTracker from './components/AnalyticsTracker';
import ScheduleModal from './components/ScheduleModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('openModal') === 'true') {
      setIsGlobalModalOpen(true);
    }
  }, [location.search]);

  const handleCloseModal = () => {
    setIsGlobalModalOpen(false);
    const params = new URLSearchParams(location.search);
    if (params.get('openModal') === 'true') {
      params.delete('openModal');
      navigate({ search: params.toString() }, { replace: true });
    }
  };

  return (
    <>
      <AnalyticsTracker />
      <ScheduleModal isOpen={isGlobalModalOpen} onClose={handleCloseModal} />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/company/about" element={<About />} />
      <Route path="/services/saas-development" element={<SaasDevelopment />} />
      <Route path="/services/website-development" element={<WebDevelopment />} />
      <Route path="/services/app-development" element={<AppDevelopment />} />
      <Route path="/services/brand-positioning" element={<BrandPositioning />} />
      <Route path="/services/content-creation" element={<ContentCreation />} />
      <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
      <Route path="/services/paid-ads-seo" element={<PaidAdsSeo />} />
      {/* Catch-all route for all dynamically generated themed pages */}
      <Route path="/*" element={<DynamicPage />} />
    </Routes>
    </>
  );
}

export default App;
