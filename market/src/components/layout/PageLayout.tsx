
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function PageLayout({ children, title }: PageLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex relative">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] z-10">
          <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
        </div>
        
        <main 
          className={`flex-1 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300 ${
            isSidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <div className="container max-w-full p-4 lg:p-6 animate-fade-in">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
