import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Clock, Users, TrendingUp, UserCog, FileText } from 'lucide-react';
import { toast } from 'sonner';
import VisitorForm from '@/components/VisitorForm';
import VisitorTable from '@/components/VisitorTable';
import CheckInOut from '@/components/CheckInOut';
import AdminDashboard from '@/components/AdminDashboard';
import HostManagement from '@/components/HostManagement';
import Reports from '@/components/Reports';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Visit, Host } from '@/types/vms';

const Index = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [hosts, setHosts] = useState<Host[]>([]);
  const [activeTab, setActiveTab] = useState<'register' | 'checkin' | 'visitors' | 'hosts' | 'reports' | 'admin'>('register');

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

  const downloadProjectReport = () => {
    try {
      const reportContent = `# VISITOR MANAGEMENT SYSTEM - PROJECT REPORT

**Submitted to:** Human Resources Department  
**Project Name:** Visitor Management System (VMS)  
**Report Date:** ${new Date().toLocaleDateString()}  
**Project Status:** Complete  

---

## EXECUTIVE SUMMARY

The Visitor Management System (VMS) is a comprehensive web-based application designed to streamline and digitize the visitor registration, tracking, and management process within our organization. This modern solution replaces traditional paper-based visitor logs with an efficient, secure, and user-friendly digital platform.

### Key Benefits Delivered:
- **Enhanced Security:** Digital visitor tracking with real-time status monitoring
- **Improved Efficiency:** Automated check-in/check-out processes reducing wait times
- **Data Analytics:** Comprehensive reporting and analytics capabilities
- **Professional Image:** Modern interface that enhances visitor experience
- **Compliance:** Detailed audit trails and visitor records for security compliance

---

## CURRENT SYSTEM STATISTICS

### Real-time Data (as of ${new Date().toLocaleString()}):
- **Total Registered Visitors:** ${visitors.length}
- **Total Hosts:** ${hosts.length}
- **Total Visits Recorded:** ${visits.length}
- **Today's Visits:** ${stats.totalToday}
- **Currently Checked In:** ${stats.checkedIn}
- **Completed Visits Today:** ${stats.checkedOut}

---

## PROJECT OVERVIEW

### Purpose
The VMS was developed to address the following organizational needs:
- Digitize visitor registration and tracking processes
- Enhance security through better visitor monitoring
- Provide real-time insights into visitor patterns
- Improve operational efficiency at reception areas
- Generate comprehensive reports for management and compliance

### Target Users
- **Reception Staff:** Primary users for visitor registration and management
- **Hosts/Employees:** Secondary users who receive visitors
- **Security Personnel:** For monitoring active visitors and access control
- **Management:** For reporting and analytics insights
- **HR Department:** For visitor policy compliance and reporting

---

## TECHNICAL ARCHITECTURE

### Technology Stack
- **Frontend:** React 18 with TypeScript for type-safe development
- **UI Framework:** Modern responsive design using Tailwind CSS
- **State Management:** React hooks for efficient state handling
- **Build Tool:** Vite for fast development and optimized production builds
- **Component Library:** Radix UI components for accessibility and consistency

### System Requirements
- **Browser Compatibility:** Modern web browsers (Chrome, Firefox, Safari, Edge)
- **Device Support:** Desktop computers, tablets, and mobile devices
- **Network:** Standard internet connection for web access
- **Hosting:** Can be deployed on any standard web hosting platform

---

## CORE FEATURES AND FUNCTIONALITY

### 1. Visitor Registration Module
- **Quick Registration:** Streamlined form for new visitor registration
- **Visitor Information:** Capture essential details (name, company, contact, email)
- **Purpose Tracking:** Categorized visit purposes (Meeting, Interview, Delivery, etc.)
- **Host Assignment:** Link visitors to specific employees/hosts
- **Real-time Updates:** Instant registration with immediate availability

### 2. Check-In/Check-Out System
- **Easy Check-In:** Simple interface for visitor arrival processing
- **Automatic Timestamps:** System-generated check-in/check-out times
- **Status Tracking:** Real-time visitor status (Checked In/Checked Out)
- **Duration Calculation:** Automatic visit duration tracking
- **Active Visitor Monitoring:** Live view of currently present visitors

### 3. Host Management
- **Host Database:** Comprehensive employee/host information management
- **Department Organization:** Categorized by departments for easy organization
- **Contact Information:** Maintain up-to-date contact details
- **Host Assignment:** Easy assignment of hosts to incoming visitors
- **CRUD Operations:** Complete create, read, update, delete functionality

### 4. Comprehensive Reporting
- **Daily Reports:** Generate daily visitor logs with detailed information
- **Historical Reports:** Access historical visitor data with flexible filtering
- **Custom Reports:** Generate reports based on specific criteria
- **Export Functionality:** Download reports in CSV format for further analysis
- **Filter Options:** Filter by date range, visitor, host, or visit purpose

### 5. Admin Dashboard
- **Real-time Analytics:** Live statistics and visitor flow insights
- **Visual Charts:** Graphical representation of visitor patterns
- **Performance Metrics:** Key performance indicators for visitor management
- **Data Visualization:** Interactive charts showing trends and patterns
- **Management Overview:** High-level insights for decision making

### 6. Advanced Search and Filtering
- **Visitor Search:** Quick search functionality across visitor database
- **Advanced Filters:** Multi-criteria filtering for efficient data retrieval
- **Status-based Filtering:** Filter visitors by current status
- **Date Range Selection:** Historical data access with date range filtering

---

## IMPLEMENTATION STATUS

### Completed Features ✅
- [x] Complete visitor registration system
- [x] Check-in/check-out functionality
- [x] Host management module
- [x] Comprehensive reporting system
- [x] Admin dashboard with analytics
- [x] Export functionality (CSV reports)
- [x] Responsive design implementation
- [x] Real-time status tracking
- [x] Search and filtering capabilities
- [x] Data validation and error handling

---

## BUSINESS VALUE AND ROI

### Quantifiable Benefits
- **Time Savings:** Estimated 60% reduction in visitor processing time
- **Error Reduction:** Elimination of manual data entry errors
- **Paper Reduction:** Complete elimination of paper-based visitor logs
- **Staff Efficiency:** Reduced administrative burden on reception staff

### Intangible Benefits
- **Enhanced Security:** Better visitor tracking and monitoring capabilities
- **Professional Image:** Modern system enhancing organizational reputation
- **Scalability:** System designed to grow with organizational needs
- **Future-Ready:** Architecture supports integration with other systems

---

## CONCLUSION AND RECOMMENDATIONS

The Visitor Management System successfully addresses all identified organizational needs for visitor tracking and management. The system provides immediate value through streamlined visitor processing, enhanced security monitoring, professional visitor experience, and comprehensive reporting capabilities.

### Recommendation
**Immediate Deployment:** The system is ready for production deployment with comprehensive training for staff. The investment in this system will yield immediate operational benefits and provide a strong foundation for future enhancements.

---

**Report Generated:** ${new Date().toLocaleString()}  
**System Version:** 1.0  
**Total Active Features:** All core modules operational

---

*This report contains proprietary and confidential information. Distribution should be limited to authorized personnel only.*`;

      // Create and trigger download
      const blob = new Blob([reportContent], { 
        type: 'text/markdown;charset=utf-8;' 
      });
      
      const filename = `VMS_Project_Report_${new Date().toISOString().split('T')[0]}.md`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(url);
      
      toast.success('Project report downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download project report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Visitor Management System</h1>
              <p className="text-gray-600">Streamline your visitor registration and tracking process</p>
            </div>
            <Button 
              onClick={downloadProjectReport}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="h-4 w-4" />
              Download Project Report
            </Button>
          </div>
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
            variant={activeTab === 'reports' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reports')}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Reports
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
          
          {activeTab === 'reports' && (
            <div className="lg:col-span-3">
              <Reports 
                visitors={visitors} 
                visits={visits} 
                hosts={hosts} 
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
