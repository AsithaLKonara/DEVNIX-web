'use client';

import { useState } from 'react';
import { Plus, MoreVertical, Filter, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [view, setView] = useState<'list' | 'grid'>('grid');

  const projects = [
    { id: 1, name: 'E-Commerce Redesign', client: 'Acme Corp', status: 'IN_PROGRESS', progress: 65, team: 4, due: 'Oct 15, 2026' },
    { id: 2, name: 'Mobile App Launch', client: 'TechFlow', status: 'PLANNING', progress: 15, team: 6, due: 'Dec 01, 2026' },
    { id: 3, name: 'CRM Integration', client: 'Global Retail', status: 'COMPLETED', progress: 100, team: 3, due: 'Aug 20, 2026' },
    { id: 4, name: 'Brand Identity', client: 'Stark Industries', status: 'ON_HOLD', progress: 40, team: 2, due: 'TBD' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">Manage and track your agency's client projects.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-[#1a1a2e] hover:bg-[#2d2d4e] border border-[#2d2d4e] text-white px-3 py-2 rounded-lg text-sm transition-colors">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden hover:border-[#6366f1]/50 transition-all group">
            <div className="p-5 border-b border-[#2d2d4e]">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  project.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400' :
                  project.status === 'IN_PROGRESS' ? 'bg-[#6366f1]/10 text-[#818cf8]' :
                  project.status === 'PLANNING' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-amber-500/10 text-amber-400'
                }`}>
                  {project.status.replace('_', ' ')}
                </span>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
              <p className="text-sm text-gray-400">{project.client}</p>
            </div>
            
            <div className="p-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-[#0f0f1a] rounded-full h-2 mb-6">
                <div 
                  className={`h-2 rounded-full ${project.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]'}`} 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(project.team, 3))].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1a2e] bg-[#2d2d4e] flex items-center justify-center text-xs font-medium text-white">
                      U{i+1}
                    </div>
                  ))}
                  {project.team > 3 && (
                    <div className="w-8 h-8 rounded-full border-2 border-[#1a1a2e] bg-[#0f0f1a] flex items-center justify-center text-xs font-medium text-gray-400">
                      +{project.team - 3}
                    </div>
                  )}
                </div>
                
                <Link 
                  href={`/dashboard/projects/${project.id}`}
                  className="flex items-center gap-1 text-[#818cf8] text-sm font-medium hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                >
                  View Board <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
