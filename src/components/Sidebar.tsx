
import React from 'react';
import { Bot, Zap, GitBranch, Library, BarChart3, HelpCircle, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigationItems = [
    { id: 'loona', label: 'Loona', icon: Bot },
    { id: 'quick-actions', label: 'Quick actions', icon: Zap },
    { id: 'workflows', label: 'Workflows', icon: GitBranch },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const bottomItems = [
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const NavItem = ({ item, isActive, onClick }: { item: any; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
        isActive 
          ? 'bg-gray-100 text-gray-900 font-medium' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <item.icon size={20} />
      <span className="text-sm">{item.label}</span>
    </button>
  );

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <img 
          src="/lovable-uploads/0a088246-be19-4c62-bd51-4574d34f6b9c.png" 
          alt="Loonar" 
          className="h-8 w-auto"
        />
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-1">
        {navigationItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>

      {/* Bottom items */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        {bottomItems.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
