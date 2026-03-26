import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';

const CATEGORIES = [
  "AI & Future Tech",
  "Smartphones",
  "Gadgets & Reviews",
  "Apps & Tools",
  "How-To Guides",
  "Tech News"
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
      isScrolled ? "bg-white/80 backdrop-blur-md py-3 border-gray-200" : "bg-white py-5 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Tecno<span className="text-blue-600">Trends</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/excel-tips"
              className="text-sm font-bold text-green-600 hover:text-green-700 transition-colors flex items-center"
            >
              <span className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
              Excel Tips
            </Link>
            <Link 
              to="/sql-tips"
              className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center"
            >
              <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 animate-pulse"></span>
              SQL Tips
            </Link>
            <Link 
              to="/agentic-ai"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors flex items-center"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Agentic AI
            </Link>
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link 
                key={cat} 
                to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                {cat}
              </Link>
            ))}
            <div className="relative group">
              <button className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                More <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {CATEGORIES.slice(4).map((cat) => (
                  <Link 
                    key={cat}
                    to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-5">
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link 
              to="/admin/create"
              className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
            >
              Write Post
            </Link>
            <Link 
              to="/subscribe"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[73px] bg-white z-40 transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 space-y-6">
          <Link 
            to="/admin/create"
            className="block text-lg font-semibold text-blue-600 border-b border-gray-100 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Write New Post
          </Link>
          <Link 
            to="/excel-tips"
            className="block text-lg font-semibold text-green-600 border-b border-gray-100 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Excel Mastery Hub
          </Link>
          <Link 
            to="/sql-tips"
            className="block text-lg font-semibold text-indigo-600 border-b border-gray-100 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            SQL Mastery Hub
          </Link>
          <Link 
            to="/agentic-ai"
            className="block text-lg font-semibold text-blue-600 border-b border-gray-100 pb-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Agentic AI Mastery
          </Link>
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat}
              to={`/category/${cat.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className="block text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <Link 
            to="/subscribe"
            className="block w-full bg-blue-600 text-white text-center py-4 rounded-xl font-bold text-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
