import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Building2, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { CreateVisitorDTO } from "../types/visitor-registration.types";
import { VisitorRegistrationService } from "../services/visitor-registration.service";

interface VisitorRegistrationFormProps {
  onSuccess?: () => void;
}

export const VisitorRegistrationForm = ({ onSuccess }: VisitorRegistrationFormProps) => {
  const [formData, setFormData] = useState<CreateVisitorDTO>({
    FirstName: "",
    LastName: "",
    Company: "",
    ContactNumber: "",
    Email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await VisitorRegistrationService.registerVisitor(formData);
      toast.success("Visitor registered successfully!");
      setFormData({
        FirstName: "",
        LastName: "",
        Company: "",
        ContactNumber: "",
        Email: "",
      });
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to register visitor");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          <CardTitle>Register New Visitor</CardTitle>
        </div>
        <CardDescription>
          Please fill in the visitor information below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.FirstName}
                onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.LastName}
                onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Company
            </Label>
            <Input
              id="company"
              value={formData.Company}
              onChange={(e) => setFormData({ ...formData, Company: e.target.value })}
              placeholder="Enter company name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Number
              </Label>
              <Input
                id="phone"
                value={formData.ContactNumber}
                onChange={(e) => setFormData({ ...formData, ContactNumber: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Register Visitor
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};