import { CheckInData, CheckOutData, ActiveVisit, CheckInResponse, CheckOutResponse } from "../types/check-in-out.types";

export class CheckInOutService {
  static async checkIn(data: CheckInData): Promise<CheckInResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          VisitID: Math.floor(Math.random() * 1000) + 1,
          success: true,
          message: "Visitor checked in successfully"
        });
      }, 1000);
    });
  }

  static async checkOut(visitId: number): Promise<CheckOutResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Visitor checked out successfully",
          duration: "2h 15m"
        });
      }, 1000);
    });
  }

  static async getActiveVisits(): Promise<ActiveVisit[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            VisitID: 1,
            VisitorID: 1,
            HostID: 1,
            visitorName: "John Doe",
            hostName: "Alice Wilson",
            company: "Tech Corp",
            Purpose: "Business Meeting",
            CheckInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            duration: "2h 15m",
            Status: "Checked In"
          },
          {
            VisitID: 2,
            VisitorID: 2,
            HostID: 2,
            visitorName: "Jane Smith",
            hostName: "David Brown",
            company: "Design Studio",
            Purpose: "Interview",
            CheckInTime: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
            duration: "45m",
            Status: "Checked In"
          }
        ]);
      }, 500);
    });
  }

  static async getVisitHistory(visitorId?: number): Promise<ActiveVisit[]> {
    // Mock implementation for visit history
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  }
}