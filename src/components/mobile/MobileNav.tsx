
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Module = {
  name: string;
  icon: LucideIcon;
};

const MobileNav = ({
  tab,
  setTab,
  modules,
}: {
  tab: number;
  setTab: (n: number) => void;
  modules: { name: string; icon: LucideIcon; }[];
}) => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-2xl">
      <div className="flex justify-around py-2 px-2 max-w-xl mx-auto">
        {modules.map((m, i) => {
          const active = i === tab;
          return (
            <button
              key={m.name}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-xl transition-all duration-200 group relative min-w-0",
                active 
                  ? "text-brand-orange bg-brand-orange/10 shadow-lg" 
                  : "text-brand-gray hover:text-brand-medium-blue hover:bg-slate-50"
              )}
              onClick={() => setTab(i)}
              aria-label={m.name}
            >
              {active && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-brand-orange rounded-full"></div>
              )}
              <m.icon 
                size={20} 
                className={cn(
                  "mb-1 transition-all duration-200 flex-shrink-0", 
                  active ? "scale-110 drop-shadow-sm" : "group-hover:scale-105"
                )} 
              />
              <span className={cn(
                "text-responsive-xs font-medium tracking-tight transition-all duration-200 text-center text-overflow-safe max-w-full", 
                active ? "font-bold text-brand-orange" : "text-brand-gray group-hover:text-brand-medium-blue"
              )}>
                {m.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
