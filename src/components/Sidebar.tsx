
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileStack, 
  Settings, 
  Users, 
  Palette, 
  BookOpen,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors",
        active 
          ? "bg-purple-700 text-white" 
          : "text-gray-300 hover:bg-purple-800/50 hover:text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

export function Sidebar() {
  // Get the current path to determine active state
  const pathname = window.location.pathname;
  
  return (
    <div className="h-full w-64 bg-[#1A1F2C] text-white border-r border-gray-800 flex flex-col">
      <div className="p-5 flex items-center gap-2 border-b border-gray-800">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="white" strokeWidth="2" />
        </svg>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">FlowDesign</h1>
      </div>
      
      <div className="mt-6 px-3 flex-1">
        <h3 className="text-xs uppercase text-gray-400 font-medium px-3 mb-3">
          MAIN
        </h3>
        <div className="space-y-1 mt-2 mb-8">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Flow Editor" 
            href="/editor" 
            active={pathname === '/editor'} 
          />
          <SidebarItem 
            icon={FileStack} 
            label="My Diagrams" 
            href="/diagrams" 
            active={pathname === '/diagrams'} 
          />
        </div>

        <h3 className="text-xs uppercase text-gray-400 font-medium px-3 mb-3 mt-6">
          RESOURCES
        </h3>
        <div className="space-y-1 mt-2">
          <SidebarItem 
            icon={Palette} 
            label="Templates" 
            href="/templates" 
            active={pathname === '/templates'} 
          />
          <SidebarItem 
            icon={BookOpen} 
            label="Tutorials" 
            href="/tutorials" 
            active={pathname === '/tutorials'} 
          />
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div>
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-400">Pro Account</div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/settings" 
            active={pathname === '/settings'} 
          />
          <SidebarItem 
            icon={HelpCircle} 
            label="Help" 
            href="/help" 
            active={pathname === '/help'} 
          />
        </div>
      </div>
    </div>
  );
}
