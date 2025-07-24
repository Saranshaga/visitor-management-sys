import { DashboardStats, ActiveVisit, RecentActivity, SystemAlert, SystemMetrics } from "../types/admin-dashboard.types";

export class AdminDashboardService {
  static async getDashboardStats(): Promise<DashboardStats> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalVisitorsToday: 24,
          currentlyCheckedIn: 8,
          averageDuration: "1h 32m",
          maxCapacity: 50,
          growthRate: 15.3,
          departmentDistribution: [
            { name: "Engineering", visits: 12 },
            { name: "Marketing", visits: 6 },
            { name: "HR", visits: 4 },
            { name: "Sales", visits: 2 }
          ],
          hourlyTrend: [
            { hour: "9 AM", visits: 3 },
            { hour: "10 AM", visits: 7 },
            { hour: "11 AM", visits: 5 },
            { hour: "12 PM", visits: 2 },
            { hour: "1 PM", visits: 1 },
            { hour: "2 PM", visits: 4 },
            { hour: "3 PM", visits: 2 }
          ]
        });
      }, 500);
    });
  }

  static async getActiveVisits(): Promise<ActiveVisit[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            VisitID: 1,
            visitorName: "John Doe",
            hostName: "Alice Wilson",
            purpose: "Meeting",
            checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            duration: "2h 15m",
            company: "Tech Corp"
          },
          {
            VisitID: 2,
            visitorName: "Jane Smith",
            hostName: "David Brown",
            purpose: "Interview",
            checkInTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
            duration: "45m",
            company: "Design Studio"
          },
          {
            VisitID: 3,
            visitorName: "Bob Johnson",
            hostName: "Sarah Davis",
            purpose: "Delivery",
            checkInTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
            duration: "15m",
            company: "Logistics Inc"
          }
        ]);
      }, 500);
    });
  }

  static async getRecentActivity(): Promise<RecentActivity[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            type: "check-in",
            description: "John Doe checked in to visit Alice Wilson",
            timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
            userId: 1
          },
          {
            id: 2,
            type: "check-out",
            description: "Jane Smith checked out after 1h 30m visit",
            timestamp: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
            userId: 2
          },
          {
            id: 3,
            type: "registration",
            description: "New visitor Bob Johnson registered",
            timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
            userId: 3
          },
          {
            id: 4,
            type: "system",
            description: "Daily backup completed successfully",
            timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
          },
          {
            id: 5,
            type: "check-in",
            description: "Sarah Connor checked in to visit Tech Department",
            timestamp: new Date(Date.now() - 90 * 60 * 1000), // 1.5 hours ago
            userId: 4
          }
        ]);
      }, 500);
    });
  }

  static async getSystemAlerts(): Promise<SystemAlert[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            type: "warning",
            title: "High Visitor Volume",
            message: "Current visitor count is approaching daily capacity limit",
            timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
            resolved: false
          }
        ]);
      }, 500);
    });
  }

  static async executeQuickAction(action: string): Promise<boolean> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Executing quick action: ${action}`);
        resolve(true);
      }, 1000);
    });
  }

  static async getSystemMetrics(): Promise<SystemMetrics> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          uptime: "5 days, 12 hours",
          memoryUsage: 68.5,
          cpuUsage: 15.2,
          diskSpace: 82.1,
          lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
        });
      }, 500);
    });
  }

  static async refreshDashboard(): Promise<void> {
    // Mock implementation - force refresh all dashboard data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}