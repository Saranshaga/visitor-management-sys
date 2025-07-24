export interface VisitorDetails {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
  CreatedDate: Date;
  totalVisits: number;
  lastVisitDate?: Date;
  currentStatus: 'Active' | 'Inactive';
}

export interface VisitorFilter {
  status: 'all' | 'active' | 'inactive';
  company: string;
  dateRange: 'all' | 'today' | 'week' | 'month';
}

export interface VisitorUpdateData {
  FirstName?: string;
  LastName?: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
}

export interface VisitorStatistics {
  totalVisitors: number;
  activeVisitors: number;
  newVisitorsToday: number;
  frequentVisitors: number;
}