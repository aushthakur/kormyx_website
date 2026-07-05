import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import DynamicPage from './pages/DynamicPage';
import Blog from './pages/Blog';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/company/about" element={<About />} />
      {/* Catch-all route for all dynamically generated themed pages */}
      <Route path="/*" element={<DynamicPage />} />
    </Routes>
  );
}

export default App;
