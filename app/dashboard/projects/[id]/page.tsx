'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock Kanban Data
const initialColumns = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 't1', title: 'Setup database schema', priority: 'High', comments: 3, attachments: 1, dueDate: 'Oct 10' },
      { id: 't2', title: 'Design landing page', priority: 'Medium', comments: 0, attachments: 2, dueDate: 'Oct 12' },
    ]
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [
      { id: 't3', title: 'Implement JWT authentication', priority: 'High', comments: 5, attachments: 0, dueDate: 'Oct 11' },
    ]
  },
  {
    id: 'review',
    title: 'In Review',
    tasks: [
      { id: 't4', title: 'Create project dashboard UI', priority: 'Medium', comments: 2, attachments: 1, dueDate: 'Oct 09' },
      { id: 't5', title: 'Configure CI/CD pipeline', priority: 'High', comments: 1, attachments: 0, dueDate: 'Oct 08' },
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: 't6', title: 'Project kick-off meeting', priority: 'Low', comments: 0, attachments: 4, dueDate: 'Oct 01' },
    ]
  }
];

export default function KanbanBoardPage({ params }: { params: { id: string } }) {
  const [columns] = useState(initialColumns);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects" className="text-gray-400 hover:text-white transition-colors text-sm">
            ← Back to Projects
          </Link>
          <div className="h-4 w-px bg-[#2d2d4e]"></div>
          <h1 className="text-2xl font-bold text-white tracking-tight">E-Commerce Redesign</h1>
          <span className="bg-[#6366f1]/10 text-[#818cf8] px-2.5 py-1 rounded-full text-xs font-medium border border-[#6366f1]/20">
            Active
          </span>
        </div>
        
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0f0f1a] bg-[#2d2d4e] flex items-center justify-center text-xs font-medium text-white z-10 hover:z-20 transform hover:scale-110 transition-all cursor-pointer">
              U{i}
            </div>
          ))}
          <button className="w-8 h-8 rounded-full border-2 border-[#0f0f1a] bg-[#1a1a2e] border-dashed flex items-center justify-center text-gray-400 hover:text-white hover:border-[#6366f1] z-10 transition-colors">
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto flex gap-6 pb-4">
        {columns.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-80 flex flex-col bg-[#1a1a2e]/50 border border-[#2d2d4e] rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-[#2d2d4e] bg-[#1a1a2e]">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{col.title}</h3>
                <span className="bg-[#2d2d4e] text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
                  {col.tasks.length}
                </span>
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            <div className="flex-1 p-3 overflow-y-auto space-y-3">
              {col.tasks.map((task) => (
                <div key={task.id} className="bg-[#0f0f1a] border border-[#2d2d4e] p-4 rounded-lg hover:border-[#6366f1]/50 cursor-grab active:cursor-grabbing transition-colors group shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                      task.priority === 'High' ? 'bg-rose-500/10 text-rose-400' :
                      task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-blue-500/10 text-blue-400'
                    }`}>
                      {task.priority}
                    </span>
                    <button className="text-gray-600 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                  
                  <p className="text-sm font-medium text-white mb-4 leading-snug">{task.title}</p>
                  
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <div className="flex items-center gap-3">
                      {task.comments > 0 && (
                        <div className="flex items-center gap-1 hover:text-white transition-colors">
                          <MessageSquare size={12} />
                          <span>{task.comments}</span>
                        </div>
                      )}
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-1 hover:text-white transition-colors">
                          <Paperclip size={12} />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                    </div>
                    <div className={`flex items-center gap-1 ${task.dueDate === 'Oct 08' ? 'text-rose-400' : ''}`}>
                      <Clock size={12} />
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#2d2d4e]/50 rounded-lg transition-colors border border-dashed border-transparent hover:border-[#6366f1]/50">
                <Plus size={16} />
                Add Task
              </button>
            </div>
          </div>
        ))}
        
        {/* Add new column button */}
        <div className="flex-shrink-0 w-80">
          <button className="w-full h-14 flex items-center justify-center gap-2 text-sm font-medium text-gray-400 hover:text-white bg-[#1a1a2e]/30 hover:bg-[#1a1a2e] border border-dashed border-[#2d2d4e] hover:border-[#6366f1]/50 rounded-xl transition-all">
            <Plus size={16} />
            Add Column
          </button>
        </div>
      </div>
    </div>
  );
}
