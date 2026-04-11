import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MOCK_POSTS } from '../data/posts';
import { EXCEL_POSTS } from '../data/excelPosts';
import { SQL_POSTS } from '../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../data/agenticAiPosts';
import { OFFLINE_APPS_POST } from '../data/offlineAppsPost';
import { GADGET_REVIEWS } from '../data/gadgetReviews';
import { Post } from '../types';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Clock } from 'lucide-react';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [categoryName, setCategoryName] = React.useState('');

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
    const staticPosts = [...GADGET_REVIEWS, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS];
    const filteredStatic = staticPosts.filter(p => !deletedStaticIds.includes(p.id));
    const allPosts = [...localPosts, ...filteredStatic];

    if (id) {
      const filtered = allPosts.filter(p => 
        p.category.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase() ||
        p.category.toLowerCase() === id.toLowerCase()
      );
      setPosts(filtered);
      if (filtered.length > 0) {
        setCategoryName(filtered[0].category);
      } else {
        // Fallback name generation from slug
        setCategoryName(id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
      }
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Helmet>
        <title>{categoryName} | TECNO TRENDS</title>
        <meta name="description" content={`Explore the latest insights and guides in ${categoryName} on TECNO TRENDS.`} />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-20 text-center space-y-4">
            <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-gray-100">{categoryName}</h1>
            <p className="text-gray-400 dark:text-gray-500 text-sm uppercase tracking-[0.3em] font-bold">Category Archive</p>
          </header>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 3) * 0.1 }}
                  className="space-y-6"
                >
                  <Link to={`/article/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-sm">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {post.category}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 flex items-center uppercase tracking-widest">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl font-light leading-snug tracking-tight text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 space-y-6">
              <p className="text-gray-400 dark:text-gray-500 font-light italic">No posts found in this category yet.</p>
              <Link to="/" className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
