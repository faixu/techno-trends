import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MOCK_POSTS } from '../data/posts';
import { EXCEL_POSTS } from '../data/excelPosts';
import { SQL_POSTS } from '../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../data/agenticAiPosts';
import { OFFLINE_APPS_POST } from '../data/offlineAppsPost';
import { GADGET_REVIEWS } from '../data/gadgetReviews';
import { Post } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock } from 'lucide-react';

export default function Home() {
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
    const staticPosts = [...GADGET_REVIEWS, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS];
    const filteredStatic = staticPosts.filter(p => !deletedStaticIds.includes(p.id));
    setAllPosts([...localPosts, ...filteredStatic]);
  }, []);

  if (allPosts.length === 0) return null;

  const featuredPost = allPosts[0];
  const remainingPosts = allPosts.slice(1);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Helmet>
        <title>TECNO TRENDS | Minimalist Tech Insights</title>
        <meta name="description" content="Curating the future of technology through a minimalistic lens. Simple, focused, and insightful tech reviews and guides." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32">
        {/* Minimal Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div className="lg:col-span-7 space-y-8">
              <Link 
                to={`/category/${featuredPost.category.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600"
              >
                {featuredPost.category}
              </Link>
              <h1 className="text-5xl lg:text-7xl font-light leading-tight tracking-tight">
                {featuredPost.title}
              </h1>
              <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                <Link 
                  to={`/article/${featuredPost.slug}`}
                  className="bg-gray-900 text-white px-10 py-5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 transition-all duration-300 shadow-xl"
                >
                  Read Full Story
                </Link>
                <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <span className="flex items-center"><Clock className="w-3 h-3 mr-2" /> {featuredPost.readTime}</span>
                  <span>•</span>
                  <span>{featuredPost.date}</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-sm">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Minimal Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {remainingPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.1 }}
                className="space-y-6"
              >
                <Link to={`/article/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center uppercase tracking-widest">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light leading-snug tracking-tight hover:text-blue-600 transition-colors">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Simple Newsletter */}
        <section className="border-t border-gray-100 py-32">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-4xl font-light tracking-tight">Stay updated with our weekly digest.</h2>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Email address"
                className="flex-1 bg-gray-50 border-none px-6 py-4 rounded-sm focus:ring-1 focus:ring-gray-200 transition-all"
              />
              <button className="bg-gray-900 text-white px-12 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
