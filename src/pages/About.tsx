import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Helmet>
        <title>About Us | TECNO TRENDS</title>
        <meta name="description" content="Learn more about TECNO TRENDS, our mission, and our passion for minimalistic tech insights." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-gray-900">
              Curating the future of technology.
            </h1>
            
            <div className="aspect-video rounded-sm overflow-hidden bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
                alt="Our Workspace" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-gray max-w-none font-light leading-relaxed text-gray-600 space-y-8">
              <p className="text-xl text-gray-900">
                TECNO TRENDS was founded on a simple principle: technology should be understood, not just consumed. In a world of constant noise and rapid iterations, we provide a space for focused, insightful, and minimalistic tech analysis.
              </p>
              
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Our Mission</h2>
                <p>
                  Our mission is to bridge the gap between complex technical advancements and everyday utility. We strip away the jargon and the hype to deliver content that matters—whether it's mastering a new software tool, understanding the implications of AI, or choosing the right gadget for your lifestyle.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Why Minimalism?</h2>
                <p>
                  We believe that clarity is the ultimate sophistication. Our design and our content reflect this philosophy. By removing distractions, we allow the core ideas and insights to shine through, providing a better reading and learning experience for our community.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-widest">Join Our Journey</h2>
                <p>
                  Technology is a journey we are all on together. We invite you to explore our guides, reviews, and insights as we navigate the ever-evolving landscape of the digital age.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
