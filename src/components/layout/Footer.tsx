import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          {/* Brand */}
          <div className="md:col-span-4 space-y-8">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-light tracking-tighter text-gray-900">
                TECNO<span className="font-bold">TRENDS</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Curating the future of technology through a minimalistic lens. Simple, focused, and insightful.
            </p>
            <div className="flex space-x-6">
              {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Explore</h4>
            <ul className="space-y-4">
              {['Excel', 'SQL', 'AI', 'Gadgets'].map((item) => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Company</h4>
            <ul className="space-y-4">
              {['About', 'Contact', 'Privacy', 'Terms'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-900">Connect</h4>
            <p className="text-sm text-gray-400">Questions or feedback? Reach out to us anytime.</p>
            <a href="mailto:faisal.hassan.0996@gmail.com" className="block text-lg font-light tracking-tight text-gray-900 hover:text-blue-600 transition-colors">
              faisal.hassan.0996@gmail.com
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <p>© {new Date().getFullYear()} TECNO TRENDS</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link to="/disclaimer" className="hover:text-gray-900 transition-colors">Disclaimer</Link>
            <Link to="/sitemap.xml" className="hover:text-gray-900 transition-colors">Sitemap</Link>
            <Link to="/admin" className="hover:text-gray-900 transition-colors opacity-0 hover:opacity-100 transition-opacity">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
