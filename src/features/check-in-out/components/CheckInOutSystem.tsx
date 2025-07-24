import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { LogIn, LogOut, Clock, User, Search } from "lucide-react";
import { toast } from "sonner";
import { CheckInOutService } from "../services/check-in-out.service";
import { ActiveVisit, CheckInData, CheckOutData } from "../types/check-in-out.types";

export const CheckInOutSystem = () => {
  const [activeVisits, setActiveVisits] = useState<ActiveVisit[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkInData, setCheckInData] = useState<CheckInData>({
    VisitorID: 0,
    HostID: 0,
    Purpose: ""
  });

  useEffect(() => {
    loadActiveVisits();
  }, []);

  const loadActiveVisits = async () => {
    try {
      const visits = await CheckInOutService.getActiveVisits();
      setActiveVisits(visits);
    } catch (error) {
      toast.error("Failed to load active visits");
    }
  };

  const handleCheckIn = async () => {
    try {
      await CheckInOutService.checkIn(checkInData);
      toast.success("Visitor checked in successfully!");
      setCheckInData({ VisitorID: 0, HostID: 0, Purpose: "" });
      loadActiveVisits();
    } catch (error) {
      toast.error("Failed to check in visitor");
    }
  };

  const handleCheckOut = async (visitId: number) => {
    try {
      await CheckInOutService.checkOut(visitId);
      toast.success("Visitor checked out successfully!");
      loadActiveVisits();
    } catch (error) {
      toast.error("Failed to check out visitor");
    }
  };

  const filteredVisits = activeVisits.filter(visit =>
    visit.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visit.hostName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Check In Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            <CardTitle>Check In Visitor</CardTitle>
          </div>
          <CardDescription>Register a new visit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Visitor</Label>
              <Select onValueChange={(value) => setCheckInData({...checkInData, VisitorID: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visitor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">John Doe</SelectItem>
                  <SelectItem value="2">Jane Smith</SelectItem>
                  <SelectItem value="3">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Host</Label>
              <Select onValueChange={(value) => setCheckInData({...checkInData, HostID: parseInt(value)})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select host" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Alice Wilson</SelectItem>
                  <SelectItem value="2">David Brown</SelectItem>
                  <SelectItem value="3">Sarah Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Purpose</Label>
              <Textarea
                value={checkInData.Purpose}
                onChange={(e) => setCheckInData({...checkInData, Purpose: e.target.value})}
                placeholder="Purpose of visit"
                className="min-h-[40px]"
              />
            </div>
          </div>
          <Button onClick={handleCheckIn} className="mt-4">
            <LogIn className="h-4 w-4 mr-2" />
            Check In
          </Button>
        </CardContent>
      </Card>

      {/* Active Visits Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardTitle>Active Visits</CardTitle>
            </div>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search visitors..."
                className="pl-10 w-64"
              />
            </div>
          </div>
          <CardDescription>Currently checked-in visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVisits.map((visit) => (
              <div key={visit.VisitID} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{visit.visitorName}</p>
                      <p className="text-sm text-muted-foreground">{visit.company}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">Host: {visit.hostName}</p>
                    <p className="text-sm text-muted-foreground">{visit.Purpose}</p>
                  </div>
                  <Badge variant="outline">{visit.duration}</Badge>
                </div>
                <Button
                  onClick={() => handleCheckOut(visit.VisitID)}
                  variant="outline"
                  size="sm"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Check Out
                </Button>
              </div>
            ))}
            {filteredVisits.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No active visits found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};