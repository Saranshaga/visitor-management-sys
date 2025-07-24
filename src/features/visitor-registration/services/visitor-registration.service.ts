import { CreateVisitorDTO, VisitorRegistrationResponse } from "../types/visitor-registration.types";

export class VisitorRegistrationService {
  static async registerVisitor(visitorData: CreateVisitorDTO): Promise<VisitorRegistrationResponse> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          VisitorID: Math.floor(Math.random() * 1000) + 1,
          message: "Visitor registered successfully",
          success: true
        });
      }, 1000);
    });
  }

  static async validateVisitorData(data: CreateVisitorDTO): Promise<boolean> {
    return data.FirstName.trim() !== "" && data.LastName.trim() !== "";
  }
}