import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  MessageCircle, 
  Bookmark, 
  ChevronRight,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Newsletter } from '../components/home/Newsletter';
import { ConversionStrategy } from '../components/layout/ConversionStrategy';
import { MOCK_POSTS } from '../data/posts';
import { EXCEL_POSTS } from '../data/excelPosts';
import { SQL_POSTS } from '../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../data/agenticAiPosts';
import { Post } from '../types';

export default function Article() {
  const { slug } = useParams();
  const [post, setPost] = React.useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const allPosts = [...localPosts, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS];
    const foundPost = allPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      setRelatedPosts(allPosts.filter(p => p.id !== foundPost.id).slice(0, 3));
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link to="/" className="text-blue-600 font-bold">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/category/${post.category.toLowerCase()}`} className="hover:text-blue-600">{post.category}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Sidebar: Social Share */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 space-y-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Share</p>
                {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
                <div className="h-20 w-px bg-gray-100 mx-auto"></div>
                <button className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-all">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <article>
                {/* Header */}
                <header className="mb-12">
                  <Link 
                    to={`/category/${post.category.toLowerCase()}`}
                    className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6"
                  >
                    {post.category}
                  </Link>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
                    {post.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                      <img src={post.author.avatar} className="w-12 h-12 rounded-full" alt={post.author.name} />
                      <div>
                        <p className="font-bold text-gray-900">{post.author.name}</p>
                        <p className="text-xs text-gray-500">{post.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {post.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        24 Comments
                      </div>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                <div className="aspect-video rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900">
                  <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>

                {/* Inline CTA */}
                <div className="my-16 bg-gray-50 rounded-[2rem] p-10 border border-gray-100 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Enjoying this article?</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">Subscribe to our newsletter and get the best tech news delivered to your inbox every week.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input 
                      type="email" 
                      placeholder="Your email address"
                      className="w-full sm:w-80 bg-white border border-gray-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-16">
                  {['AI', 'Future', 'Tech', 'Innovation'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-bold text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Author Bio */}
                <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8 mb-16">
                  <img src={post.author.avatar} className="w-24 h-24 rounded-full border-4 border-gray-800" alt={post.author.name} />
                  <div className="text-center md:text-left space-y-4">
                    <div>
                      <h4 className="text-2xl font-bold">{post.author.name}</h4>
                      <p className="text-blue-400 text-sm font-bold">{post.author.role}</p>
                    </div>
                    <p className="text-gray-400 leading-relaxed">
                      Alex is a seasoned tech researcher with over 10 years of experience in AI and machine learning. He loves exploring how technology shapes our future.
                    </p>
                    <div className="flex justify-center md:justify-start space-x-4">
                      <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
                      <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Comments Placeholder Section */}
                <div id="comments" className="mt-16 pt-16 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-2xl font-extrabold text-gray-900 flex items-center">
                      <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                      Comments <span className="ml-3 text-sm font-bold bg-gray-100 text-gray-500 px-3 py-1 rounded-full">24</span>
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>Sort by:</span>
                      <button className="font-bold text-gray-900 flex items-center">
                        Newest <ChevronRight className="w-4 h-4 rotate-90 ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Comment Input Placeholder */}
                  <div className="flex gap-4 mb-12">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 relative">
                      <textarea 
                        placeholder="Join the discussion..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all resize-none"
                      />
                      <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                        </button>
                        <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Mock Comments List */}
                  <div className="space-y-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`flex gap-4 ${i > 1 ? 'opacity-50' : ''}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex-shrink-0" />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                              <span className="text-xs text-gray-400">• 2h ago</span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 w-full bg-gray-100 rounded animate-pulse" />
                            <div className="h-3 w-3/4 bg-gray-100 rounded animate-pulse" />
                          </div>
                          <div className="flex items-center space-x-4 pt-2">
                            <button className="text-xs font-bold text-gray-400 hover:text-blue-600">Reply</button>
                            <button className="text-xs font-bold text-gray-400 hover:text-blue-600">Share</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Loading Indicator */}
                  <div className="mt-12 text-center">
                    <button className="inline-flex items-center px-6 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-3" />
                      Loading more comments...
                    </button>
                  </div>
                </div>
              </article>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-3 space-y-12">
              {/* Table of Contents */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Table of Contents</h3>
                <nav className="space-y-4">
                  <a href="#" className="block text-sm text-blue-600 font-bold">1. The Next Wave of AI</a>
                  <a href="#" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">2. Agentic AI: The Doers</a>
                  <a href="#" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">3. Multimodal Integration</a>
                  <a href="#" className="block text-sm text-gray-500 hover:text-blue-600 transition-colors">4. Conclusion</a>
                </nav>
              </div>

              {/* Related Posts */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map(related => (
                    <Link key={related.id} to={`/article/${related.slug}`} className="group flex items-center space-x-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={related.title} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{related.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{related.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
      <ConversionStrategy />
    </div>
  );
}
