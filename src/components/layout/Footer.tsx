import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Tecno<span className="text-blue-600">Trends</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Your daily source for the latest in technology, AI, gadgets, and future trends. We simplify the complex world of tech.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Disclaimer', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-blue-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">Categories</h4>
            <ul className="space-y-4">
              {['AI & Future Tech', 'Smartphones', 'Gadgets & Reviews', 'Apps & Tools', 'How-To Guides'].map((item) => (
                <li key={item}>
                  <Link to={`/category/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:text-blue-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-6">Get the latest tech news delivered to your inbox weekly.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Your email address"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-600 transition-colors"
              />
              <button className="absolute right-2 top-2 bg-blue-600 p-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Tecno Trends. All rights reserved. Designed for high conversion.</p>
        </div>
      </div>
    </footer>
  );
}
