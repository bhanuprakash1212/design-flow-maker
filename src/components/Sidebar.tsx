
import { cn } from "@/lib/utils";
import { LayoutDashboard, Images } from "lucide-react";
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
        "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
        active 
          ? "text-white bg-sidebar-accent" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
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
      <div className="p-4 flex items-center gap-2 border-b border-gray-800">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="white" strokeWidth="2" />
        </svg>
        <h1 className="text-xl font-bold">FlowDesign</h1>
      </div>
      
      <div className="mt-6 px-3">
        <h3 className="text-xs uppercase text-sidebar-foreground/60 font-medium px-3 mb-2">
          MAIN MENU
        </h3>
        <div className="space-y-1 mt-2">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Flow Editor" 
            href="/editor" 
            active={pathname === '/editor'} 
          />
          <SidebarItem 
            icon={Images} 
            label="My Diagrams" 
            href="/diagrams" 
            active={pathname === '/diagrams'} 
          />
        </div>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="text-xs text-sidebar-foreground/60">User: John Doe</div>
      </div>
    </div>
  );
}
