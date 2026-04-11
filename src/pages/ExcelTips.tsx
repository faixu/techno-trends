import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Clock, User, Calendar, Table, Search } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ConversionStrategy } from '../components/layout/ConversionStrategy';
import { EXCEL_POSTS } from '../data/excelPosts';
import { Post } from '../types';

export default function ExcelTips() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
    const excelLocalPosts = localPosts.filter((p: Post) => p.category === "Excel Mastery");
    const filteredStatic = EXCEL_POSTS.filter(p => !deletedStaticIds.includes(p.id));
    setAllPosts([...excelLocalPosts, ...filteredStatic]);
  }, []);

  const filteredPosts = allPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Helmet>
        <title>Excel Mastery Hub | TECNO TRENDS</title>
        <meta name="description" content="Unlock the full potential of Microsoft Excel with our comprehensive collection of tips, formulas, and advanced techniques." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
              <Table className="w-4 h-4" />
              <span>50+ Excel Tips & Tricks</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              Excel <span className="text-green-600 dark:text-green-400">Mastery</span> Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Unlock the full potential of Microsoft Excel with our comprehensive collection of tips, formulas, and advanced techniques.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search for an Excel tip (e.g., VLOOKUP, Pivot Tables)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-green-600 transition-all text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 6) * 0.05 }}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
              >
                <Link to={`/article/${post.slug}`} className="block relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="p-8">
                  <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mb-4 uppercase font-bold tracking-widest">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
                    <Link to={`/article/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-800">
                    <div className="flex items-center space-x-3">
                      <img src={post.author.avatar} className="w-8 h-8 rounded-full" alt={post.author.name} />
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{post.author.name}</span>
                    </div>
                    <Link to={`/article/${post.slug}`} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-green-600 dark:group-hover:bg-green-500 group-hover:text-white transition-all text-gray-900 dark:text-gray-100">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No Excel tips found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ConversionStrategy />
    </div>
  );
}
