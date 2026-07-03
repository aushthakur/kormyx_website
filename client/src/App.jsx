import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import DynamicPage from './pages/DynamicPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      {/* Catch-all route for all dynamically generated themed pages */}
      <Route path="/*" element={<DynamicPage />} />
    </Routes>
  );
}

export default App;
