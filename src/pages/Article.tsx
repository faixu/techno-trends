import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion, useScroll, useSpring } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { ConversionStrategy } from '../components/layout/ConversionStrategy';
import { InArticleAd, SidebarAd, AffiliateWidget } from '../components/monetization/AdUnits';
import { MOCK_POSTS } from '../data/posts';
import { EXCEL_POSTS } from '../data/excelPosts';
import { SQL_POSTS } from '../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../data/agenticAiPosts';
import { OFFLINE_APPS_POST } from '../data/offlineAppsPost';
import { GADGET_REVIEWS } from '../data/gadgetReviews';
import { Post } from '../types';

function CodeBlock({ children, className }: { children: any, className?: string }) {
  const [copied, setCopied] = React.useState(false);
  const code = String(children).replace(/\n$/, '');
  const language = className?.replace('language-', '') || 'text';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-8">
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="p-2 bg-white/10 hover:bg-white/20 rounded-md backdrop-blur-sm transition-colors text-white"
          title="Copy code"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{language}</span>
        </div>
        <pre className="p-6 overflow-x-auto">
          <code className="text-sm font-mono text-gray-300 leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = React.useState<Post[]>([]);
  const [copied, setCopied] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post?.title || '');
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
    const staticPosts = [...GADGET_REVIEWS, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS];
    const filteredStatic = staticPosts.filter(p => !deletedStaticIds.includes(p.id));
    const allPosts = [...localPosts, ...filteredStatic];
    const foundPost = allPosts.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      const related = allPosts
        .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Helmet>
        <title>{post.title} | TECNO TRENDS</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={window.location.href} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:site_name" content="TECNO TRENDS" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author.name} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />
        <meta property="twitter:image" content={post.image} />
      </Helmet>

      <Navbar />
      
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-blue-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <header className="mb-16 space-y-8">
                <Link 
                  to={`/category/${post.category.toLowerCase()}`}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400"
                >
                  {post.category}
                </Link>
                <h1 className="text-5xl lg:text-7xl font-light leading-tight tracking-tight text-gray-900 dark:text-gray-100">
                  {post.title}
                </h1>
                
                <div className="flex items-center justify-between py-10 border-y border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-4">
                    <img src={post.author.avatar} className="w-10 h-10 rounded-full grayscale" alt={post.author.name} />
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">{post.author.name}</p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">{post.author.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    <span className="flex items-center"><Calendar className="w-3 h-3 mr-2" /> {post.date}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-2" /> {post.readTime}</span>
                  </div>
                </div>
              </header>

              <div className="aspect-video rounded-sm overflow-hidden bg-gray-100 dark:bg-gray-900 mb-16">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="prose prose-xl prose-gray dark:prose-invert max-w-none">
                <div className="markdown-body font-light leading-relaxed text-gray-600 dark:text-gray-400 space-y-12">
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        return !inline ? (
                          <CodeBlock className={className}>{children}</CodeBlock>
                        ) : (
                          <code className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {post.content.split('\n\n').slice(0, 2).join('\n\n')}
                  </ReactMarkdown>
                  
                  <InArticleAd />
                  
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }: any) {
                        return !inline ? (
                          <CodeBlock className={className}>{children}</CodeBlock>
                        ) : (
                          <code className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {post.content.split('\n\n').slice(2).join('\n\n')}
                  </ReactMarkdown>
                </div>
              </div>

              <AffiliateWidget />

              {/* Comments Section */}
              <section className="mt-32 pt-24 border-t border-gray-100 dark:border-gray-800">
                <h3 className="text-3xl font-light tracking-tight mb-12 text-gray-900 dark:text-gray-100">Comments</h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-sm p-16 text-center space-y-6">
                  <MessageSquare className="w-8 h-8 mx-auto text-gray-200 dark:text-gray-700" />
                  <p className="text-gray-400 dark:text-gray-500 text-sm font-light italic tracking-wide">Comments are currently being moderated. Join the discussion soon.</p>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-24">
              <SidebarAd />
              
              <div className="space-y-8">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-4">Share</h3>
                <div className="flex flex-col gap-6">
                  <button onClick={() => handleShare('copy')} className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
                    <LinkIcon className="w-4 h-4 group-hover:text-blue-600 transition-colors" />
                    <span>{copied ? 'Copied to clipboard' : 'Copy Link'}</span>
                  </button>
                  <button onClick={() => handleShare('twitter')} className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
                    <Twitter className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                    <span>Twitter</span>
                  </button>
                  <button onClick={() => handleShare('linkedin')} className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
                    <Linkedin className="w-4 h-4 group-hover:text-blue-700 transition-colors" />
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>

              <div className="space-y-12">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800 pb-4">Related Posts</h3>
                <div className="space-y-12">
                  {relatedPosts.map(related => (
                    <Link key={related.id} to={`/article/${related.slug}`} className="group block space-y-4">
                      <div className="aspect-[16/10] rounded-sm overflow-hidden bg-gray-100 dark:bg-gray-900">
                        <img src={related.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={related.title} referrerPolicy="no-referrer" />
                      </div>
                      <h4 className="text-lg font-light leading-snug tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{related.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <ConversionStrategy />
    </div>
  );
}
