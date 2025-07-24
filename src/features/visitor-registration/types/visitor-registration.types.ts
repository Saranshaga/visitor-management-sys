export interface CreateVisitorDTO {
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
}

export interface VisitorRegistrationResponse {
  VisitorID: number;
  message: string;
  success: boolean;
}