import { motion } from 'motion/react';
import { Mail, ShieldCheck, Zap } from 'lucide-react';

export function Newsletter() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-blue-600 rounded-[3rem] p-12 lg:p-20 overflow-hidden shadow-2xl shadow-blue-200"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 rounded-full -ml-32 -mb-32 opacity-50 blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-500/30 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <span>Join 50,000+ Subscribers</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Get the future of tech in your inbox.
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join our community of tech enthusiasts and get weekly insights, reviews, and trends you won't find anywhere else.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-blue-100 text-sm">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  No spam, ever.
                </div>
                <div className="flex items-center text-blue-100 text-sm">
                  <Mail className="w-5 h-5 mr-2" />
                  Unsubscribe anytime.
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-12 rounded-[2rem] shadow-xl">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  />
                </div>
                <button className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]">
                  Subscribe Now - Free
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
