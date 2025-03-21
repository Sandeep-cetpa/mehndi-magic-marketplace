
import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from './ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Scissors, 
  CalendarDays, 
  Users, 
  Settings, 
  LogOut 
} from 'lucide-react';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/admin/login');
      }
      setLoading(false);
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold">Admin Portal</h1>
        </div>
        <nav className="space-y-1 px-3">
          <SidebarLink icon={<LayoutDashboard size={18} />} href="/admin/dashboard" label="Dashboard" />
          <SidebarLink icon={<ShoppingBag size={18} />} href="/admin/products" label="Products" />
          <SidebarLink icon={<Scissors size={18} />} href="/admin/services" label="Services" />
          <SidebarLink icon={<CalendarDays size={18} />} href="/admin/workshops" label="Workshops" />
          <SidebarLink icon={<Users size={18} />} href="/admin/leads" label="Leads" />
          <SidebarLink icon={<Settings size={18} />} href="/admin/settings" label="Settings" />
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Button variant="ghost" onClick={handleLogout} className="w-full flex items-center">
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

type SidebarLinkProps = {
  icon: ReactNode;
  href: string;
  label: string;
};

const SidebarLink = ({ icon, href, label }: SidebarLinkProps) => {
  const navigate = useNavigate();
  const isActive = window.location.pathname === href;

  return (
    <button
      onClick={() => navigate(href)}
      className={`flex items-center px-4 py-2 text-sm rounded-md w-full ${
        isActive 
          ? 'bg-primary text-primary-foreground' 
          : 'text-foreground hover:bg-muted'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  );
};

export default AdminLayout;
