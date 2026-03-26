import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { 
  Layout, 
  MousePointer2, 
  DollarSign, 
  BarChart3, 
  Layers, 
  Target,
  Zap,
  Mail,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

const PLACEMENTS = [
  {
    id: 'exit-intent',
    name: 'Exit Intent Popup',
    type: 'Lead Gen / PDF',
    location: 'Global (on exit)',
    conversion: 'High',
    status: 'Active',
    icon: Zap,
    color: 'bg-blue-500'
  },
  {
    id: 'sticky-bar',
    name: 'Sticky Subscribe Bar',
    type: 'Newsletter',
    location: 'Global (bottom)',
    conversion: 'Medium',
    status: 'Active',
    icon: Mail,
    color: 'bg-indigo-500'
  },
  {
    id: 'hero-cta',
    name: 'Hero CTA Overlay',
    type: 'Affiliate / Product',
    location: 'Home Page (Hero)',
    conversion: 'High',
    status: 'Active',
    icon: Target,
    color: 'bg-emerald-500'
  },
  {
    id: 'in-article-ad',
    name: 'In-Article Ad Unit',
    type: 'Display Ads',
    location: 'Article Page (Mid)',
    conversion: 'Medium',
    status: 'Active',
    icon: Layout,
    color: 'bg-amber-500'
  },
  {
    id: 'sidebar-sticky',
    name: 'Sidebar Sticky Ad',
    type: 'Display Ads',
    location: 'Article Page (Right)',
    conversion: 'Low',
    status: 'Active',
    icon: Layers,
    color: 'bg-rose-500'
  },
  {
    id: 'affiliate-widget',
    name: 'Affiliate Product Widget',
    type: 'Affiliate',
    location: 'Article Page (Bottom)',
    conversion: 'High',
    status: 'Active',
    icon: ShoppingBag,
    color: 'bg-purple-500'
  }
];

export default function MonetizationMap() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Monetization <span className="text-blue-600">Map</span></h1>
              <p className="text-gray-500 mt-2">Strategic placement of revenue-generating elements across the platform.</p>
            </div>
            <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
              <div className="px-4 py-2 text-center border-r border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Units</p>
                <p className="text-xl font-bold text-gray-900">{PLACEMENTS.length}</p>
              </div>
              <div className="px-4 py-2 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Est. Conversion</p>
                <p className="text-xl font-bold text-green-600">4.2%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Visualization */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold flex items-center">
                    <Layout className="w-5 h-5 mr-2 text-blue-600" />
                    Placement Visualization
                  </h2>
                  <div className="flex space-x-2">
                    <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span> Active
                    </span>
                    <span className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span className="w-2 h-2 bg-amber-500 rounded-full mr-1.5"></span> Pending
                    </span>
                  </div>
                </div>

                {/* Mock Browser UI */}
                <div className="border-2 border-gray-100 rounded-2xl overflow-hidden bg-gray-50 aspect-video relative">
                  <div className="h-8 bg-white border-b border-gray-100 flex items-center px-4 space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  
                  {/* Home Page Mock */}
                  <div className="p-4 space-y-4">
                    <div className="h-4 w-32 bg-gray-200 rounded-full"></div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-7 space-y-3">
                        <div className="h-12 w-full bg-gray-200 rounded-lg relative group cursor-help">
                          <div className="absolute inset-0 border-2 border-dashed border-emerald-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-emerald-50/50">
                            <span className="text-[10px] font-bold text-emerald-600 uppercase">Hero CTA</span>
                          </div>
                        </div>
                        <div className="h-4 w-full bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="col-span-5">
                        <div className="aspect-square bg-gray-200 rounded-lg"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="space-y-2">
                          <div className="aspect-video bg-gray-200 rounded-lg"></div>
                          <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Overlay Markers */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gray-900 rounded-lg border-2 border-dashed border-indigo-500 flex items-center justify-center"
                  >
                    <span className="text-[8px] font-bold text-indigo-400 uppercase">Sticky Bar Placement</span>
                  </motion.div>

                  <div className="absolute inset-0 bg-blue-600/10 border-4 border-dashed border-blue-500 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase shadow-xl">Exit Intent Trigger Area</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Performance Metrics
                </h2>
                <div className="space-y-6">
                  {PLACEMENTS.slice(0, 3).map((p) => (
                    <div key={p.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${p.color} rounded-xl flex items-center justify-center text-white`}>
                          <p.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">12.4k clicks</p>
                        <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest">+{p.conversion} Conv.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar List */}
            <div className="space-y-8">
              <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
                  Revenue Streams
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Display Ads', value: '$1,240', trend: '+12%' },
                    { name: 'Affiliate Sales', value: '$3,850', trend: '+24%' },
                    { name: 'Sponsored Posts', value: '$2,100', trend: '+5%' },
                    { name: 'Newsletter Subs', value: '1,420', trend: '+18%' }
                  ].map((stream) => (
                    <div key={stream.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stream.name}</p>
                        <p className="text-lg font-bold mt-1">{stream.value}</p>
                      </div>
                      <span className="text-xs font-bold text-blue-400">{stream.trend}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6">Placement Details</h3>
                <div className="space-y-4">
                  {PLACEMENTS.map((p) => (
                    <div key={p.id} className="p-4 rounded-2xl border border-gray-50 hover:border-blue-100 transition-colors group">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${p.color} rounded-lg flex items-center justify-center text-white`}>
                            <p.icon className="w-4 h-4" />
                          </div>
                          <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                        </div>
                        <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-full ${
                          p.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                        <span>{p.location}</span>
                        <span className="text-blue-600 group-hover:translate-x-1 transition-transform cursor-pointer flex items-center">
                          Edit <ExternalLink className="w-3 h-3 ml-1" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
