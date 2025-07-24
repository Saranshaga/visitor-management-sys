export interface VisitorRegistrationModel {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
  CreatedDate: Date;
  Status: 'Active' | 'Inactive';
}

export class VisitorRegistrationEntity {
  constructor(
    public VisitorID: number,
    public FirstName: string,
    public LastName: string,
    public Company?: string,
    public ContactNumber?: string,
    public Email?: string,
    public CreatedDate: Date = new Date(),
    public Status: 'Active' | 'Inactive' = 'Active'
  ) {}

  getFullName(): string {
    return `${this.FirstName} ${this.LastName}`;
  }

  hasCompany(): boolean {
    return !!this.Company;
  }

  hasContactInfo(): boolean {
    return !!(this.ContactNumber || this.Email);
  }

  toJSON(): VisitorRegistrationModel {
    return {
      VisitorID: this.VisitorID,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Company: this.Company,
      ContactNumber: this.ContactNumber,
      Email: this.Email,
      CreatedDate: this.CreatedDate,
      Status: this.Status
    };
  }
}