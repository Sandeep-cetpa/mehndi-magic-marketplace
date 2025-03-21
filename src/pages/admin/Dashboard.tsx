
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingBag, 
  Scissors, 
  CalendarDays, 
  Users, 
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    workshops: 0,
    leads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Here you would fetch actual data from your Supabase tables
        // For now, we'll use placeholder values
        
        // Example of how to fetch the count from a table
        // const { count: productsCount } = await supabase
        //   .from('products')
        //   .select('*', { count: 'exact', head: true });

        setStats({
          products: 12, // Placeholder
          services: 8,  // Placeholder
          workshops: 5, // Placeholder
          leads: 24,    // Placeholder
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Products" 
            value={stats.products} 
            icon={<ShoppingBag className="h-8 w-8 text-primary" />} 
            loading={loading}
          />
          <StatCard 
            title="Services" 
            value={stats.services} 
            icon={<Scissors className="h-8 w-8 text-primary" />} 
            loading={loading}
          />
          <StatCard 
            title="Workshops" 
            value={stats.workshops} 
            icon={<CalendarDays className="h-8 w-8 text-primary" />} 
            loading={loading}
          />
          <StatCard 
            title="Leads" 
            value={stats.leads} 
            icon={<Users className="h-8 w-8 text-primary" />} 
            loading={loading}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading recent leads...</p>
              ) : (
                <p className="text-muted-foreground">No recent leads to display.</p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Workshops</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading upcoming workshops...</p>
              ) : (
                <p className="text-muted-foreground">No upcoming workshops to display.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

type StatCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  loading: boolean;
};

const StatCard = ({ title, value, icon, loading }: StatCardProps) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {loading ? (
            <div className="h-8 w-16 animate-pulse bg-muted rounded my-1"></div>
          ) : (
            <p className="text-3xl font-bold">{value}</p>
          )}
        </div>
        {icon}
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
