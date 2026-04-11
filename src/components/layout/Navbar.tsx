import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled 
        ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md py-4 border-b border-gray-100 dark:border-gray-800" 
        : "bg-white dark:bg-gray-950 py-8 border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-light tracking-tighter text-gray-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
              TECNO<span className="font-bold">TRENDS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {[
              { name: 'Excel', path: '/excel-tips' },
              { name: 'SQL', path: '/sql-tips' },
              { name: 'AI', path: '/agentic-ai' },
              { name: 'Gadgets', path: '/category/gadgets-&-reviews' }
            ].map((item) => (
              <Link 
                key={item.name} 
                to={item.path}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <Link 
              to="/subscribe"
              className="text-[10px] font-bold uppercase tracking-[0.2em] bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button 
              className="p-2 text-gray-900 dark:text-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-[89px] bg-white dark:bg-gray-950 z-40 transition-all duration-500 ease-in-out",
        isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
      )}>
        <div className="p-8 space-y-8">
          {[
            { name: 'Excel Mastery', path: '/excel-tips' },
            { name: 'SQL Mastery', path: '/sql-tips' },
            { name: 'Agentic AI', path: '/agentic-ai' }
          ].map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className="block text-3xl font-light tracking-tight text-gray-900 dark:text-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link 
            to="/subscribe"
            className="block w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-center py-5 rounded-sm font-bold text-sm uppercase tracking-widest"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
