import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, Database, Table, Cpu, Smartphone, BookOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { MOCK_POSTS } from '../../data/posts';
import { EXCEL_POSTS } from '../../data/excelPosts';
import { SQL_POSTS } from '../../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../../data/agenticAiPosts';
import { OFFLINE_APPS_POST } from '../../data/offlineAppsPost';
import { GADGET_REVIEWS } from '../../data/gadgetReviews';
import { Post } from '../../types';

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);

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

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
    const staticPosts = [...GADGET_REVIEWS, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS];
    const filteredStatic = staticPosts.filter(p => !deletedStaticIds.includes(p.id));
    setAllPosts([...localPosts, ...filteredStatic]);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when search modal is open
  React.useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const filteredPosts = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return allPosts.filter(post => {
      const matchTitle = post.title.toLowerCase().includes(query);
      const matchCategory = post.category.toLowerCase().includes(query);
      const matchExcerpt = post.excerpt.toLowerCase().includes(query);
      return matchTitle || matchCategory || matchExcerpt;
    });
  }, [searchQuery, allPosts]);

  const popularKeywords = ['Excel', 'SQL Mastery', 'Agentic AI', 'VLOOKUP', 'Database', 'Gadget'];

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('excel')) return <Table className="w-4 h-4 text-green-600 dark:text-green-400" />;
    if (cat.includes('sql')) return <Database className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
    if (cat.includes('ai') || cat.includes('future')) return <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    if (cat.includes('smartphone') || cat.includes('gadget') || cat.includes('review')) {
      return <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
    return <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />;
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase().trim() ? (
            <mark key={i} className="bg-yellow-105 dark:bg-yellow-900/40 text-blue-600 dark:text-blue-400 font-medium rounded-xs px-0.5">{part}</mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
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
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="group flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
              aria-label="Search posts"
              title="Search posts (⌘K)"
            >
              <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              <span className="hidden xl:inline text-[9px] font-bold text-gray-400 border border-gray-200 dark:border-gray-800 px-1.5 py-0.5 rounded-sm dark:text-gray-500 bg-gray-50 dark:bg-gray-900">
                ⌘K
              </span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
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
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
              aria-label="Search posts"
            >
              <Search className="w-4 h-4 text-gray-905 dark:text-gray-105" />
            </button>

            <button 
              onClick={toggleTheme}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button 
              className="p-2 text-gray-900 dark:text-gray-100 cursor-pointer whitespace-nowrap"
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

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg flex flex-col pt-24 px-4 sm:px-6 lg:px-8 origin-top"
          >
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col">
              {/* Header Input */}
              <div className="relative flex items-center border-b border-gray-100 dark:border-gray-800 pb-6 mb-8 gap-4">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, category, or keywords..."
                  className="w-full bg-transparent border-none text-xl lg:text-3xl font-light placeholder-gray-400 focus:outline-none focus:ring-0 text-gray-900 dark:text-gray-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer"
                  aria-label="Close search"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Suggestions / Keyword Badges */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularKeywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchQuery(kw)}
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all cursor-pointer border",
                        searchQuery.toLowerCase() === kw.toLowerCase()
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-800"
                      )}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results area */}
              <div className="flex-grow overflow-y-auto max-h-[55vh] pb-12 pr-2 scrollbar-thin">
                {searchQuery.trim() === '' ? (
                  <div className="py-20 text-center text-gray-400 dark:text-gray-500 space-y-4">
                    <p className="font-light italic text-sm">Type to search for articles instantly...</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest">Filter by Excel tips, SQL queries, AI algorithms & hardware reviews</p>
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      Found {filteredPosts.length} matches
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      {filteredPosts.map((post) => (
                        <Link
                          key={post.id}
                          to={`/article/${post.slug}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-6 p-4 rounded-xl border border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all group hover:shadow-xs"
                        >
                          {/* Image Thumbnail */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-grow space-y-2">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                                {getCategoryIcon(post.category)}
                                {post.category}
                              </span>
                              <span className="text-[10px] text-gray-300 dark:text-gray-700">•</span>
                              <span className="text-[9px] text-gray-400 flex items-center uppercase tracking-widest">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <h4 className="text-sm sm:text-base font-light text-gray-900 dark:text-gray-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {highlightText(post.title, searchQuery)}
                            </h4>
                            <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1 font-light">
                              {post.excerpt}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <p className="text-gray-400 dark:text-gray-500 font-light italic text-sm">No articles found matching "{searchQuery}"</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
                      Try searching with keywords like <span className="text-blue-600 dark:text-blue-400 cursor-pointer underline font-bold" onClick={() => setSearchQuery('Excel')}>Excel</span> or <span className="text-blue-600 dark:text-blue-400 cursor-pointer underline font-bold" onClick={() => setSearchQuery('AI')}>AI</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Shortcut Info */}
              <div className="border-t border-gray-100 dark:border-gray-800 py-6 text-center sm:text-left flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <span>TECHNO TRENDS Search Engine</span>
                <span className="hidden sm:inline">ESC to close</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
