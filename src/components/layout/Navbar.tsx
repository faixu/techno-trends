import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';

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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-gray-100" : "bg-white py-8 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-light tracking-tighter text-gray-900 group-hover:text-blue-600 transition-colors">
              TECNO<span className="font-bold">TRENDS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { name: 'Excel', path: '/excel-tips' },
              { name: 'SQL', path: '/sql-tips' },
              { name: 'AI', path: '/agentic-ai' },
              { name: 'Gadgets', path: '/category/gadgets-&-reviews' },
              { name: 'Dashboard', path: '/admin' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-gray-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link 
              to="/subscribe"
              className="text-[10px] font-bold uppercase tracking-[0.2em] bg-gray-900 text-white px-6 py-3 rounded-sm hover:bg-gray-800 transition-all"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[89px] bg-white z-40 transition-all duration-500 ease-in-out",
        isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
      )}>
        <div className="p-8 space-y-8">
          {[
            { name: 'Excel Mastery', path: '/excel-tips' },
            { name: 'SQL Mastery', path: '/sql-tips' },
            { name: 'Agentic AI', path: '/agentic-ai' },
            { name: 'Admin Dashboard', path: '/admin' },
            { name: 'Write New Post', path: '/admin/create' }
          ].map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="block text-3xl font-light tracking-tight text-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/subscribe"
            className="block w-full bg-gray-900 text-white text-center py-5 rounded-sm font-bold text-sm uppercase tracking-widest"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
