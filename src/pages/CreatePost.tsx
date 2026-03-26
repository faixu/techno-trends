import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Save, Image as ImageIcon, Type, FileText, Tag, User as UserIcon, ArrowLeft, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Category, Post } from '../types';
import { cn } from '../lib/utils';

const CATEGORIES: Category[] = [
  "AI & Future Tech",
  "Smartphones",
  "Gadgets & Reviews",
  "Apps & Tools",
  "How-To Guides",
  "Tech News"
];

export default function CreatePost() {
  const navigate = useNavigate();
  const [isPreview, setIsPreview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    category: CATEGORIES[0],
    excerpt: '',
    content: '',
    image: 'https://picsum.photos/seed/tech/1200/600',
    authorName: 'Admin User',
    authorRole: 'Editor'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newPost: Post = {
      id: Date.now().toString(),
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category as Category,
      author: {
        name: formData.authorName,
        avatar: `https://i.pravatar.cc/150?u=${formData.authorName}`,
        role: formData.authorRole
      },
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.ceil(formData.content.split(' ').length / 200)} min read`,
      image: formData.image,
      trending: false,
      featured: false
    };

    // In a real app, this would be an API call. 
    // For this demo, we'll save to localStorage so it persists in the session.
    const existingPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    localStorage.setItem('tecno_trends_posts', JSON.stringify([newPost, ...existingPosts]));

    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/admin');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-white rounded-full transition-colors text-gray-500"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsPreview(!isPreview)}
                className={cn(
                  "flex items-center px-6 py-2.5 rounded-xl font-bold transition-all border-2",
                  isPreview ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-100 hover:border-blue-600"
                )}
              >
                <Eye className="w-5 h-5 mr-2" />
                {isPreview ? 'Edit Mode' : 'Preview'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting || isSuccess}
                className={cn(
                  "flex items-center bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100",
                  (isSubmitting || isSuccess) ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
                )}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </span>
                ) : isSuccess ? (
                  'Success!'
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </div>

          {isSuccess && (
            <div className="mb-8 bg-green-50 border border-green-100 text-green-700 px-6 py-4 rounded-2xl flex items-center animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Save className="w-4 h-4" />
              </div>
              <p className="font-bold">Post published successfully! Redirecting to dashboard...</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-8">
            {!isPreview ? (
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100 space-y-8">
                {/* Title */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <Type className="w-4 h-4 mr-2 text-blue-600" />
                    Article Title
                  </label>
                  <input 
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a catchy headline..."
                    className="w-full text-3xl font-bold bg-gray-50 border-none rounded-2xl py-6 px-8 focus:ring-2 focus:ring-blue-600 placeholder:text-gray-300"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-bold text-gray-700">
                      <Tag className="w-4 h-4 mr-2 text-blue-600" />
                      Category
                    </label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600 font-medium"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-bold text-gray-700">
                      <ImageIcon className="w-4 h-4 mr-2 text-blue-600" />
                      Featured Image URL
                    </label>
                    <input 
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Short Excerpt
                  </label>
                  <textarea 
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={2}
                    placeholder="A brief summary of the article for the feed..."
                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600 resize-none"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-gray-700">
                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                    Content (Markdown Supported)
                  </label>
                  <textarea 
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={15}
                    placeholder="Write your story here... Use markdown for formatting."
                    className="w-full bg-gray-50 border-none rounded-2xl py-6 px-8 focus:ring-2 focus:ring-blue-600 font-mono text-sm leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                  {/* Author Name */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-bold text-gray-700">
                      <UserIcon className="w-4 h-4 mr-2 text-blue-600" />
                      Author Name
                    </label>
                    <input 
                      type="text"
                      name="authorName"
                      value={formData.authorName}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  {/* Author Role */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-bold text-gray-700">
                      <UserIcon className="w-4 h-4 mr-2 text-blue-600" />
                      Author Role
                    </label>
                    <input 
                      type="text"
                      name="authorRole"
                      value={formData.authorRole}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100">
                <header className="mb-12">
                  <span className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                    {formData.category}
                  </span>
                  <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-8">
                    {formData.title || 'Untitled Article'}
                  </h1>
                  <div className="flex items-center space-x-4 pb-8 border-b border-gray-100">
                    <img src={`https://i.pravatar.cc/150?u=${formData.authorName}`} className="w-12 h-12 rounded-full" alt="author" />
                    <div>
                      <p className="font-bold text-gray-900">{formData.authorName}</p>
                      <p className="text-xs text-gray-500">{formData.authorRole}</p>
                    </div>
                  </div>
                </header>

                <div className="aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-lg">
                  <img 
                    src={formData.image} 
                    alt="preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  <ReactMarkdown>{formData.content || '*No content yet...*'}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
