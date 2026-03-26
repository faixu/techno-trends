import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './pages/Home';
import Article from './pages/Article';
import CreatePost from './pages/CreatePost';
import ExcelTips from './pages/ExcelTips';
import SQLTips from './pages/SQLTips';
import AgenticAI from './pages/AgenticAI';

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="/admin/create" element={<CreatePost />} />
        <Route path="/excel-tips" element={<ExcelTips />} />
        <Route path="/sql-tips" element={<SQLTips />} />
        <Route path="/agentic-ai" element={<AgenticAI />} />
        {/* Fallback to home for demo purposes */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Analytics />
    </Router>
  );
}
