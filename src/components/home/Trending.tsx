import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Post } from '../../types';

interface TrendingProps {
  posts: Post[];
}

export function Trending({ posts }: TrendingProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <Link to="/trending" className="text-blue-600 font-bold flex items-center hover:underline">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <Link to={`/article/${post.slug}`} className="block relative aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {post.category}
                  </span>
                </div>
              </Link>
              <div className="p-8">
                <div className="flex items-center text-xs text-gray-400 mb-4 uppercase font-bold tracking-widest">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  <Link to={`/article/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center space-x-3">
                    <img src={post.author.avatar} className="w-8 h-8 rounded-full" alt={post.author.name} />
                    <span className="text-sm font-bold text-gray-700">{post.author.name}</span>
                  </div>
                  <Link to={`/article/${post.slug}`} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
