import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import Article from './pages/Article';
import CreatePost from './pages/CreatePost';
import AdminDashboard from './pages/AdminDashboard';
import MonetizationMap from './pages/MonetizationMap';
import ExcelTips from './pages/ExcelTips';
import SQLTips from './pages/SQLTips';
import AgenticAI from './pages/AgenticAI';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';
import Category from './pages/Category';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create" element={<CreatePost />} />
          <Route path="/admin/monetization" element={<MonetizationMap />} />
          <Route path="/excel-tips" element={<ExcelTips />} />
          <Route path="/sql-tips" element={<SQLTips />} />
          <Route path="/agentic-ai" element={<AgenticAI />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/category/:id" element={<Category />} />
          {/* Fallback to home for demo purposes */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
