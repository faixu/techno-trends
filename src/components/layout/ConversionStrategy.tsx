import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, ArrowRight } from 'lucide-react';

export function ConversionStrategy() {
  const [showExitIntent, setShowExitIntent] = React.useState(false);
  const [showStickyBar, setShowStickyBar] = React.useState(false);

  React.useEffect(() => {
    // Show sticky bar after 5 seconds
    const timer = setTimeout(() => setShowStickyBar(true), 5000);

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !localStorage.getItem('exit-intent-shown')) {
        setShowExitIntent(true);
        localStorage.setItem('exit-intent-shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Sticky Subscribe Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-colors duration-300"
          >
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-sm flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white dark:text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest">Stay ahead of the curve</p>
                  <p className="text-gray-400 dark:text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-1">Weekly tech insights delivered to your inbox.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-sm px-6 py-3 text-xs font-light focus:outline-none focus:ring-1 focus:ring-blue-600 flex-grow sm:w-72 transition-all text-gray-900 dark:text-gray-100"
                />
                <button className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 transition-all whitespace-nowrap">
                  Subscribe
                </button>
                <button 
                  onClick={() => setShowStickyBar(false)}
                  className="text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-sm max-w-3xl w-full overflow-hidden shadow-2xl relative border border-gray-100 dark:border-gray-800"
            >
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-8 right-8 p-2 text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-gray-900 dark:bg-gray-950 p-16 text-white flex flex-col justify-center space-y-8">
                  <div className="w-14 h-14 bg-white/10 rounded-sm flex items-center justify-center">
                    <ZapIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-light leading-tight tracking-tight">The 2026 AI Playbook</h3>
                    <p className="text-gray-400 text-sm font-light leading-relaxed">Download our exclusive guide to the tools that will redefine the next decade. Free for a limited time.</p>
                  </div>
                </div>
                <div className="p-16 flex flex-col justify-center bg-white dark:bg-gray-900">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="alex@example.com"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-sm py-4 px-6 text-sm font-light focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <button className="w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 py-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-300 shadow-xl">
                      Get the Guide
                    </button>
                    <p className="text-center text-[9px] text-gray-300 dark:text-gray-600 uppercase tracking-widest">
                      Privacy first. No spam, ever.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
