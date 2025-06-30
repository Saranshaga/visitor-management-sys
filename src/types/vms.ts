
// Database schema types based on the provided structure

export interface Visitor {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company: string | null;
  ContactNumber: string | null;
  Email: string | null;
  CreatedDate: Date;
}

export interface Host {
  HostID: number;
  FirstName: string;
  LastName: string;
  Department: string | null;
  ContactNumber: string | null;
}

export interface Visit {
  VisitID: number;
  VisitorID: number;
  HostID: number;
  Purpose: string;
  CheckInTime: Date;
  CheckOutTime: Date | null;
  Status: 'Checked In' | 'Checked Out';
}

// Extended types for UI purposes
export interface VisitorWithVisits extends Visitor {
  currentVisit?: Visit;
  totalVisits: number;
}

export interface VisitWithDetails extends Visit {
  visitor: Visitor;
  host: Host;
  duration?: string;
}

export type VisitStatus = 'Checked In' | 'Checked Out';
export type VisitPurpose = 'Meeting' | 'Delivery' | 'Interview' | 'Job Recruitment' | 'Other';
