
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, LogIn, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Visit } from '@/types/vms';

interface CheckInOutProps {
  visitors: Visitor[];
  visits: Visit[];
  onVisitUpdated: (visit: Visit) => void;
}

const CheckInOut: React.FC<CheckInOutProps> = ({ visitors, visits, onVisitUpdated }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Visitor[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [currentVisit, setCurrentVisit] = useState<Visit | null>(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    const results = VisitorService.searchVisitors(searchQuery);
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.error('No visitors found matching your search');
      setSelectedVisitor(null);
      setCurrentVisit(null);
    } else if (results.length === 1) {
      handleSelectVisitor(results[0]);
    }
  };

  const handleSelectVisitor = (visitor: Visitor) => {
    setSelectedVisitor(visitor);
    
    // Find the visitor's current active visit
    const activeVisit = visits.find(v => 
      v.VisitorID === visitor.VisitorID && v.Status === 'Checked In'
    );
    
    setCurrentVisit(activeVisit || null);
  };

  const handleCheckOut = () => {
    if (!currentVisit) return;

    const updatedVisit = VisitorService.checkOutVisit(currentVisit.VisitID);
    if (updatedVisit) {
      onVisitUpdated(updatedVisit);
      setCurrentVisit(null);
      toast.success(`${VisitorService.getVisitorFullName(selectedVisitor!)} checked out successfully!`);
    } else {
      toast.error('Failed to check out visitor');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Checked In':
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>;
      case 'Checked Out':
        return <Badge className="bg-gray-100 text-gray-800">Checked Out</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Check In / Check Out
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Search Section */}
        <div className="space-y-4 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
              Search
            </Button>
          </div>

          {/* Search Results */}
          {searchResults.length > 1 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Multiple visitors found. Please select one:</p>
              {searchResults.map(visitor => (
                <div 
                  key={visitor.VisitorID}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleSelectVisitor(visitor)}
                >
                  <div className="font-medium">{VisitorService.getVisitorFullName(visitor)}</div>
                  <div className="text-sm text-gray-500">
                    {visitor.Company && `${visitor.Company} • `}
                    {visitor.ContactNumber || visitor.Email}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Visitor Information */}
        {selectedVisitor && (
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">Visitor Information</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium">{VisitorService.getVisitorFullName(selectedVisitor)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Company</p>
                <p className="font-medium">{selectedVisitor.Company || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{selectedVisitor.ContactNumber || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{selectedVisitor.Email || '-'}</p>
              </div>
            </div>

            {/* Current Visit Status */}
            {currentVisit ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(currentVisit.Status)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-in Time</p>
                    <p className="font-medium">{new Date(currentVisit.CheckInTime).toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Purpose</p>
                  <p className="font-medium">{currentVisit.Purpose}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">
                    {VisitorService.calculateDuration(currentVisit.CheckInTime, currentVisit.CheckOutTime)}
                  </p>
                </div>

                {currentVisit.Status === 'Checked In' && (
                  <Button 
                    onClick={handleCheckOut}
                    className="w-full bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Check Out
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No active visit found for this visitor.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Visitor needs to be registered for a new visit first.
                </p>
              </div>
            )}
          </div>
        )}

        {searchResults.length === 0 && searchQuery && (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No visitors found matching "{searchQuery}"</p>
            <p className="text-sm mt-1">Try searching by name, phone number, or email</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckInOut;
