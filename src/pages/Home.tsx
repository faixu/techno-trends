import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { Trending } from '../components/home/Trending';
import { LatestFeed } from '../components/home/LatestFeed';
import { Newsletter } from '../components/home/Newsletter';
import { ConversionStrategy } from '../components/layout/ConversionStrategy';
import { MOCK_POSTS } from '../data/posts';
import { EXCEL_POSTS } from '../data/excelPosts';
import { SQL_POSTS } from '../data/sqlPosts';
import { AGENTIC_AI_POSTS } from '../data/agenticAiPosts';
import { OFFLINE_APPS_POST } from '../data/offlineAppsPost';
import { Post } from '../types';

export default function Home() {
  const [allPosts, setAllPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const localPosts = JSON.parse(localStorage.getItem('tecno_trends_posts') || '[]');
    setAllPosts([...localPosts, ...OFFLINE_APPS_POST, ...AGENTIC_AI_POSTS, ...SQL_POSTS, ...EXCEL_POSTS, ...MOCK_POSTS]);
  }, []);

  const featuredPost = allPosts.find(p => p.featured) || allPosts[0];
  const trendingPosts = allPosts.filter(p => p.trending).slice(0, 3);
  const latestPosts = allPosts.slice(0, 5);

  if (allPosts.length === 0) return null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero post={featuredPost} />
        <Trending posts={trendingPosts} />
        <LatestFeed posts={latestPosts} />
        <Newsletter />
      </main>
      <Footer />
      <ConversionStrategy />
    </div>
  );
}
