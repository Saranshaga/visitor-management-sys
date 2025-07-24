import { HostDetails, CreateHostData, UpdateHostData, HostStatistics } from "../types/host-management.types";

export class HostManagementService {
  static async getAllHosts(): Promise<HostDetails[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            HostID: 1,
            FirstName: "Alice",
            LastName: "Wilson",
            Department: "Engineering",
            ContactNumber: "+1234567890",
            totalVisits: 15,
            activeVisits: 1,
            status: "Active"
          },
          {
            HostID: 2,
            FirstName: "David",
            LastName: "Brown",
            Department: "Marketing",
            ContactNumber: "+1987654321",
            totalVisits: 8,
            activeVisits: 0,
            status: "Active"
          },
          {
            HostID: 3,
            FirstName: "Sarah",
            LastName: "Davis",
            Department: "HR",
            ContactNumber: "+1567890123",
            totalVisits: 12,
            activeVisits: 2,
            status: "Active"
          },
          {
            HostID: 4,
            FirstName: "Michael",
            LastName: "Johnson",
            Department: "Sales",
            ContactNumber: "+1234509876",
            totalVisits: 5,
            activeVisits: 0,
            status: "Inactive"
          }
        ]);
      }, 500);
    });
  }

  static async getHostById(id: number): Promise<HostDetails | null> {
    const hosts = await this.getAllHosts();
    return hosts.find(h => h.HostID === id) || null;
  }

  static async createHost(data: CreateHostData): Promise<{ HostID: number; success: boolean }> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          HostID: Math.floor(Math.random() * 1000) + 100,
          success: true
        });
      }, 1000);
    });
  }

  static async updateHost(id: number, data: UpdateHostData): Promise<boolean> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  static async deleteHost(id: number): Promise<boolean> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  static async getHostStatistics(): Promise<HostStatistics> {
    const hosts = await this.getAllHosts();
    
    return {
      totalHosts: hosts.length,
      activeHosts: hosts.filter(h => h.status === 'Active').length,
      busyHosts: hosts.filter(h => h.activeVisits > 0).length,
      availableHosts: hosts.filter(h => h.status === 'Active' && h.activeVisits === 0).length
    };
  }

  static async getHostsByDepartment(department: string): Promise<HostDetails[]> {
    const hosts = await this.getAllHosts();
    if (department === 'all') return hosts;
    return hosts.filter(h => h.Department === department);
  }

  static async getAvailableHosts(): Promise<HostDetails[]> {
    const hosts = await this.getAllHosts();
    return hosts.filter(h => h.status === 'Active' && h.activeVisits === 0);
  }
}