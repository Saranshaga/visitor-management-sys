
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Clock, TrendingUp, Calendar, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Host, Visit } from '@/types/vms';

interface AdminDashboardProps {
  visitors: Visitor[];
  visits: Visit[];
  hosts: Host[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ visitors, visits, hosts }) => {
  const analytics = useMemo(() => {
    const today = new Date();
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Basic counts
    const totalVisitors = visitors.length;
    const totalVisits = visits.length;
    const activeVisits = visits.filter(v => v.Status === 'Checked In').length;
    
    // Time-based analytics
    const todaysVisits = visits.filter(v => 
      new Date(v.CheckInTime).toDateString() === today.toDateString()
    );
    
    const weeklyVisits = visits.filter(v => 
      new Date(v.CheckInTime) >= thisWeek
    );
    
    const monthlyVisits = visits.filter(v => 
      new Date(v.CheckInTime) >= thisMonth
    );

    // Purpose analytics
    const purposeStats = visits.reduce((acc, visit) => {
      acc[visit.Purpose] = (acc[visit.Purpose] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Host analytics
    const hostStats = visits.reduce((acc, visit) => {
      const host = hosts.find(h => h.HostID === visit.HostID);
      if (host) {
        const hostName = VisitorService.getHostFullName(host);
        acc[hostName] = (acc[hostName] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Daily visits for the last 7 days
    const dailyVisits = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dayVisits = visits.filter(v => 
        new Date(v.CheckInTime).toDateString() === date.toDateString()
      );
      dailyVisits.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        visits: dayVisits.length,
        checkedIn: dayVisits.filter(v => v.Status === 'Checked In').length,
        checkedOut: dayVisits.filter(v => v.Status === 'Checked Out').length
      });
    }

    // Average visit duration
    const completedVisits = visits.filter(v => v.CheckOutTime);
    const avgDuration = completedVisits.length > 0 
      ? completedVisits.reduce((sum, visit) => {
          const duration = visit.CheckOutTime!.getTime() - visit.CheckInTime.getTime();
          return sum + duration;
        }, 0) / completedVisits.length
      : 0;

    const avgDurationMinutes = Math.floor(avgDuration / 60000);
    const avgDurationHours = Math.floor(avgDurationMinutes / 60);
    const avgDurationRemaining = avgDurationMinutes % 60;

    return {
      totalVisitors,
      totalVisits,
      activeVisits,
      todaysVisits: todaysVisits.length,
      weeklyVisits: weeklyVisits.length,
      monthlyVisits: monthlyVisits.length,
      purposeStats,
      hostStats,
      dailyVisits,
      avgDuration: avgDurationHours > 0 
        ? `${avgDurationHours}h ${avgDurationRemaining}m`
        : `${avgDurationMinutes}m`
    };
  }, [visitors, visits, hosts]);

  const purposeChartData = Object.entries(analytics.purposeStats).map(([purpose, count]) => ({
    name: purpose,
    value: count
  }));

  const hostChartData = Object.entries(analytics.hostStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([host, count]) => ({
      name: host.split(' ').map(n => n.charAt(0)).join(''), // Initials for space
      fullName: host,
      visits: count
    }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const generateReport = (type: 'daily' | 'custom') => {
    toast.success(`${type === 'daily' ? 'Daily' : 'Custom'} report generated successfully!`);
    // In a real application, this would generate and download a PDF or CSV file
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Visitors</p>
                <p className="text-3xl font-bold">{analytics.totalVisitors}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Active Visits</p>
                <p className="text-3xl font-bold">{analytics.activeVisits}</p>
              </div>
              <Clock className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Today's Visits</p>
                <p className="text-3xl font-bold">{analytics.todaysVisits}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Duration</p>
                <p className="text-3xl font-bold">{analytics.avgDuration}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Visits Chart */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Daily Visits (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.dailyVisits}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="checkedIn" stackId="a" fill="#10B981" name="Checked In" />
                <Bar dataKey="checkedOut" stackId="a" fill="#6B7280" name="Checked Out" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Purpose Distribution */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Visit Purposes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={purposeChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {purposeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Host Visits and Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Hosts */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Most Visited Hosts</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hostChartData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={50} />
                <Tooltip formatter={(value, name, props) => [value, `${props.payload.fullName}: ${value} visits`]} />
                <Bar dataKey="visits" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions & Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button 
                onClick={() => generateReport('daily')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <FileText className="h-4 w-4" />
                Generate Daily Report
              </Button>
              
              <Button 
                onClick={() => generateReport('custom')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Generate Custom Report
              </Button>
            </div>

            {/* Recent Activity Summary */}
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-semibold mb-3">Activity Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>This Week:</span>
                  <Badge variant="outline">{analytics.weeklyVisits} visits</Badge>
                </div>
                <div className="flex justify-between">
                  <span>This Month:</span>
                  <Badge variant="outline">{analytics.monthlyVisits} visits</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Visits:</span>
                  <Badge variant="outline">{analytics.totalVisits} visits</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
