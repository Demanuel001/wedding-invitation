import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import SlideshowPage from './pages/SlideshowPage';
import GiftsPage from './pages/GiftsPage';
import ConfirmPage from './pages/ConfirmPage';

import './index.css';

function App() {
  useEffect(() => {
    document.title = 'Convite de Casamento';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/slideshow" element={<SlideshowPage />} />
        <Route path="/gifts" element={<GiftsPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
      </Routes>
    </Router>
  );
}

export default App;
