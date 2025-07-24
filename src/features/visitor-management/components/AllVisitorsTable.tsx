import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, Eye, Edit, Trash2, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { VisitorManagementService } from "../services/visitor-management.service";
import { VisitorDetails, VisitorFilter } from "../types/visitor-management.types";

export const AllVisitorsTable = () => {
  const [visitors, setVisitors] = useState<VisitorDetails[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<VisitorDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<VisitorFilter>({
    status: 'all',
    company: 'all',
    dateRange: 'all'
  });

  useEffect(() => {
    loadVisitors();
  }, []);

  useEffect(() => {
    filterVisitors();
  }, [visitors, searchTerm, filter]);

  const loadVisitors = async () => {
    try {
      setLoading(true);
      const data = await VisitorManagementService.getAllVisitors();
      setVisitors(data);
    } catch (error) {
      toast.error("Failed to load visitors");
    } finally {
      setLoading(false);
    }
  };

  const filterVisitors = () => {
    let filtered = visitors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(visitor =>
        visitor.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.Company?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filter.status !== 'all') {
      filtered = filtered.filter(visitor => {
        if (filter.status === 'active') return visitor.totalVisits > 0;
        if (filter.status === 'inactive') return visitor.totalVisits === 0;
        return true;
      });
    }

    // Company filter
    if (filter.company !== 'all') {
      filtered = filtered.filter(visitor => visitor.Company === filter.company);
    }

    setFilteredVisitors(filtered);
  };

  const handleDeleteVisitor = async (visitorId: number) => {
    if (confirm("Are you sure you want to delete this visitor?")) {
      try {
        await VisitorManagementService.deleteVisitor(visitorId);
        toast.success("Visitor deleted successfully");
        loadVisitors();
      } catch (error) {
        toast.error("Failed to delete visitor");
      }
    }
  };

  const getStatusBadge = (totalVisits: number) => {
    if (totalVisits === 0) {
      return <Badge variant="secondary">New</Badge>;
    } else if (totalVisits < 5) {
      return <Badge variant="outline">Regular</Badge>;
    } else {
      return <Badge variant="default">Frequent</Badge>;
    }
  };

  const uniqueCompanies = Array.from(new Set(visitors.map(v => v.Company).filter(Boolean)));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>All Visitors</CardTitle>
            </div>
            <Badge variant="outline">{filteredVisitors.length} visitors</Badge>
          </div>
          <CardDescription>Manage and view all registered visitors</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search visitors..."
                className="pl-10"
              />
            </div>
            <Select onValueChange={(value) => setFilter({...filter, status: value as any})}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => setFilter({...filter, company: value})}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {uniqueCompanies.map(company => (
                  <SelectItem key={company} value={company!}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading visitors...
                    </TableCell>
                  </TableRow>
                ) : filteredVisitors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No visitors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVisitors.map((visitor) => (
                    <TableRow key={visitor.VisitorID}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{visitor.FirstName} {visitor.LastName}</p>
                          {visitor.Email && (
                            <p className="text-sm text-muted-foreground">{visitor.Email}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{visitor.Company || '-'}</TableCell>
                      <TableCell>{visitor.ContactNumber || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{visitor.totalVisits}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(visitor.totalVisits)}</TableCell>
                      <TableCell>
                        {visitor.lastVisitDate ? 
                          new Date(visitor.lastVisitDate).toLocaleDateString() : 
                          'Never'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteVisitor(visitor.VisitorID)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};