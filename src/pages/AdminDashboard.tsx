import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Trash2, Edit, Plus, Search, Filter, ExternalLink, AlertCircle, DollarSign, Download, Mail } from 'lucide-react';
import { Post } from '../types';
import { MOCK_POSTS } from '../data/posts';
import { EXCEL_POSTS } from '../data/excelPosts';
import { SQL_POSTS } from '../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../data/agenticAiPosts';
import { OFFLINE_APPS_POST } from '../data/offlineAppsPost';
import { GADGET_REVIEWS } from '../data/gadgetReviews';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<'articles' | 'subscribers'>('articles');
  const [subscribers, setSubscribers] = React.useState<any[]>([]);
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('All');
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [subscriberSearchTerm, setSubscriberSearchTerm] = React.useState('');
  const [deletingSubId, setDeletingSubId] = React.useState<string | null>(null);

  const loadSubscribers = () => {
    try {
      const subs = JSON.parse(localStorage.getItem('tecno_trends_subscribers') || '[]');
      setSubscribers(subs);
    } catch (e) {
      setSubscribers([]);
    }
  };

  const loadPosts = () => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
    
    const staticPosts = [...GADGET_REVIEWS, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS];
    const filteredStatic = staticPosts.filter(p => !deletedStaticIds.includes(p.id));
    
    setAllPosts([...localPosts, ...filteredStatic]);
  };

  React.useEffect(() => {
    loadPosts();
    loadSubscribers();
  }, []);

  const handleDelete = (postId: string, isStatic: boolean) => {
    if (isStatic) {
      const deletedStaticIds = JSON.parse(localStorage.getItem('tecno_trends_deleted_static_ids') || '[]');
      localStorage.setItem('tecno_trends_deleted_static_ids', JSON.stringify([...deletedStaticIds, postId]));
    } else {
      const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
      const updatedLocal = localPosts.filter((p: Post) => p.id !== postId);
      localStorage.setItem('tecno_trends_posts', JSON.stringify(updatedLocal));
    }

    setDeletingId(null);
    loadPosts();
  };

  const handleDeleteSubscriber = (subId: string) => {
    try {
      const subs = JSON.parse(localStorage.getItem('tecno_trends_subscribers') || '[]');
      const updated = subs.filter((s: any) => s.id !== subId);
      localStorage.setItem('tecno_trends_subscribers', JSON.stringify(updated));
      setDeletingSubId(null);
      loadSubscribers();
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const header = 'id,email,date,timestamp\n';
    const rows = subscribers.map(s => `"${s.id}","${s.email}","${s.date}",${s.timestamp}`).join('\n');
    const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(header + rows);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `tecno_trends_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(subscriberSearchTerm.toLowerCase())
  );

  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-500">Manage your articles, edit content, and monitor performance.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/monetization"
                className="flex items-center justify-center bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
              >
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                Monetization Map
              </Link>
              <Link 
                to="/admin/create"
                className="flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Article
              </Link>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Articles', value: allPosts.length, color: 'blue' },
              { label: 'Published', value: allPosts.length, color: 'green' },
              { label: 'Subscribers', value: subscribers.length, color: 'indigo' },
              { label: 'Total Views', value: '12.4K', color: 'purple' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</p>
                <p className={`text-3xl font-black text-${stat.color}-600`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-100 dark:border-gray-800 mb-8 space-x-8">
            <button
              onClick={() => setActiveTab('articles')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                activeTab === 'articles'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`pb-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all cursor-pointer ${
                activeTab === 'subscribers'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400 hover:text-gray-900'
              }`}
            >
              Newsletter Subscribers ({subscribers.length})
            </button>
          </div>

          {activeTab === 'articles' ? (
            <>
              {/* Filters & Search */}
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    placeholder="Search articles by title or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all font-sans"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="pl-10 pr-10 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 appearance-none font-bold text-gray-700"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Articles Table */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Article</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Author</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => {
                          const isStatic = [...GADGET_REVIEWS, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS].some(p => p.id === post.id);
                          return (
                            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={post.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                      {isStatic && (
                                        <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase tracking-tighter">System</span>
                                      )}
                                      <span className="text-xs text-gray-400">ID: {post.id.slice(0, 8)}...</span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                  {post.category}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                  <img src={post.author.avatar} className="w-6 h-6 rounded-full" alt="" />
                                  <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
                                </div>
                              </td>
                              <td className="px-8 py-6 text-sm text-gray-500">
                                {post.date}
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center justify-end gap-2">
                                  {deletingId === post.id ? (
                                    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                                      <span className="text-xs font-bold text-red-600 uppercase">Confirm?</span>
                                      <button 
                                        onClick={() => handleDelete(post.id, isStatic)}
                                        className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-all"
                                      >
                                        Delete
                                      </button>
                                      <button 
                                        onClick={() => setDeletingId(null)}
                                        className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <Link 
                                        to={`/article/${post.slug}`}
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                                        title="View Article"
                                      >
                                        <ExternalLink className="w-5 h-5" />
                                      </Link>
                                      <button 
                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                        title="Edit Article"
                                      >
                                        <Edit className="w-5 h-5" />
                                      </button>
                                      <button 
                                        onClick={() => setDeletingId(post.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        title="Delete Article"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                              <p className="text-lg font-bold">No articles found matching your criteria.</p>
                              <button 
                                onClick={() => { setSearchTerm(''); setFilterCategory('All'); }}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                              >
                                Clear all filters
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Subscribers Filters & Control Bar */}
              <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 flex flex-col sm:flex-row gap-6 items-center justify-between">
                <div className="flex-grow w-full sm:max-w-md relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    placeholder="Search subscribers by email..."
                    value={subscriberSearchTerm}
                    onChange={(e) => setSubscriberSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  disabled={subscribers.length === 0}
                  className="w-full sm:w-auto flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900 font-bold px-6 py-4 rounded-2xl transition-all cursor-pointer disabled:opacity-50 text-sm whitespace-nowrap gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export CSV ({subscribers.length})
                </button>
              </div>

              {/* Subscribers Table */}
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Subscriber (Email)</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Date Subscribed</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest">ID</th>
                        <th className="px-8 py-6 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredSubscribers.length > 0 ? (
                        filteredSubscribers.map((sub) => (
                          <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-sans">
                                  <Mail className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-gray-800 text-sm">{sub.email}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6 text-sm text-gray-500">
                              {sub.date}
                            </td>
                            <td className="px-8 py-6 text-xs text-gray-400 font-mono">
                              {sub.id}
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center justify-end gap-2">
                                {deletingSubId === sub.id ? (
                                  <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
                                    <span className="text-xs font-bold text-red-600 uppercase">Confirm?</span>
                                    <button 
                                      onClick={() => handleDeleteSubscriber(sub.id)}
                                      className="bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-all"
                                    >
                                      Delete
                                    </button>
                                    <button 
                                      onClick={() => setDeletingSubId(null)}
                                      className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-all"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button 
                                    onClick={() => setDeletingSubId(sub.id)}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                                    title="Remove Subscriber"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <Mail className="w-12 h-12 mb-4 opacity-20" />
                              <p className="text-lg font-bold">No subscribers found matching your search.</p>
                              {subscriberSearchTerm && (
                                <button 
                                  onClick={() => setSubscriberSearchTerm('')}
                                  className="mt-4 text-blue-600 font-bold hover:underline cursor-pointer"
                                >
                                  Clear filter
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
