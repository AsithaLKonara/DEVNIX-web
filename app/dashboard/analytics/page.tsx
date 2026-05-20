'use client';

import { useState } from 'react';
import { Download, Calendar, BarChart3, Activity, Users, MousePointer2 } from 'lucide-react';

export default function AnalyticsDashboardPage() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Platform Analytics</h1>
          <p className="text-gray-400 text-sm mt-1">Monitor usage, traffic, and performance metrics.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg px-3 py-2 cursor-pointer hover:bg-[#2d2d4e] transition-colors">
            <Calendar size={16} className="text-gray-400" />
            <select 
              className="bg-transparent border-none outline-none text-sm text-white cursor-pointer"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>Year to Date</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500 group-hover:opacity-20 transition-opacity"><Users size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Total Users</p>
          <p className="text-3xl font-bold text-white mt-2">12,450</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+12.5%</span>
            <span className="text-gray-500">vs previous period</span>
          </div>
        </div>
        
        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-500 group-hover:opacity-20 transition-opacity"><Activity size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Active Sessions</p>
          <p className="text-3xl font-bold text-white mt-2">3,205</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+8.2%</span>
            <span className="text-gray-500">vs previous period</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-500 group-hover:opacity-20 transition-opacity"><MousePointer2 size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Click Rate</p>
          <p className="text-3xl font-bold text-white mt-2">4.8%</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-rose-400 font-medium">-1.4%</span>
            <span className="text-gray-500">vs previous period</span>
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 relative overflow-hidden group hover:border-[#6366f1]/50 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-500 group-hover:opacity-20 transition-opacity"><BarChart3 size={64} /></div>
          <p className="text-sm font-medium text-gray-400">Conversion</p>
          <p className="text-3xl font-bold text-white mt-2">2.4%</p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-emerald-400 font-medium">+0.6%</span>
            <span className="text-gray-500">vs previous period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl flex flex-col">
          <div className="p-5 border-b border-[#2d2d4e] flex justify-between items-center">
            <h3 className="font-semibold text-white">Traffic Overview</h3>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#6366f1]"></div> Current</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2d2d4e]"></div> Previous</span>
            </div>
          </div>
          
          <div className="flex-1 p-5 flex items-end gap-2 h-72">
            {/* CSS Bar Chart Simulation */}
            {[45, 60, 35, 80, 55, 90, 75, 40, 65, 85, 70, 95, 50, 75].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end gap-1 group h-full relative">
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0f0f1a] border border-[#2d2d4e] text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
                  {val * 100} visits
                </div>
                
                <div 
                  className="w-full bg-[#6366f1]/20 group-hover:bg-[#6366f1]/40 rounded-t-sm transition-colors"
                  style={{ height: `${val}%` }}
                >
                  <div 
                    className="w-full bg-[#6366f1] rounded-t-sm opacity-90 group-hover:opacity-100 transition-colors"
                    style={{ height: `${val * 0.8}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-500 text-center block mt-2">{(i * 2) + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Traffic Sources</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Direct</span>
                  <span className="text-white font-medium">45%</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-2">
                  <div className="bg-[#6366f1] h-2 rounded-full w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Organic Search</span>
                  <span className="text-white font-medium">28%</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-2">
                  <div className="bg-emerald-400 h-2 rounded-full w-[28%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Social Media</span>
                  <span className="text-white font-medium">18%</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full w-[18%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Referral</span>
                  <span className="text-white font-medium">9%</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full w-[9%]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-6">
            <h3 className="font-semibold text-white mb-4">Top Pages</h3>
            <div className="space-y-3">
              {[
                { path: '/home', views: '24.5k' },
                { path: '/pricing', views: '12.2k' },
                { path: '/features', views: '8.4k' },
                { path: '/contact', views: '3.1k' },
              ].map((page, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-[#2d2d4e]/50 transition-colors cursor-pointer">
                  <span className="text-sm text-gray-300">{page.path}</span>
                  <span className="text-sm text-white font-medium">{page.views}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
