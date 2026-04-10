import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Helmet>
        <title>Contact Us | TECNO TRENDS</title>
        <meta name="description" content="Get in touch with TECNO TRENDS. We'd love to hear your feedback, questions, or collaboration ideas." />
      </Helmet>
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-light tracking-tight text-gray-900">Get in touch.</h1>
                <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
                  Have a question, feedback, or a collaboration idea? We'd love to hear from you.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-500 font-light">faisal.hassan.0996@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-1">Social Media</h3>
                    <p className="text-gray-500 font-light">@tecnotrends on Twitter & Instagram</p>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-900" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-1">Office</h3>
                    <p className="text-gray-500 font-light">San Francisco, CA</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form className="space-y-8 bg-gray-50 p-12 rounded-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white border-none px-6 py-4 rounded-sm focus:ring-1 focus:ring-gray-200 transition-all font-light"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white border-none px-6 py-4 rounded-sm focus:ring-1 focus:ring-gray-200 transition-all font-light"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border-none px-6 py-4 rounded-sm focus:ring-1 focus:ring-gray-200 transition-all font-light"
                    placeholder="What is this about?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full bg-white border-none px-6 py-4 rounded-sm focus:ring-1 focus:ring-gray-200 transition-all font-light resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button className="w-full bg-gray-900 text-white py-5 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
