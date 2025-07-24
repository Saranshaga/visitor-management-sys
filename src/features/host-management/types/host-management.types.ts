export interface HostDetails {
  HostID: number;
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
  totalVisits: number;
  activeVisits: number;
  status: 'Active' | 'Inactive';
}

export interface CreateHostData {
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
}

export interface UpdateHostData {
  FirstName?: string;
  LastName?: string;
  Department?: string;
  ContactNumber?: string;
}

export interface HostStatistics {
  totalHosts: number;
  activeHosts: number;
  busyHosts: number;
  availableHosts: number;
}

export interface HostFilter {
  department: string;
  status: 'all' | 'active' | 'inactive';
  availability: 'all' | 'available' | 'busy';
}