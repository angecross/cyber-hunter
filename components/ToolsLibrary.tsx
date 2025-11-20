import React, { useState } from 'react';
import { Search, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { KALI_CATEGORIES, POPULAR_TOOLS } from '../constants';
import { KaliCategory, Tool } from '../types';

interface ToolsLibraryProps {
  onToolSelect: (tool: Tool) => void;
}

const ToolsLibrary: React.FC<ToolsLibraryProps> = ({ onToolSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<KaliCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
        onToolSelect({ 
            name: searchQuery, 
            category: KaliCategory.OTHER,
            description: "Custom Search",
            popular: false
        });
    }
  };

  const ToolCard = ({ tool }: { tool: Tool }) => (
    <div 
      onClick={() => onToolSelect(tool)}
      className="group relative p-5 bg-[#0a1020] border border-slate-800 hover:border-[#00f3ff] cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)] hover:-translate-y-1 flex flex-col h-48 overflow-hidden rounded-sm"
    >
      {/* Technical Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-600 group-hover:border-[#00f3ff] transition-colors duration-500"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-600 group-hover:border-[#00f3ff] transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-600 group-hover:border-[#00f3ff] transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-600 group-hover:border-[#00f3ff] transition-colors duration-500"></div>

      <div className="flex justify-between items-start mb-3 z-10">
        <h3 className="font-bold text-slate-200 font-mono group-hover:text-[#00f3ff] transition-colors truncate w-full text-lg tracking-tight">{tool.name}</h3>
        {tool.popular && (
             <span className="flex h-2 w-2 relative ml-2 mt-1.5" title="Popular Tool">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f3ff] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f3ff]"></span>
             </span>
        )}
      </div>

      <p className="text-xs text-slate-400 line-clamp-4 flex-grow font-sans leading-relaxed group-hover:text-slate-300 transition-colors">
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
        <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest group-hover:text-[#00f3ff]/70 transition-colors">
          {tool.category.split(' ')[0]}
        </span>
        <div className="flex items-center gap-1 text-[#00f3ff] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <span className="text-[10px] font-bold font-mono">ACCESS</span>
            <ArrowRight size={12} />
        </div>
      </div>
      
      {/* Scanning Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f3ff]/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
    </div>
  );

  const CategoryPill = ({ cat, active }: { cat: string, active: boolean }) => (
    <button
      onClick={() => setSelectedCategory(cat as KaliCategory | 'All')}
      className={`px-4 py-2 rounded-sm text-[10px] font-bold font-mono uppercase tracking-widest whitespace-nowrap transition-all border ${
        active 
          ? 'bg-[#00f3ff]/10 border-[#00f3ff] text-[#00f3ff] shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
          : 'bg-black/30 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
      }`}
    >
      {cat === 'All' ? 'ALL_SECTORS' : cat}
    </button>
  );

  const displayedTools = selectedCategory === 'All' 
    ? POPULAR_TOOLS 
    : POPULAR_TOOLS.filter(t => t.category === selectedCategory);

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
            <h2 className="text-4xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
                ARSENAL <span className="text-sm font-normal text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">v2.4</span>
            </h2>
            <div className="flex items-center gap-2 text-[#00ff9d] text-xs font-mono mt-2">
                <CheckCircle size={12} />
                <span>DATABASE SYNCED: {POPULAR_TOOLS.length} TOOLS</span>
            </div>
            </div>
            <div className="relative w-full md:w-72">
            <input
                type="text"
                placeholder="SEARCH_DATABASE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="w-full bg-black/50 border border-slate-700 rounded-sm py-3 pl-10 pr-4 text-[#00f3ff] text-sm focus:border-[#00f3ff] focus:outline-none font-mono placeholder-slate-600 uppercase transition-colors"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            </div>
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2 mb-4 hide-scrollbar">
            <CategoryPill cat="All" active={selectedCategory === 'All'} />
            {KALI_CATEGORIES.map(cat => (
            <CategoryPill key={cat} cat={cat} active={selectedCategory === cat} />
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 overflow-y-auto pb-20 custom-scrollbar pr-2">
            {displayedTools.map((tool, idx) => (
            <ToolCard key={idx} tool={tool} />
            ))}
            {displayedTools.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-600 border border-dashed border-slate-800 rounded-lg bg-slate-900/20">
                <Search size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-mono text-lg">NO_DATA_FOUND_IN_SECTOR</p>
                <p className="text-xs mt-2">Try adjusting your filters or search query.</p>
            </div>
            )}
        </div>
    </div>
  );
};

export default ToolsLibrary;