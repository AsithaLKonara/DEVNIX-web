'use client';

import { useState } from 'react';
import { Folder, FileText, Image as ImageIcon, FileArchive, Search, Plus, MoreVertical, UploadCloud, Grid, List as ListIcon, HardDrive } from 'lucide-react';

const files = [
  { id: '1', name: 'Brand_Guidelines.pdf', type: 'pdf', size: '2.4 MB', modified: 'Oct 15, 2026', owner: 'Alice C.' },
  { id: '2', name: 'Homepage_Hero.png', type: 'image', size: '1.8 MB', modified: 'Oct 14, 2026', owner: 'Charlie D.' },
  { id: '3', name: 'Q4_Financial_Report.xlsx', type: 'document', size: '850 KB', modified: 'Oct 10, 2026', owner: 'Diana P.' },
  { id: '4', name: 'Client_Assets.zip', type: 'archive', size: '14.5 MB', modified: 'Sep 28, 2026', owner: 'Bob S.' },
  { id: '5', name: 'Project_Proposal_Draft.docx', type: 'document', size: '1.2 MB', modified: 'Sep 25, 2026', owner: 'Alice C.' },
];

const folders = [
  { id: 'f1', name: 'Design Assets', items: 24, size: '256 MB', color: 'bg-pink-500' },
  { id: 'f2', name: 'Client Contracts', items: 12, size: '15 MB', color: 'bg-blue-500' },
  { id: 'f3', name: 'Marketing Materials', items: 8, size: '45 MB', color: 'bg-amber-500' },
  { id: 'f4', name: 'Financials 2026', items: 5, size: '8 MB', color: 'bg-emerald-500' },
];

export default function FileManagementPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'image': return <ImageIcon size={24} className="text-blue-400" />;
      case 'archive': return <FileArchive size={24} className="text-amber-400" />;
      case 'pdf': return <FileText size={24} className="text-rose-400" />;
      default: return <FileText size={24} className="text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Files</h1>
          <p className="text-gray-400 text-sm mt-1">Manage documents, assets, and project files.</p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-[#1a1a2e] border border-[#2d2d4e] rounded-lg px-3 py-2 w-full sm:w-64 focus-within:border-[#6366f1] transition-colors">
            <Search size={16} className="text-gray-500" />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="bg-transparent border-none outline-none text-sm text-white w-full"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shrink-0">
            <UploadCloud size={16} />
            <span className="hidden sm:inline">Upload</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Sidebar - Storage */}
        <div className="w-64 hidden lg:flex flex-col gap-6 shrink-0">
          <div className="bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl p-5">
            <h3 className="font-semibold text-white mb-4">Storage Details</h3>
            
            <div className="flex items-center justify-center mb-6 relative">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-[#0f0f1a]" />
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351.85" strokeDashoffset="105.55" className="text-[#6366f1]" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">70%</span>
                <span className="text-xs text-gray-400">Used</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Images</span>
                  <span className="text-white font-medium">45 GB</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-1.5"><div className="bg-blue-400 h-1.5 rounded-full w-[45%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Documents</span>
                  <span className="text-white font-medium">12 GB</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-1.5"><div className="bg-emerald-400 h-1.5 rounded-full w-[12%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">Archives</span>
                  <span className="text-white font-medium">8 GB</span>
                </div>
                <div className="w-full bg-[#0f0f1a] rounded-full h-1.5"><div className="bg-amber-400 h-1.5 rounded-full w-[8%]"></div></div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-[#2d2d4e] flex items-center justify-between text-sm">
              <span className="text-gray-400">Total Capacity</span>
              <span className="text-white font-bold">100 GB</span>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a1a2e] hover:bg-[#2d2d4e] border border-[#2d2d4e] rounded-xl text-sm font-medium text-gray-300 transition-colors">
            <Plus size={16} />
            New Folder
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1a1a2e] border border-[#2d2d4e] rounded-xl overflow-hidden">
          <div className="p-4 border-b border-[#2d2d4e] flex justify-between items-center bg-[#1a1a2e]">
            <div className="flex gap-4 text-sm">
              <button className="text-white font-medium border-b-2 border-[#6366f1] pb-1">My Files</button>
              <button className="text-gray-400 hover:text-white transition-colors pb-1">Shared</button>
              <button className="text-gray-400 hover:text-white transition-colors pb-1">Recent</button>
            </div>
            
            <div className="flex gap-1 bg-[#0f0f1a] p-1 rounded-lg border border-[#2d2d4e]">
              <button 
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-[#2d2d4e] text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setView('list')}
                className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-[#2d2d4e] text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <ListIcon size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Folders</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {folders.map((folder) => (
                  <div key={folder.id} className="bg-[#0f0f1a] border border-[#2d2d4e] rounded-xl p-4 hover:border-[#6366f1]/50 cursor-pointer transition-all group">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`w-10 h-10 rounded-lg ${folder.color}/10 flex items-center justify-center`}>
                        <Folder size={20} className={folder.color.replace('bg-', 'text-')} />
                      </div>
                      <button className="text-gray-600 opacity-0 group-hover:opacity-100 hover:text-white transition-all">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <h4 className="font-semibold text-white mb-1 truncate">{folder.name}</h4>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{folder.items} items</span>
                      <span>{folder.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Recent Files</h3>
              
              {view === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {files.map((file) => (
                    <div key={file.id} className="bg-[#0f0f1a] border border-[#2d2d4e] rounded-xl p-4 hover:border-[#6366f1]/50 cursor-pointer transition-all group flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-[#1a1a2e] border border-[#2d2d4e] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        {getFileIcon(file.type)}
                      </div>
                      <h4 className="text-sm font-medium text-white mb-1 w-full truncate px-2">{file.name}</h4>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border border-[#2d2d4e] rounded-xl overflow-x-auto bg-[#0f0f1a]">
                  <table className="w-full text-left text-sm text-gray-300">
                    <thead className="bg-[#1a1a2e] text-gray-400 border-b border-[#2d2d4e]">
                      <tr>
                        <th className="p-4 font-medium w-1/2">Name</th>
                        <th className="p-4 font-medium">Owner</th>
                        <th className="p-4 font-medium">Modified</th>
                        <th className="p-4 font-medium">Size</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {files.map((file) => (
                        <tr key={file.id} className="border-b border-[#2d2d4e]/50 hover:bg-[#2d2d4e]/50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <span className="font-medium text-white">{file.name}</span>
                          </td>
                          <td className="p-4">{file.owner}</td>
                          <td className="p-4 text-gray-400">{file.modified}</td>
                          <td className="p-4 text-gray-400">{file.size}</td>
                          <td className="p-4 text-right">
                            <button className="text-gray-500 hover:text-white transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
