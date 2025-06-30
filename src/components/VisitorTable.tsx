
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Clock } from 'lucide-react';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Host, Visit, VisitWithDetails } from '@/types/vms';

interface VisitorTableProps {
  visitors: Visitor[];
  visits: Visit[];
  hosts: Host[];
  showActiveOnly?: boolean;
}

const VisitorTable: React.FC<VisitorTableProps> = ({ 
  visitors, 
  visits, 
  hosts, 
  showActiveOnly = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const visitsWithDetails = useMemo(() => {
    let filteredVisits = visits;
    
    if (showActiveOnly) {
      filteredVisits = visits.filter(visit => visit.Status === 'Checked In');
    }

    const visitsWithDetails: VisitWithDetails[] = filteredVisits.map(visit => {
      const visitor = visitors.find(v => v.VisitorID === visit.VisitorID);
      const host = hosts.find(h => h.HostID === visit.HostID);
      
      return {
        ...visit,
        visitor: visitor!,
        host: host!,
        duration: VisitorService.calculateDuration(visit.CheckInTime, visit.CheckOutTime)
      };
    });

    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      return visitsWithDetails.filter(visit =>
        visit.visitor.FirstName.toLowerCase().includes(lowerQuery) ||
        visit.visitor.LastName.toLowerCase().includes(lowerQuery) ||
        visit.visitor.Email?.toLowerCase().includes(lowerQuery) ||
        visit.visitor.ContactNumber?.includes(searchQuery) ||
        visit.visitor.Company?.toLowerCase().includes(lowerQuery) ||
        visit.host.FirstName.toLowerCase().includes(lowerQuery) ||
        visit.host.LastName.toLowerCase().includes(lowerQuery) ||
        visit.Purpose.toLowerCase().includes(lowerQuery)
      );
    }

    return visitsWithDetails.sort((a, b) => 
      new Date(b.CheckInTime).getTime() - new Date(a.CheckInTime).getTime()
    );
  }, [visitors, visits, hosts, searchQuery, showActiveOnly]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Checked In':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Checked In</Badge>;
      case 'Checked Out':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Checked Out</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {showActiveOnly ? 'Active Visits' : 'All Visits'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search visitors, hosts, or purpose..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Visitor</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Host</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Purpose</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Check In</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Check Out</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {visitsWithDetails.map((visit) => (
                <tr key={visit.VisitID} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {VisitorService.getVisitorFullName(visit.visitor)}
                      </div>
                      {visit.visitor.Email && (
                        <div className="text-sm text-gray-500">{visit.visitor.Email}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{visit.visitor.Company || '-'}</td>
                  <td className="py-3 px-4 text-gray-900">{visit.visitor.ContactNumber || '-'}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {VisitorService.getHostFullName(visit.host)}
                      </div>
                      <div className="text-sm text-gray-500">{visit.host.Department}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="outline">{visit.Purpose}</Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      {new Date(visit.CheckInTime).toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {visit.CheckOutTime ? (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {new Date(visit.CheckOutTime).toLocaleString()}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-900">{visit.duration}</td>
                  <td className="py-3 px-4">{getStatusBadge(visit.Status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {visitsWithDetails.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? 'No visits found matching your search.' : 'No visits recorded yet.'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorTable;
