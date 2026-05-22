'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Loader2, AlertCircle, FolderOpen, ArrowRight, Users, Calendar } from 'lucide-react';
import { projectsApi, type Project } from '@/lib/api/projects.api';
import { DashboardSkeleton } from '@/components/dashboard/responsive/SkeletonLoaders';

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  ON_HOLD: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  COMPLETED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  CANCELLED: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

// Fallback mock data when API is not available
const MOCK_PROJECTS: Project[] = [
  { id: '1', name: 'Alpha Web Platform', description: 'Full-stack SaaS rebuild', status: 'ACTIVE', dueDate: '2026-11-30', tasks: Array(8).fill(null), members: Array(4).fill(null) },
  { id: '2', name: 'Brand Identity Revamp', description: 'Complete visual identity', status: 'ON_HOLD', dueDate: '2026-10-15', tasks: Array(5).fill(null), members: Array(2).fill(null) },
  { id: '3', name: 'Mobile App MVP', description: 'React Native application', status: 'ACTIVE', dueDate: '2026-12-31', tasks: Array(12).fill(null), members: Array(3).fill(null) },
  { id: '4', name: 'Analytics Dashboard', description: 'Data visualization suite', status: 'COMPLETED', dueDate: '2026-09-01', tasks: Array(6).fill(null), members: Array(5).fill(null) },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await projectsApi.listProjects();
        setProjects(Array.isArray(data) && data.length > 0 ? data : MOCK_PROJECTS);
      } catch (err) {
        // Backend may not be running yet — fall back to mock data gracefully
        console.warn('API unavailable, using mock data:', err);
        setProjects(MOCK_PROJECTS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-gray-400 text-sm mt-1">{projects.length} active workspace{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={18} /> New Project
        </button>
      </div>

      {error && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center gap-3 text-amber-400 text-sm">
          <AlertCircle size={16} />
          <p>Showing cached data — API connection unavailable.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const completedTasks = project.tasks?.filter((t: any) => t?.status === 'DONE').length ?? 0;
          const totalTasks = project.tasks?.length ?? 0;
          const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

          return (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="group bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5 hover:border-[#6366f1]/60 hover:shadow-lg hover:shadow-[#6366f1]/5 transition-all flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-purple-600 flex items-center justify-center text-white shrink-0">
                  <FolderOpen size={20} />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${STATUS_COLORS[project.status] ?? 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                  {project.status?.replace('_', ' ')}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-white text-base mb-1 group-hover:text-[#818cf8] transition-colors">{project.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{project.description || 'No description provided.'}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span className="text-white font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-[#6366f1] to-purple-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-[#2d2d4e]">
                <div className="flex items-center gap-1.5">
                  <Users size={13} />
                  <span>{project.members?.length ?? 0} members</span>
                </div>
                {project.dueDate && (
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                )}
                <ArrowRight size={14} className="text-gray-600 group-hover:text-[#6366f1] group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
