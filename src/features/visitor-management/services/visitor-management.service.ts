import { VisitorDetails, VisitorUpdateData, VisitorStatistics } from "../types/visitor-management.types";

export class VisitorManagementService {
  static async getAllVisitors(): Promise<VisitorDetails[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            VisitorID: 1,
            FirstName: "John",
            LastName: "Doe",
            Company: "Tech Corp",
            ContactNumber: "+1234567890",
            Email: "john.doe@techcorp.com",
            CreatedDate: new Date("2024-01-15"),
            totalVisits: 8,
            lastVisitDate: new Date("2024-07-20"),
            currentStatus: "Active"
          },
          {
            VisitorID: 2,
            FirstName: "Jane",
            LastName: "Smith",
            Company: "Design Studio",
            ContactNumber: "+1987654321",
            Email: "jane.smith@design.com",
            CreatedDate: new Date("2024-02-10"),
            totalVisits: 3,
            lastVisitDate: new Date("2024-07-18"),
            currentStatus: "Active"
          },
          {
            VisitorID: 3,
            FirstName: "Bob",
            LastName: "Johnson",
            Company: "Marketing Inc",
            ContactNumber: "+1567890123",
            Email: "bob.johnson@marketing.com",
            CreatedDate: new Date("2024-03-05"),
            totalVisits: 0,
            currentStatus: "Inactive"
          }
        ]);
      }, 500);
    });
  }

  static async getVisitorById(id: number): Promise<VisitorDetails | null> {
    const visitors = await this.getAllVisitors();
    return visitors.find(v => v.VisitorID === id) || null;
  }

  static async updateVisitor(id: number, data: VisitorUpdateData): Promise<boolean> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  static async deleteVisitor(id: number): Promise<boolean> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }

  static async getVisitorStatistics(): Promise<VisitorStatistics> {
    const visitors = await this.getAllVisitors();
    
    return {
      totalVisitors: visitors.length,
      activeVisitors: visitors.filter(v => v.currentStatus === 'Active').length,
      newVisitorsToday: visitors.filter(v => {
        const today = new Date().toDateString();
        return v.CreatedDate.toDateString() === today;
      }).length,
      frequentVisitors: visitors.filter(v => v.totalVisits >= 5).length
    };
  }

  static async searchVisitors(query: string): Promise<VisitorDetails[]> {
    const visitors = await this.getAllVisitors();
    return visitors.filter(visitor =>
      visitor.FirstName.toLowerCase().includes(query.toLowerCase()) ||
      visitor.LastName.toLowerCase().includes(query.toLowerCase()) ||
      visitor.Email?.toLowerCase().includes(query.toLowerCase()) ||
      visitor.Company?.toLowerCase().includes(query.toLowerCase())
    );
  }
}