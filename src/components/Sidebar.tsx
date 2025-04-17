
import { cn } from "@/lib/utils";
import { 
  CreditCard, 
  LayoutDashboard, 
  PiggyBank, 
  DollarSign, 
  LineChart, 
  RefreshCcw, 
  Shield, 
  HelpCircle, 
  Settings 
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

const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xs uppercase text-sidebar-foreground/60 font-medium px-3 mb-2">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export function Sidebar() {
  return (
    <div className="h-full w-64 bg-[#1A1F2C] text-white border-r border-gray-800 flex flex-col">
      <div className="p-4 flex items-center gap-2 border-b border-gray-800">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 5.5L9 2L15 5.5L21 2V18.5L15 22L9 18.5L3 22V5.5Z" stroke="white" strokeWidth="2" />
        </svg>
        <h1 className="text-xl font-bold">Finix</h1>
      </div>
      
      <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
        CORE BANKING
      </div>

      <div className="space-y-1 px-3">
        <SidebarItem icon={LayoutDashboard} label="Flow Designer" href="/editor" active />
        <SidebarItem icon={CreditCard} label="My Diagrams" href="/diagrams" />
        <SidebarItem icon={RefreshCcw} label="Payment/Transfer" href="/payments" />
      </div>

      <SidebarSection title="FINANCIAL MANAGEMENT">
        <SidebarItem icon={LineChart} label="Budget Tracking" href="/budget" />
        <SidebarItem icon={PiggyBank} label="Savings Goals" href="/savings" />
        <SidebarItem icon={DollarSign} label="Multi-Currency Settings" href="/currency" />
      </SidebarSection>

      <SidebarSection title="ADVANCED FEATURES">
        <SidebarItem icon={CreditCard} label="Credit Services" href="/credit" />
        <SidebarItem icon={Settings} label="Premium Features" href="/premium" />
        <SidebarItem icon={Shield} label="Security Settings" href="/security" />
        <SidebarItem icon={HelpCircle} label="Customer Support" href="/support" />
      </SidebarSection>
      
      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="text-xs text-sidebar-foreground/60">User: John Doe</div>
      </div>
    </div>
  );
}
