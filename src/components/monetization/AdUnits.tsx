import React from 'react';
import { ShoppingBag, ExternalLink, Zap, Gift } from 'lucide-react';

export function InArticleAd() {
  return (
    <div className="my-12 p-8 bg-gray-50 border border-gray-100 rounded-[2rem] relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-2">
        <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Sponsored</span>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/3 aspect-square bg-gray-200 rounded-2xl overflow-hidden">
          <img 
            src="https://picsum.photos/seed/gadget/400/400" 
            alt="Ad" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-4">
          <h4 className="text-xl font-bold text-gray-900">The Ultimate Developer Setup 2026</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            Upgrade your productivity with our curated list of the best mechanical keyboards and ergonomic chairs.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center">
            Shop the Collection <ExternalLink className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="bg-gray-900 rounded-[2rem] p-8 text-white space-y-6 sticky top-32">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
        <Zap className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold leading-tight">Master AI in 30 Days</h3>
      <p className="text-gray-400 text-sm">
        Join our premium bootcamp and learn how to build agentic AI systems from scratch.
      </p>
      <ul className="space-y-3">
        {['Live Sessions', 'Hands-on Projects', 'Job Placement'].map(item => (
          <li key={item} className="flex items-center text-xs text-gray-300">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
            {item}
          </li>
        ))}
      </ul>
      <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
        Enroll Now
      </button>
    </div>
  );
}

export function AffiliateWidget() {
  return (
    <div className="mt-20 pt-20 border-t border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Recommended Gear</h3>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Affiliate Disclosure</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: 'Ultra-Wide Monitor', price: '$499', icon: ShoppingBag },
          { name: 'Mechanical Keyboard', price: '$159', icon: Gift },
          { name: 'Noise-Cancelling Mic', price: '$129', icon: Zap }
        ].map((item, i) => (
          <div key={i} className="group p-6 bg-white border border-gray-50 rounded-[2rem] hover:border-blue-100 transition-all cursor-pointer">
            <div className="w-full aspect-square bg-gray-50 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <item.icon className="w-10 h-10 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-bold">{item.price}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">View on Amazon</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
