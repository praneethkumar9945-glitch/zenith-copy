import type { ReactNode } from "react";
import { ChevronRight, Landmark } from "lucide-react";
import type { Role } from "@/components/governance/data";
import { ROLES } from "@/components/governance/data";
import { useApp } from "@/components/governance/context";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  category?: string;
}

interface LayoutProps {
  role: Role;
  navItems: NavItem[];
  activeModule: string;
  onModuleChange: (id: string) => void;
  children: ReactNode;
}

export default function Layout({ role, navItems, activeModule, onModuleChange, children }: LayoutProps) {
  const { setRole } = useApp();
  const roleInfo = ROLES.find((item) => item.id === role);
  const activeNav = navItems.find((item) => item.id === activeModule);

  if (!roleInfo) return null;

  return (
    <div className="governance-workspace overflow-hidden rounded-lg border border-border bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-soft">
            <Landmark className="size-5" />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold">Governing Body & Executive Management</h1>
            <p className="truncate text-xs text-muted-foreground">{activeNav?.label ?? "Institution overview"}</p>
          </div>
        </div>
        <div className="w-full sm:w-64">
          <Select value={role} onValueChange={(value) => setRole(value as Role)}>
            <SelectTrigger aria-label="Switch governance role" className="bg-background">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((item) => <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-13rem)] lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-card p-3 lg:border-b-0 lg:border-r">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{roleInfo.title}</p>
          <nav className="flex gap-1 overflow-x-auto lg:flex-col">
            {navItems.map((item) => {
              const active = item.id === activeModule;
              return (
                <Button
                  key={item.id}
                  type="button"
                  variant={active ? "default" : "ghost"}
                  onClick={() => onModuleChange(item.id)}
                  className={cn("h-auto min-h-10 shrink-0 justify-start px-3 py-2.5 text-left lg:w-full", !active && "text-muted-foreground")}
                >
                  <span className="size-4 shrink-0">{item.icon}</span>
                  <span className="min-w-0 flex-1 whitespace-normal leading-snug">{item.label}</span>
                  {active && <ChevronRight className="ml-auto hidden size-3.5 lg:block" />}
                </Button>
              );
            })}
          </nav>
        </aside>
        <main className="min-w-0 overflow-x-hidden p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
