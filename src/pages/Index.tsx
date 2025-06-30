
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Clock, Users, TrendingUp, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import VisitorForm from '@/components/VisitorForm';
import VisitorTable from '@/components/VisitorTable';
import CheckInOut from '@/components/CheckInOut';
import AdminDashboard from '@/components/AdminDashboard';
import HostManagement from '@/components/HostManagement';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Visit, Host } from '@/types/vms';

const Index = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [activeTab, setActiveTab] = useState<'register' | 'checkin' | 'visitors' | 'admin' | 'hosts'>('register');

  useEffect(() => {
    // Load initial data
    setVisitors(VisitorService.getAllVisitors());
    setVisits(VisitorService.getAllVisits());
    setHosts(VisitorService.getAllHosts());
  }, []);

  const handleVisitorRegistered = (visitor: Visitor) => {
    setVisitors(prev => [...prev, visitor]);
    toast.success("Visitor registered successfully!");
  };

  const handleVisitCreated = (visit: Visit) => {
    setVisits(prev => [...prev, visit]);
    toast.success("Visit recorded successfully!");
  };

  const handleHostCreated = (host: Host) => {
    setHosts(prev => [...prev, host]);
    toast.success("Host added successfully!");
  };

  const handleHostUpdated = (updatedHost: Host) => {
    setHosts(prev => prev.map(h => h.HostID === updatedHost.HostID ? updatedHost : h));
    toast.success("Host updated successfully!");
  };

  const handleHostDeleted = (hostId: number) => {
    setHosts(prev => prev.filter(h => h.HostID !== hostId));
    toast.success("Host deleted successfully!");
  };

  const getTodaysStats = () => {
    const today = new Date().toDateString();
    const todaysVisits = visits.filter(visit => 
      new Date(visit.CheckInTime).toDateString() === today
    );
    const checkedInCount = todaysVisits.filter(visit => visit.Status === 'Checked In').length;
    
    return {
      totalToday: todaysVisits.length,
      checkedIn: checkedInCount,
      checkedOut: todaysVisits.length - checkedInCount
    };
  };

  const stats = getTodaysStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Visitor Management System</h1>
          <p className="text-gray-600">Streamline your visitor registration and tracking process</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Visits</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalToday}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Checked In</p>
                  <p className="text-2xl font-bold text-green-600">{stats.checkedIn}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Checked Out</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.checkedOut}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                  <p className="text-2xl font-bold text-purple-600">{visitors.length}</p>
                </div>
                <UserPlus className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'register' ? 'default' : 'outline'}
            onClick={() => setActiveTab('register')}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Register Visitor
          </Button>
          <Button
            variant={activeTab === 'checkin' ? 'default' : 'outline'}
            onClick={() => setActiveTab('checkin')}
            className="flex items-center gap-2"
          >
            <Clock className="h-4 w-4" />
            Check In/Out
          </Button>
          <Button
            variant={activeTab === 'visitors' ? 'default' : 'outline'}
            onClick={() => setActiveTab('visitors')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            All Visitors
          </Button>
          <Button
            variant={activeTab === 'hosts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('hosts')}
            className="flex items-center gap-2"
          >
            <UserCog className="h-4 w-4" />
            Host Management
          </Button>
          <Button
            variant={activeTab === 'admin' ? 'default' : 'outline'}
            onClick={() => setActiveTab('admin')}
            className="flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Admin Dashboard
          </Button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {activeTab === 'register' && (
            <>
              <div className="lg:col-span-1">
                <VisitorForm 
                  hosts={hosts} 
                  onVisitorRegistered={handleVisitorRegistered}
                  onVisitCreated={handleVisitCreated}
                />
              </div>
              <div className="lg:col-span-2">
                <VisitorTable visitors={visitors} visits={visits} hosts={hosts} />
              </div>
            </>
          )}
          
          {activeTab === 'checkin' && (
            <>
              <div className="lg:col-span-1">
                <CheckInOut 
                  visitors={visitors} 
                  visits={visits}
                  onVisitUpdated={(updatedVisit) => {
                    setVisits(prev => prev.map(v => v.VisitID === updatedVisit.VisitID ? updatedVisit : v));
                  }}
                />
              </div>
              <div className="lg:col-span-2">
                <VisitorTable visitors={visitors} visits={visits} hosts={hosts} showActiveOnly />
              </div>
            </>
          )}
          
          {activeTab === 'visitors' && (
            <div className="lg:col-span-3">
              <VisitorTable visitors={visitors} visits={visits} hosts={hosts} />
            </div>
          )}
          
          {activeTab === 'hosts' && (
            <div className="lg:col-span-3">
              <HostManagement 
                hosts={hosts}
                onHostCreated={handleHostCreated}
                onHostUpdated={handleHostUpdated}
                onHostDeleted={handleHostDeleted}
              />
            </div>
          )}
          
          {activeTab === 'admin' && (
            <div className="lg:col-span-3">
              <AdminDashboard visitors={visitors} visits={visits} hosts={hosts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
