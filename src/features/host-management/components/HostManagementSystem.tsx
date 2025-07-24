import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Plus, Search, Edit, Trash2, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { HostManagementService } from "../services/host-management.service";
import { HostDetails, CreateHostData, UpdateHostData } from "../types/host-management.types";

export const HostManagementSystem = () => {
  const [hosts, setHosts] = useState<HostDetails[]>([]);
  const [filteredHosts, setFilteredHosts] = useState<HostDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHost, setEditingHost] = useState<HostDetails | null>(null);
  const [formData, setFormData] = useState<CreateHostData>({
    FirstName: "",
    LastName: "",
    Department: "",
    ContactNumber: ""
  });

  useEffect(() => {
    loadHosts();
  }, []);

  useEffect(() => {
    filterHosts();
  }, [hosts, searchTerm]);

  const loadHosts = async () => {
    try {
      setLoading(true);
      const data = await HostManagementService.getAllHosts();
      setHosts(data);
    } catch (error) {
      toast.error("Failed to load hosts");
    } finally {
      setLoading(false);
    }
  };

  const filterHosts = () => {
    if (!searchTerm) {
      setFilteredHosts(hosts);
      return;
    }

    const filtered = hosts.filter(host =>
      host.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.Department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      host.ContactNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHosts(filtered);
  };

  const handleAddHost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await HostManagementService.createHost(formData);
      toast.success("Host added successfully");
      setFormData({ FirstName: "", LastName: "", Department: "", ContactNumber: "" });
      setIsAddDialogOpen(false);
      loadHosts();
    } catch (error) {
      toast.error("Failed to add host");
    }
  };

  const handleUpdateHost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHost) return;

    try {
      await HostManagementService.updateHost(editingHost.HostID, formData);
      toast.success("Host updated successfully");
      setEditingHost(null);
      setFormData({ FirstName: "", LastName: "", Department: "", ContactNumber: "" });
      loadHosts();
    } catch (error) {
      toast.error("Failed to update host");
    }
  };

  const handleDeleteHost = async (hostId: number) => {
    if (confirm("Are you sure you want to delete this host?")) {
      try {
        await HostManagementService.deleteHost(hostId);
        toast.success("Host deleted successfully");
        loadHosts();
      } catch (error) {
        toast.error("Failed to delete host");
      }
    }
  };

  const openEditDialog = (host: HostDetails) => {
    setEditingHost(host);
    setFormData({
      FirstName: host.FirstName,
      LastName: host.LastName,
      Department: host.Department || "",
      ContactNumber: host.ContactNumber || ""
    });
  };

  const resetForm = () => {
    setFormData({ FirstName: "", LastName: "", Department: "", ContactNumber: "" });
    setEditingHost(null);
  };

  const getStatusBadge = (activeVisits: number) => {
    if (activeVisits > 0) {
      return <Badge variant="default">Available</Badge>;
    }
    return <Badge variant="secondary">Free</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle>Host Management</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{filteredHosts.length} hosts</Badge>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Host
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Host</DialogTitle>
                    <DialogDescription>
                      Add a new host to the system
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddHost} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.FirstName}
                          onChange={(e) => setFormData({...formData, FirstName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.LastName}
                          onChange={(e) => setFormData({...formData, LastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.Department}
                        onChange={(e) => setFormData({...formData, Department: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input
                        id="contact"
                        value={formData.ContactNumber}
                        onChange={(e) => setFormData({...formData, ContactNumber: e.target.value})}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Add Host</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CardDescription>Manage company hosts and employees</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative mb-6">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hosts..."
              className="pl-10"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Total Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading hosts...
                    </TableCell>
                  </TableRow>
                ) : filteredHosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No hosts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHosts.map((host) => (
                    <TableRow key={host.HostID}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4" />
                          <span className="font-medium">{host.FirstName} {host.LastName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{host.Department || '-'}</TableCell>
                      <TableCell>{host.ContactNumber || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{host.totalVisits}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(host.activeVisits)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditDialog(host)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteHost(host.HostID)}
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

      {/* Edit Dialog */}
      <Dialog open={!!editingHost} onOpenChange={(open) => !open && resetForm()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Host</DialogTitle>
            <DialogDescription>
              Update host information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateHost} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">First Name *</Label>
                <Input
                  id="editFirstName"
                  value={formData.FirstName}
                  onChange={(e) => setFormData({...formData, FirstName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Last Name *</Label>
                <Input
                  id="editLastName"
                  value={formData.LastName}
                  onChange={(e) => setFormData({...formData, LastName: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDepartment">Department</Label>
              <Input
                id="editDepartment"
                value={formData.Department}
                onChange={(e) => setFormData({...formData, Department: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editContact">Contact Number</Label>
              <Input
                id="editContact"
                value={formData.ContactNumber}
                onChange={(e) => setFormData({...formData, ContactNumber: e.target.value})}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit">Update Host</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};