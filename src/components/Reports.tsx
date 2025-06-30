
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Download, FileText, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Host, Visit, VisitWithDetails } from '@/types/vms';

interface ReportsProps {
  visitors: Visitor[];
  visits: Visit[];
  hosts: Host[];
}

const Reports: React.FC<ReportsProps> = ({ visitors, visits, hosts }) => {
  const [reportType, setReportType] = useState<'daily' | 'history'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateeTo] = useState('');
  const [selectedVisitor, setSelectedVisitor] = useState('');
  const [selectedHost, setSelectedHost] = useState('');

  // Get detailed visit information
  const getVisitDetails = (visit: Visit): VisitWithDetails => {
    const visitor = visitors.find(v => v.VisitorID === visit.VisitorID);
    const host = hosts.find(h => h.HostID === visit.HostID);
    
    return {
      ...visit,
      visitor: visitor!,
      host: host!,
      duration: VisitorService.calculateDuration(visit.CheckInTime, visit.CheckOutTime)
    };
  };

  // Daily Report Data
  const dailyReportData = useMemo(() => {
    const targetDate = new Date(selectedDate).toDateString();
    return visits
      .filter(visit => new Date(visit.CheckInTime).toDateString() === targetDate)
      .map(getVisitDetails)
      .sort((a, b) => new Date(a.CheckInTime).getTime() - new Date(b.CheckInTime).getTime());
  }, [visits, visitors, hosts, selectedDate]);

  // History Report Data
  const historyReportData = useMemo(() => {
    let filteredVisits = [...visits];

    // Filter by date range
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredVisits = filteredVisits.filter(visit => 
        new Date(visit.CheckInTime) >= fromDate
      );
    }
    if (dateTo) {
      const toDate = new Date(dateTo);
      toDate.setHours(23, 59, 59, 999); // End of day
      filteredVisits = filteredVisits.filter(visit => 
        new Date(visit.CheckInTime) <= toDate
      );
    }

    // Filter by visitor
    if (selectedVisitor) {
      filteredVisits = filteredVisits.filter(visit => 
        visit.VisitorID === parseInt(selectedVisitor)
      );
    }

    // Filter by host
    if (selectedHost) {
      filteredVisits = filteredVisits.filter(visit => 
        visit.HostID === parseInt(selectedHost)
      );
    }

    return filteredVisits
      .map(getVisitDetails)
      .sort((a, b) => new Date(b.CheckInTime).getTime() - new Date(a.CheckInTime).getTime());
  }, [visits, visitors, hosts, dateFrom, dateTo, selectedVisitor, selectedHost]);

  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDuration = (duration: string) => {
    if (duration === 'Active') return 'N/A';
    return duration.replace('h', '.').replace('m', '').replace(' ', '');
  };

  const exportReport = (type: 'daily' | 'history') => {
    const data = type === 'daily' ? dailyReportData : historyReportData;
    const reportTitle = type === 'daily' 
      ? `Daily Visitor Log - ${new Date(selectedDate).toLocaleDateString()}`
      : `Visitor History Report - ${getHistoryReportFilter()}`;
    
    // In a real application, this would generate CSV/PDF
    console.log(`Exporting ${reportTitle}:`, data);
    toast.success(`${reportTitle} exported successfully!`);
  };

  const getHistoryReportFilter = () => {
    const filters = [];
    if (dateFrom && dateTo) {
      filters.push(`Date Range: ${dateFrom} to ${dateTo}`);
    } else if (dateFrom) {
      filters.push(`From: ${dateFrom}`);
    } else if (dateTo) {
      filters.push(`To: ${dateTo}`);
    }
    
    if (selectedVisitor) {
      const visitor = visitors.find(v => v.VisitorID === parseInt(selectedVisitor));
      if (visitor) filters.push(`Visitor: ${VisitorService.getVisitorFullName(visitor)}`);
    }
    
    if (selectedHost) {
      const host = hosts.find(h => h.HostID === parseInt(selectedHost));
      if (host) filters.push(`Host: ${VisitorService.getHostFullName(host)}`);
    }
    
    return filters.length > 0 ? filters.join(', ') : 'All Records';
  };

  const clearFilters = () => {
    setDateFrom('');
    setDateeTo('');
    setSelectedVisitor('');
    setSelectedHost('');
  };

  return (
    <div className="space-y-6">
      {/* Report Type Selection */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Button
              variant={reportType === 'daily' ? 'default' : 'outline'}
              onClick={() => setReportType('daily')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Daily Report
            </Button>
            <Button
              variant={reportType === 'history' ? 'default' : 'outline'}
              onClick={() => setReportType('history')}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              History Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Report */}
      {reportType === 'daily' && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Daily Visitor Log - {new Date(selectedDate).toLocaleDateString()}</CardTitle>
              <Button onClick={() => exportReport('daily')} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="reportDate">Select Date:</Label>
              <Input
                id="reportDate"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-auto"
              />
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitor Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Host Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Check-out Time</TableHead>
                    <TableHead>Duration (Hrs)</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dailyReportData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500">
                        No visits found for the selected date
                      </TableCell>
                    </TableRow>
                  ) : (
                    dailyReportData.map((visit) => (
                      <TableRow key={visit.VisitID}>
                        <TableCell>{VisitorService.getVisitorFullName(visit.visitor)}</TableCell>
                        <TableCell>{visit.visitor.Company || 'N/A'}</TableCell>
                        <TableCell>{VisitorService.getHostFullName(visit.host)}</TableCell>
                        <TableCell>{visit.Purpose}</TableCell>
                        <TableCell>{formatDateTime(visit.CheckInTime)}</TableCell>
                        <TableCell>
                          {visit.CheckOutTime ? formatDateTime(visit.CheckOutTime) : 'N/A'}
                        </TableCell>
                        <TableCell>{formatDuration(visit.duration || 'N/A')}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            visit.Status === 'Checked In' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {visit.Status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Report */}
      {reportType === 'history' && (
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Visitor History Report - {getHistoryReportFilter()}</CardTitle>
              <Button onClick={() => exportReport('history')} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label htmlFor="dateFrom">From Date:</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="dateTo">To Date:</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateeTo(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="filterVisitor">Visitor:</Label>
                <Select value={selectedVisitor} onValueChange={setSelectedVisitor}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Visitors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Visitors</SelectItem>
                    {visitors.map((visitor) => (
                      <SelectItem key={visitor.VisitorID} value={visitor.VisitorID.toString()}>
                        {VisitorService.getVisitorFullName(visitor)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="filterHost">Host:</Label>
                <Select value={selectedHost} onValueChange={setSelectedHost}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Hosts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Hosts</SelectItem>
                    {hosts.map((host) => (
                      <SelectItem key={host.HostID} value={host.HostID.toString()}>
                        {VisitorService.getHostFullName(host)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visit ID</TableHead>
                    <TableHead>Visitor Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Host Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Check-in Time</TableHead>
                    <TableHead>Check-out Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historyReportData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500">
                        No visits found matching the selected criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    historyReportData.map((visit) => (
                      <TableRow key={visit.VisitID}>
                        <TableCell>{visit.VisitID}</TableCell>
                        <TableCell>{VisitorService.getVisitorFullName(visit.visitor)}</TableCell>
                        <TableCell>{visit.visitor.Company || 'N/A'}</TableCell>
                        <TableCell>{VisitorService.getHostFullName(visit.host)}</TableCell>
                        <TableCell>{visit.Purpose}</TableCell>
                        <TableCell>{formatDateTime(visit.CheckInTime)}</TableCell>
                        <TableCell>
                          {visit.CheckOutTime ? formatDateTime(visit.CheckOutTime) : 'N/A'}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs ${
                            visit.Status === 'Checked In' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {visit.Status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reports;
