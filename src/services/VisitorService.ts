import { Visitor, Host, Visit, VisitPurpose } from '@/types/vms';

class VisitorServiceClass {
  private visitors: Visitor[] = [
    {
      VisitorID: 1,
      FirstName: 'John',
      LastName: 'Doe',
      Company: 'Tech Corp',
      ContactNumber: '+1-555-0123',
      Email: 'john.doe@techcorp.com',
      CreatedDate: new Date('2024-06-29')
    },
    {
      VisitorID: 2,
      FirstName: 'Jane',
      LastName: 'Smith',
      Company: 'Design Studios',
      ContactNumber: '+1-555-0124',
      Email: 'jane.smith@designstudios.com',
      CreatedDate: new Date('2024-06-29')
    },
    {
      VisitorID: 3,
      FirstName: 'Mike',
      LastName: 'Johnson',
      Company: null,
      ContactNumber: '+1-555-0125',
      Email: 'mike.johnson@email.com',
      CreatedDate: new Date('2024-06-30')
    }
  ];

  private hosts: Host[] = [
    {
      HostID: 1,
      FirstName: 'Sarah',
      LastName: 'Wilson',
      Department: 'Human Resources',
      ContactNumber: '+1-555-1001'
    },
    {
      HostID: 2,
      FirstName: 'David',
      LastName: 'Brown',
      Department: 'Engineering',
      ContactNumber: '+1-555-1002'
    },
    {
      HostID: 3,
      FirstName: 'Emily',
      LastName: 'Davis',
      Department: 'Marketing',
      ContactNumber: '+1-555-1003'
    },
    {
      HostID: 4,
      FirstName: 'Robert',
      LastName: 'Miller',
      Department: 'Sales',
      ContactNumber: '+1-555-1004'
    }
  ];

  private visits: Visit[] = [
    {
      VisitID: 1,
      VisitorID: 1,
      HostID: 1,
      Purpose: 'Interview',
      CheckInTime: new Date('2024-06-30T09:00:00'),
      CheckOutTime: new Date('2024-06-30T10:30:00'),
      Status: 'Checked Out'
    },
    {
      VisitID: 2,
      VisitorID: 2,
      HostID: 2,
      Purpose: 'Meeting',
      CheckInTime: new Date('2024-06-30T14:00:00'),
      CheckOutTime: null,
      Status: 'Checked In'
    },
    {
      VisitID: 3,
      VisitorID: 3,
      HostID: 3,
      Purpose: 'Delivery',
      CheckInTime: new Date('2024-06-30T11:00:00'),
      CheckOutTime: new Date('2024-06-30T11:15:00'),
      Status: 'Checked Out'
    }
  ];

  private nextVisitorId = 4;
  private nextHostId = 5;
  private nextVisitId = 4;

  // Visitor methods
  getAllVisitors(): Visitor[] {
    return [...this.visitors];
  }

  getVisitorById(id: number): Visitor | undefined {
    return this.visitors.find(v => v.VisitorID === id);
  }

  createVisitor(visitorData: Omit<Visitor, 'VisitorID' | 'CreatedDate'>): Visitor {
    const newVisitor: Visitor = {
      ...visitorData,
      VisitorID: this.nextVisitorId++,
      CreatedDate: new Date()
    };
    this.visitors.push(newVisitor);
    return newVisitor;
  }

  searchVisitors(query: string): Visitor[] {
    const lowerQuery = query.toLowerCase();
    return this.visitors.filter(visitor =>
      visitor.FirstName.toLowerCase().includes(lowerQuery) ||
      visitor.LastName.toLowerCase().includes(lowerQuery) ||
      visitor.Email?.toLowerCase().includes(lowerQuery) ||
      visitor.ContactNumber?.includes(query) ||
      visitor.Company?.toLowerCase().includes(lowerQuery)
    );
  }

  // Host methods
  getAllHosts(): Host[] {
    return [...this.hosts];
  }

  getHostById(id: number): Host | undefined {
    return this.hosts.find(h => h.HostID === id);
  }

  createHost(hostData: Omit<Host, 'HostID'>): Host {
    const newHost: Host = {
      ...hostData,
      HostID: this.nextHostId++
    };
    this.hosts.push(newHost);
    return newHost;
  }

  updateHost(hostId: number, updates: Partial<Omit<Host, 'HostID'>>): Host | null {
    const hostIndex = this.hosts.findIndex(h => h.HostID === hostId);
    if (hostIndex === -1) return null;

    this.hosts[hostIndex] = { ...this.hosts[hostIndex], ...updates };
    return this.hosts[hostIndex];
  }

  deleteHost(hostId: number): boolean {
    const hostIndex = this.hosts.findIndex(h => h.HostID === hostId);
    if (hostIndex === -1) return false;

    // Check if host has any active visits
    const activeVisits = this.visits.filter(v => v.HostID === hostId && v.Status === 'Checked In');
    if (activeVisits.length > 0) {
      throw new Error('Cannot delete host with active visits');
    }

    this.hosts.splice(hostIndex, 1);
    return true;
  }

  // Visit methods
  getAllVisits(): Visit[] {
    return [...this.visits];
  }

  getVisitById(id: number): Visit | undefined {
    return this.visits.find(v => v.VisitID === id);
  }

  getVisitsByVisitor(visitorId: number): Visit[] {
    return this.visits.filter(v => v.VisitorID === visitorId);
  }

  getActiveVisits(): Visit[] {
    return this.visits.filter(v => v.Status === 'Checked In');
  }

  getTodaysVisits(): Visit[] {
    const today = new Date().toDateString();
    return this.visits.filter(visit =>
      new Date(visit.CheckInTime).toDateString() === today
    );
  }

  createVisit(visitData: Omit<Visit, 'VisitID' | 'CheckInTime' | 'Status'>): Visit {
    const newVisit: Visit = {
      ...visitData,
      VisitID: this.nextVisitId++,
      CheckInTime: new Date(),
      Status: 'Checked In'
    };
    this.visits.push(newVisit);
    return newVisit;
  }

  updateVisit(visitId: number, updates: Partial<Visit>): Visit | null {
    const visitIndex = this.visits.findIndex(v => v.VisitID === visitId);
    if (visitIndex === -1) return null;

    this.visits[visitIndex] = { ...this.visits[visitIndex], ...updates };
    return this.visits[visitIndex];
  }

  checkOutVisit(visitId: number): Visit | null {
    return this.updateVisit(visitId, {
      CheckOutTime: new Date(),
      Status: 'Checked Out'
    });
  }

  // Utility methods
  calculateDuration(checkInTime: Date, checkOutTime: Date | null): string {
    if (!checkOutTime) return 'Active';
    
    const diffMs = checkOutTime.getTime() - checkInTime.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  }

  getVisitorFullName(visitor: Visitor): string {
    return `${visitor.FirstName} ${visitor.LastName}`;
  }

  getHostFullName(host: Host): string {
    return `${host.FirstName} ${host.LastName}`;
  }
}

export const VisitorService = new VisitorServiceClass();
