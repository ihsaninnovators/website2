import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { LayoutDashboard, Users, Clock, Images, BarChart3, Building2, Settings, Inbox, LogOut, ExternalLink } from "lucide-react";

const ALLOWED_ADMIN_EMAIL = "aayanjafri73@gmail.com";

const NAV = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Team Roster", path: "/admin/team", icon: Users },
  { label: "Timeline", path: "/admin/timeline", icon: Clock },
  { label: "Gallery", path: "/admin/gallery", icon: Images },
  { label: "Statistics", path: "/admin/stats", icon: BarChart3 },
  { label: "Sponsors", path: "/admin/sponsors", icon: Building2 },
  { label: "Submissions", path: "/admin/submissions", icon: Inbox },
  { label: "Site Settings", path: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    base44.auth.isAuthenticated().then((authed) => {
      if (!authed) { navigate("/login"); return; }
      base44.auth.me().then((u) => {
        if (u && u.email !== ALLOWED_ADMIN_EMAIL) {
          navigate("/", { replace: true });
          return;
        }
        setUser(u);
      }).catch(() => {}).finally(() => setChecked(true));
    });
  }, [navigate]);

  const logout = async () => {
    await base44.auth.logout();
    window.location.href = "/login";
  };

  if (!checked) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-background">
        <div className="mono-tag animate-pulse">[AUTHENTICATING...]</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid place-items-center w-8 h-8 border border-foreground font-mono text-xs font-bold">ii</span>
            <div className="leading-none">
              <span className="text-sm font-bold tracking-tight block">ADMIN PANEL</span>
              <span className="mono-tag mt-1 block">#30695</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path);
            return (
              <Link key={n.path} to={n.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors border-l-2 ${active ? "border-primary text-primary bg-secondary" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                <Icon size={16} /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-border space-y-3">
          <Link to="/" target="_blank" className="flex items-center gap-2 mono-tag hover:text-primary transition-colors">
            <ExternalLink size={14} /> VIEW_SITE
          </Link>
          <button onClick={logout} className="flex items-center gap-2 mono-tag hover:text-primary transition-colors">
            <LogOut size={14} /> LOGOUT
          </button>
          {user && <p className="mono-tag text-muted-foreground truncate">{user.email}</p>}
        </div>
      </aside>

      {/* mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 bg-background border-b border-border h-14 flex items-center justify-between px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="grid place-items-center w-7 h-7 border border-foreground font-mono text-[10px] font-bold">ii</span>
          <span className="text-xs font-bold">ADMIN</span>
        </Link>
        <div className="flex gap-3">
          <Link to="/" target="_blank" className="mono-tag"><ExternalLink size={16} /></Link>
          <button onClick={logout} className="mono-tag"><LogOut size={16} /></button>
        </div>
      </div>

      {/* mobile nav scroller */}
      <div className="md:hidden fixed top-14 inset-x-0 z-30 bg-background border-b border-border overflow-x-auto">
        <div className="flex">
          {NAV.map((n) => {
            const active = n.exact ? location.pathname === n.path : location.pathname.startsWith(n.path);
            return (
              <Link key={n.path} to={n.path} className={`whitespace-nowrap px-4 py-3 mono-tag border-b-2 ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground"}`}>
                {n.label.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>

      <main className="flex-1 pt-28 md:pt-0 md:px-10 md:py-10 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}