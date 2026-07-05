import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import DynamicPage from './pages/DynamicPage';
import Blog from './pages/Blog';
import About from './pages/About';
import SaasDevelopment from './pages/SaasDevelopment';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/company/about" element={<About />} />
      <Route path="/services/saas-development" element={<SaasDevelopment />} />
      {/* Catch-all route for all dynamically generated themed pages */}
      <Route path="/*" element={<DynamicPage />} />
    </Routes>
  );
}

export default App;
