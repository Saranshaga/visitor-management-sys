import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { VisitorService } from '@/services/VisitorService';
import { Host } from '@/types/vms';

interface HostManagementProps {
  hosts: Host[];
  onHostCreated: (host: Host) => void;
  onHostUpdated: (host: Host) => void;
  onHostDeleted: (hostId: number) => void;
}

const HostManagement: React.FC<HostManagementProps> = ({
  hosts,
  onHostCreated,
  onHostUpdated,
  onHostDeleted
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingHost, setEditingHost] = useState<Host | null>(null);
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Department: '',
    ContactNumber: ''
  });

  const resetForm = () => {
    setFormData({
      FirstName: '',
      LastName: '',
      Department: '',
      ContactNumber: ''
    });
  };

  const handleAddHost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.FirstName.trim() || !formData.LastName.trim()) {
      toast.error("First name and last name are required!");
      return;
    }

    try {
      const newHost = VisitorService.createHost({
        FirstName: formData.FirstName.trim(),
        LastName: formData.LastName.trim(),
        Department: formData.Department.trim() || null,
        ContactNumber: formData.ContactNumber.trim() || null
      });
      
      onHostCreated(newHost);
      resetForm();
      setIsAddDialogOpen(false);
    } catch (error) {
      toast.error("Failed to add host. Please try again.");
      console.error('Error adding host:', error);
    }
  };

  const handleEditHost = (host: Host) => {
    setEditingHost(host);
    setFormData({
      FirstName: host.FirstName,
      LastName: host.LastName,
      Department: host.Department || '',
      ContactNumber: host.ContactNumber || ''
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateHost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingHost) return;
    
    if (!formData.FirstName.trim() || !formData.LastName.trim()) {
      toast.error("First name and last name are required!");
      return;
    }

    try {
      const updatedHost: Host = {
        ...editingHost,
        FirstName: formData.FirstName.trim(),
        LastName: formData.LastName.trim(),
        Department: formData.Department.trim() || null,
        ContactNumber: formData.ContactNumber.trim() || null
      };
      
      onHostUpdated(updatedHost);
      resetForm();
      setIsEditDialogOpen(false);
      setEditingHost(null);
    } catch (error) {
      toast.error("Failed to update host. Please try again.");
      console.error('Error updating host:', error);
    }
  };

  const handleDeleteHost = (hostId: number) => {
    if (window.confirm("Are you sure you want to delete this host?")) {
      try {
        onHostDeleted(hostId);
      } catch (error) {
        toast.error("Failed to delete host. Please try again.");
        console.error('Error deleting host:', error);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Add New Host Section */}
      <Card className="bg-white shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-gray-900">Host Management</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Add New Host
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Host</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddHost} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.FirstName}
                      onChange={(e) => handleInputChange('FirstName', e.target.value)}
                      placeholder="Enter first name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.LastName}
                      onChange={(e) => handleInputChange('LastName', e.target.value)}
                      placeholder="Enter last name"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.Department}
                    onChange={(e) => handleInputChange('Department', e.target.value)}
                    placeholder="Enter department"
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.ContactNumber}
                    onChange={(e) => handleInputChange('ContactNumber', e.target.value)}
                    placeholder="Enter contact number"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Add Host</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      resetForm();
                      setIsAddDialogOpen(false);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {/* Existing Hosts Table */}
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Existing Hosts ({hosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {hosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <UserPlus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No hosts registered yet.</p>
              <p className="text-sm">Add your first host to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Contact No</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hosts.map((host) => (
                    <TableRow key={host.HostID}>
                      <TableCell className="font-medium">
                        {VisitorService.getHostFullName(host)}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {host.Department || 'Not specified'}
                        </span>
                      </TableCell>
                      <TableCell>{host.ContactNumber || 'Not provided'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditHost(host)}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteHost(host.HostID)}
                            className="flex items-center gap-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Host Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Host</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateHost} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editFirstName">First Name *</Label>
                <Input
                  id="editFirstName"
                  value={formData.FirstName}
                  onChange={(e) => handleInputChange('FirstName', e.target.value)}
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="editLastName">Last Name *</Label>
                <Input
                  id="editLastName"
                  value={formData.LastName}
                  onChange={(e) => handleInputChange('LastName', e.target.value)}
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="editDepartment">Department</Label>
              <Input
                id="editDepartment"
                value={formData.Department}
                onChange={(e) => handleInputChange('Department', e.target.value)}
                placeholder="Enter department"
              />
            </div>
            <div>
              <Label htmlFor="editContactNumber">Contact Number</Label>
              <Input
                id="editContactNumber"
                value={formData.ContactNumber}
                onChange={(e) => handleInputChange('ContactNumber', e.target.value)}
                placeholder="Enter contact number"
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">Update Host</Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  resetForm();
                  setIsEditDialogOpen(false);
                  setEditingHost(null);
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HostManagement;
