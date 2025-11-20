import React, { useState, useEffect } from 'react';
import { Menu, Power, Cpu, Database, Globe, Shield } from 'lucide-react';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  const [sysStats, setSysStats] = useState({ cpu: 12, mem: 45, net: 'CONNECTED' });

  useEffect(() => {
    const interval = setInterval(() => {
      setSysStats({
        cpu: Math.floor(Math.random() * 30) + 10,
        mem: Math.floor(Math.random() * 10) + 40,
        net: Math.random() > 0.95 ? 'SCANNING...' : 'CONNECTED'
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800 bg-[#020617]/90 backdrop-blur z-40 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-4 lg:hidden">
        <button onClick={() => setSidebarOpen(true)} className="text-slate-200">
          <Menu size={24} />
        </button>
        <span className="font-bold font-mono text-[#00f3ff]">CYBER-HUNTER</span>
      </div>

      {/* Desktop Header Content */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Power size={14} className="text-green-500" />
          SYSTEM_READY
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-cyan-500/70 border-l border-cyan-900/30 pl-6">
          <div className="flex items-center gap-2">
            <Cpu size={14} />
            <span>CPU: {sysStats.cpu}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Database size={14} />
            <span>MEM: {sysStats.mem}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} />
            <span className={sysStats.net === 'CONNECTED' ? 'text-green-500' : 'text-yellow-500 animate-pulse'}>
              {sysStats.net}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-white font-mono">OPERATOR</div>
            <div className="text-[10px] text-[#00f3ff] font-mono">ID: #882-ALPHA</div>
          </div>
          <div className="w-8 h-8 bg-[#00f3ff]/20 border border-[#00f3ff] rounded-sm flex items-center justify-center text-[#00f3ff]">
            <Shield size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;