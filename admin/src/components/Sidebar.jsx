import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PenTool, LogOut, Hexagon } from 'lucide-react';

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kormyx_admin_token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-white/10 flex flex-col">
        <div className="p-8 border-b border-white/10 flex items-center gap-3">
          <Hexagon className="w-8 h-8 opacity-80" />
          <h2 className="text-xl font-bold tracking-widest">KORMYX</h2>
        </div>

        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          <NavLink 
            to="/" 
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${isActive ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard size={18} />
            <span className="font-medium text-sm tracking-wider uppercase">Dashboard</span>
          </NavLink>
          
          <NavLink 
            to="/blog-manager" 
            className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${isActive ? 'bg-white text-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <PenTool size={18} />
            <span className="font-medium text-sm tracking-wider uppercase">Blog CMS</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 transition-colors rounded-sm"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm tracking-wider uppercase">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
