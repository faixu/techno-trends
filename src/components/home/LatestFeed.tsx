import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { Post } from '../../types';

interface LatestFeedProps {
  posts: Post[];
}

export function LatestFeed({ posts }: LatestFeedProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
              <div className="flex space-x-2">
                {['All', 'AI', 'Gadgets', 'Reviews'].map((filter) => (
                  <button key={filter} className="px-4 py-2 rounded-full text-sm font-bold border border-gray-100 hover:bg-blue-600 hover:text-white transition-all">
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col md:flex-row gap-8 p-6 rounded-3xl hover:bg-gray-50 transition-all"
                >
                  <Link to={`/article/${post.slug}`} className="md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="md:w-2/3 flex flex-col justify-center">
                    <Link to={`/category/${post.category.toLowerCase()}`} className="text-blue-600 text-xs font-bold uppercase tracking-widest mb-3 block">
                      {post.category}
                    </Link>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      <Link to={`/article/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1.5" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1.5" />
                          {post.date}
                        </div>
                      </div>
                      <Link to={`/article/${post.slug}`} className="text-blue-600 font-bold flex items-center group-hover:translate-x-1 transition-transform">
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <button className="w-full py-6 border-2 border-dashed border-gray-200 rounded-3xl text-gray-500 font-bold hover:border-blue-600 hover:text-blue-600 transition-all">
              Load More Articles
            </button>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Social Proof Widget */}
            <div className="bg-gray-900 rounded-[2rem] p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Join the Community</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">50k+</p>
                      <p className="text-xs text-gray-400">Subscribers</p>
                    </div>
                  </div>
                  <button className="text-blue-500 font-bold text-sm">Join</button>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                      <Twitter className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">120k+</p>
                      <p className="text-xs text-gray-400">Followers</p>
                    </div>
                  </div>
                  <button className="text-sky-500 font-bold text-sm">Follow</button>
                </div>
              </div>
            </div>

            {/* Ad Placement */}
            <div className="aspect-[4/5] bg-gray-100 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-200 relative overflow-hidden group">
              <div className="text-center p-8 z-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Advertisement</p>
                <h4 className="text-xl font-bold text-gray-900 mb-4">Upgrade Your Tech Stack</h4>
                <p className="text-sm text-gray-500 mb-6">Get 20% off on all premium gadgets this week.</p>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">Shop Now</button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Popular Topics */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Popular Topics</h3>
              <div className="flex flex-wrap gap-3">
                {['Artificial Intelligence', 'Web3', 'Metaverse', 'Apple', 'Tesla', 'SpaceX', 'Gaming', 'Startups'].map((tag) => (
                  <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className="px-4 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 hover:bg-blue-600 hover:text-white transition-all">
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Twitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
