import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, LogOut } from "lucide-react";
import { menus } from "@/components/college-portal/config/menus";
import { DashboardRouter } from "@/components/college-portal/pages/DashboardRouter";
import { roleLabels, StoreProvider, useStore } from "@/components/college-portal/store/StoreContext";
import type { Role } from "@/components/college-portal/data/types";

export const Route = createFileRoute("/_app/college")({
  head: () => ({
    meta: [
      { title: "College Management Portal — Edusphere" },
      { name: "description", content: "Role-based college operations, academics, faculty, resources, and institutional workflows." },
      { property: "og:title", content: "College Management Portal — Edusphere" },
      { property: "og:description", content: "Role-based college operations and academic management workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <StoreProvider><CollegePortal /></StoreProvider>,
});

function CollegePortal() {
  const { data, currentUser, login, logout } = useStore();
  const roles = Object.keys(roleLabels) as Role[];
  const [selectedRole, setSelectedRole] = useState<Role>(currentUser?.role ?? "principal");
  const [activeMenu, setActiveMenu] = useState("");
  const accounts = data.staff.filter((staff) => staff.role === selectedRole);
  const menuItems = menus[selectedRole] ?? [];
  const visibleMenu = menuItems.some((item) => item.id === activeMenu) ? activeMenu : menuItems[0]?.id ?? "";

  const changeRole = (role: Role) => {
    setSelectedRole(role);
    setActiveMenu("");
    const nextAccount = data.staff.find((staff) => staff.role === role);
    if (nextAccount) login(nextAccount.id);
    else logout();
  };

  return (
    <div className="college-portal min-h-[calc(100vh-8rem)] overflow-hidden rounded-xl border border-border bg-background text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><GraduationCap className="size-5" /></div>
          <div><h1 className="text-lg font-semibold">College Management</h1><p className="text-xs text-muted-foreground">Role-based institutional workspace</p></div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="college-role">Switch role</label>
          <select id="college-role" value={selectedRole} onChange={(event) => changeRole(event.target.value as Role)} className="h-9 rounded-md border border-border bg-background px-3 text-sm">
            {roles.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}
          </select>
          <label className="sr-only" htmlFor="college-account">Switch account</label>
          <select id="college-account" value={currentUser?.role === selectedRole ? currentUser.id : ""} onChange={(event) => event.target.value ? login(event.target.value) : undefined} className="h-9 max-w-56 rounded-md border border-border bg-background px-3 text-sm">
            {accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
          </select>
          {currentUser && <button type="button" onClick={() => { logout(); setActiveMenu(""); }} className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm hover:bg-muted"><LogOut className="size-4" /><span className="hidden sm:inline">Sign out</span></button>}
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-13rem)] md:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="border-b border-border bg-card p-3 md:border-b-0 md:border-r">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{roleLabels[selectedRole]} workspace</p>
          <nav className="flex gap-1 overflow-x-auto md:flex-col">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setActiveMenu(id)} className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors md:w-full ${visibleMenu === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <Icon className="size-4 shrink-0" /><span>{label}</span>
              </button>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 p-4 sm:p-6">
          {currentUser ? <DashboardRouter activeMenu={visibleMenu} onNavigate={setActiveMenu} /> : (
            <div className="grid min-h-64 place-items-center rounded-xl border border-dashed border-border bg-card p-8 text-center">
              <div><GraduationCap className="mx-auto size-10 text-primary" /><h2 className="mt-3 text-lg font-semibold">No account available</h2><p className="mt-1 text-sm text-muted-foreground">There are no seeded accounts for this role.</p></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}