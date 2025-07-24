import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, Clock, TrendingUp, AlertTriangle, Calendar, Building2, Activity } from "lucide-react";
import { toast } from "sonner";
import { AdminDashboardService } from "../services/admin-dashboard.service";
import { DashboardStats, ActiveVisit, RecentActivity, SystemAlert } from "../types/admin-dashboard.types";

export const AdminDashboardMain = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activeVisits, setActiveVisits] = useState<ActiveVisit[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    // Set up real-time updates
    const interval = setInterval(loadDashboardData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, visitsData, activityData, alertsData] = await Promise.all([
        AdminDashboardService.getDashboardStats(),
        AdminDashboardService.getActiveVisits(),
        AdminDashboardService.getRecentActivity(),
        AdminDashboardService.getSystemAlerts()
      ]);

      setStats(statsData);
      setActiveVisits(visitsData);
      setRecentActivity(activityData);
      setAlerts(alertsData);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = async (action: string) => {
    try {
      await AdminDashboardService.executeQuickAction(action);
      toast.success(`${action} completed successfully`);
      loadDashboardData();
    } catch (error) {
      toast.error(`Failed to execute ${action}`);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Card key={alert.id} className={`border-l-4 ${
              alert.type === 'error' ? 'border-red-500' :
              alert.type === 'warning' ? 'border-yellow-500' :
              'border-blue-500'
            }`}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${
                    alert.type === 'error' ? 'text-red-500' :
                    alert.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <span className="font-medium">{alert.title}</span>
                  <Badge variant={alert.type === 'error' ? 'destructive' : 'secondary'}>
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Total Visitors Today</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVisitorsToday}</div>
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-green-600">+{stats.growthRate}%</span>
                <span className="text-muted-foreground">vs yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Currently Checked In</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.currentlyCheckedIn}</div>
              <Progress value={(stats.currentlyCheckedIn / stats.maxCapacity) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {stats.maxCapacity - stats.currentlyCheckedIn} slots available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Average Visit Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageDuration}</div>
              <p className="text-xs text-muted-foreground">
                Based on completed visits today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <p className="text-xs text-muted-foreground">
                All systems running normally
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => handleQuickAction('check-out-all')}
              variant="outline" 
              className="w-full justify-start"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Check Out All Visitors
            </Button>
            <Button 
              onClick={() => handleQuickAction('generate-daily-report')}
              variant="outline" 
              className="w-full justify-start"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Generate Daily Report
            </Button>
            <Button 
              onClick={() => handleQuickAction('backup-data')}
              variant="outline" 
              className="w-full justify-start"
            >
              <Building2 className="h-4 w-4 mr-2" />
              Backup System Data
            </Button>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        {stats && (
          <Card>
            <CardHeader>
              <CardTitle>Visits by Department</CardTitle>
              <CardDescription>Today's distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={stats.departmentDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="visits"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Visits */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Visits</CardTitle>
              <Badge variant="outline">{activeVisits.length} active</Badge>
            </div>
            <CardDescription>Currently checked-in visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeVisits.slice(0, 5).map((visit) => (
                <div key={visit.VisitID} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{visit.visitorName}</p>
                    <p className="text-sm text-muted-foreground">
                      with {visit.hostName} • {visit.duration}
                    </p>
                  </div>
                  <Badge variant="secondary">{visit.purpose}</Badge>
                </div>
              ))}
              {activeVisits.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No active visits
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'check-in' ? 'bg-green-500' :
                    activity.type === 'check-out' ? 'bg-blue-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No recent activity
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};