// Central database models that match SQL schema

export interface Visitor {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
  CreatedDate: Date;
}

export interface Host {
  HostID: number;
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
}

export interface Visit {
  VisitID: number;
  VisitorID: number;
  HostID: number;
  Purpose: string;
  CheckInTime: Date;
  CheckOutTime?: Date;
  Status: 'Checked In' | 'Checked Out';
}

// Extended models with relationships
export interface VisitorWithVisits extends Visitor {
  visits: Visit[];
  currentVisit?: Visit;
  totalVisits: number;
  lastVisitDate?: Date;
}

export interface HostWithVisits extends Host {
  visits: Visit[];
  activeVisits: Visit[];
  totalVisits: number;
}

export interface VisitWithDetails extends Visit {
  visitor: Visitor;
  host: Host;
  duration?: string;
}

// Data Transfer Objects (DTOs)
export interface CreateVisitorDTO {
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
}

export interface UpdateVisitorDTO {
  FirstName?: string;
  LastName?: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
}

export interface CreateHostDTO {
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
}

export interface UpdateHostDTO {
  FirstName?: string;
  LastName?: string;
  Department?: string;
  ContactNumber?: string;
}

export interface CreateVisitDTO {
  VisitorID: number;
  HostID: number;
  Purpose: string;
}

export interface UpdateVisitDTO {
  Purpose?: string;
  CheckOutTime?: Date;
  Status?: 'Checked In' | 'Checked Out';
}

// Database utility types
export type VisitStatus = 'Checked In' | 'Checked Out';
export type SortOrder = 'asc' | 'desc';

export interface DatabaseFilter {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
}

export interface VisitorFilter extends DatabaseFilter {
  company?: string;
  hasVisits?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
}

export interface HostFilter extends DatabaseFilter {
  department?: string;
  isActive?: boolean;
}

export interface VisitFilter extends DatabaseFilter {
  status?: VisitStatus;
  visitorId?: number;
  hostId?: number;
  dateFrom?: Date;
  dateTo?: Date;
  purpose?: string;
}