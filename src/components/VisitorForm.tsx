
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { VisitorService } from '@/services/VisitorService';
import { Visitor, Host, Visit, VisitPurpose } from '@/types/vms';

interface VisitorFormProps {
  hosts: Host[];
  onVisitorRegistered: (visitor: Visitor) => void;
  onVisitCreated: (visit: Visit) => void;
}

const VisitorForm: React.FC<VisitorFormProps> = ({ hosts, onVisitorRegistered, onVisitCreated }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    contactNumber: '',
    email: '',
    hostId: '',
    purpose: '' as VisitPurpose | ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create visitor
      const visitor = VisitorService.createVisitor({
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Company: formData.company || null,
        ContactNumber: formData.contactNumber || null,
        Email: formData.email || null
      });

      // Create visit
      const visit = VisitorService.createVisit({
        VisitorID: visitor.VisitorID,
        HostID: parseInt(formData.hostId),
        Purpose: formData.purpose,
        CheckOutTime: null
      });

      onVisitorRegistered(visitor);
      onVisitCreated(visit);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        company: '',
        contactNumber: '',
        email: '',
        hostId: '',
        purpose: ''
      });
    } catch (error) {
      console.error('Error registering visitor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const purposeOptions: VisitPurpose[] = ['Meeting', 'Delivery', 'Interview', 'Job Recruitment', 'Other'];

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Register New Visitor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="host">Host *</Label>
            <Select
              value={formData.hostId}
              onValueChange={(value) => setFormData(prev => ({ ...prev, hostId: value }))}
              required
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a host" />
              </SelectTrigger>
              <SelectContent>
                {hosts.map(host => (
                  <SelectItem key={host.HostID} value={host.HostID.toString()}>
                    {VisitorService.getHostFullName(host)} - {host.Department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="purpose">Purpose *</Label>
            <Select
              value={formData.purpose}
              onValueChange={(value: VisitPurpose) => setFormData(prev => ({ ...prev, purpose: value }))}
              required
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select purpose of visit" />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map(purpose => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register Visitor'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisitorForm;
