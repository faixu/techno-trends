import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Brand */}
          <div className="md:col-span-3 space-y-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-light tracking-tighter text-gray-900 dark:text-gray-100">
                TECNO<span className="font-bold">TRENDS</span>
              </span>
            </Link>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed max-w-xs">
              Curating the future of technology through a minimalistic lens. Simple, focused, and insightful.
            </p>
            <div className="flex space-x-6">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Excel', path: '/excel-tips' },
                { name: 'SQL', path: '/sql-tips' },
                { name: 'AI', path: '/agentic-ai' },
                { name: 'Gadgets', path: '/category/gadgets-&-reviews' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">Company</h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="md:col-span-5 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100">Newsletter</h4>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm">
              Subscribe to stay updated with newest Excel tricks, SQL queries, and Agentic AI summaries.
            </p>
            <NewsletterForm variant="footer" className="max-w-md" />
            <div className="text-[11px] text-gray-400 dark:text-gray-500 pt-2">
              Questions or feedback? Reach out to us at{' '}
              <a 
                href="mailto:faisal.hassan.0996@gmail.com" 
                className="font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                faisal.hassan.0996@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          <p>© {new Date().getFullYear()} TECNO TRENDS</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Disclaimer</Link>
            <Link to="/sitemap.xml" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Sitemap</Link>
            <Link to="/admin" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors opacity-0 hover:opacity-100 transition-opacity">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
