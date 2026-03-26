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
            className="fixed bottom-0 left-0 right-0 z-[60] bg-gray-900 border-t border-gray-800 p-4 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center animate-bounce">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Don't miss out on the latest tech trends!</p>
                  <p className="text-gray-400 text-xs">Join 50k+ readers getting weekly updates.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-600 flex-grow sm:w-64"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all whitespace-nowrap">
                  Join Now
                </button>
                <button 
                  onClick={() => setShowStickyBar(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setShowExitIntent(false)}
                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-blue-600 p-12 text-white flex flex-col justify-center space-y-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <ZapIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-extrabold leading-tight">Wait! Get our "Top 10 AI Tools" PDF for FREE.</h3>
                  <p className="text-blue-100">Before you go, grab our exclusive guide to the tools that will redefine 2026.</p>
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <form className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                      Send Me the PDF
                    </button>
                    <p className="text-center text-xs text-gray-400">
                      We value your privacy. Unsubscribe at any time.
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
