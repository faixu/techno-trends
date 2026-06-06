import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsletterFormProps {
  className?: string;
  variant?: 'sidebar' | 'footer' | 'default';
}

export function NewsletterForm({ className, variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    // Simulate submission delay
    setTimeout(() => {
      try {
        const existingSubscribers = JSON.parse(localStorage.getItem('tecno_trends_subscribers') || '[]');
        
        // Avoid duplicates
        if (!existingSubscribers.some((sub: any) => sub.email.toLowerCase() === email.toLowerCase())) {
          const newSubscriber = {
            id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
            email: email.trim(),
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }),
            timestamp: Date.now(),
          };
          existingSubscribers.push(newSubscriber);
          localStorage.setItem('tecno_trends_subscribers', JSON.stringify(existingSubscribers));
        }

        setStatus('success');
        setEmail('');
      } catch (err) {
        setStatus('error');
        setErrorMessage('Failed to save. Please try again.');
      }
    }, 1200);
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="text-left p-6 bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30 rounded-lg"
      >
        <div className="flex items-start gap-4">
          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">Subscribed successfully!</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              Thank you for subscribing. We will deliver curated tech updates directly to your inbox.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const isFooter = variant === 'footer';
  const isSidebar = variant === 'sidebar';

  return (
    <div className={className}>
      <div className="space-y-4">
        {!isFooter && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">Weekly Newsletter</h4>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 font-light leading-relaxed">
              Curated tech reviews, custom tutorial guides on Excel & SQL, and AI insights. Unsubscribe any time.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder={isFooter ? "Enter your email for updates..." : "Your email address"}
              disabled={status === 'loading'}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-sm text-xs px-4 py-3.5 pr-12 text-gray-900 dark:text-gray-100 transition-all font-light"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="absolute right-1 top-1 bottom-1 px-3.5 bg-gray-900 dark:bg-gray-100 hover:bg-blue-600 dark:hover:bg-blue-500 text-white dark:text-gray-900 hover:text-white dark:hover:text-white rounded-xs hover:cursor-pointer transition-all flex items-center justify-center cursor-pointer disabled:opacity-50"
              aria-label="Subscribe"
            >
              {status === 'loading' ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <AnimatePresence>
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[10px] text-red-500 mt-2 font-medium"
              >
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
