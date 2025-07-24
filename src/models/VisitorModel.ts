// Visitor Model - Database Entity Definition
export interface VisitorModel {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
  CreatedDate: Date;
}

// Visitor Data Transfer Object (DTO)
export interface CreateVisitorDTO {
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
}

export interface UpdateVisitorDTO {
  FirstName?: string;
  LastName?: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
}

// Visitor Business Logic
export class VisitorEntity {
  constructor(
    public VisitorID: number,
    public FirstName: string,
    public LastName: string,
    public Company?: string,
    public ContactNumber?: string,
    public Email?: string,
    public CreatedDate: Date = new Date()
  ) {}

  // Business methods
  getFullName(): string {
    return `${this.FirstName} ${this.LastName}`;
  }

  hasCompany(): boolean {
    return !!this.Company;
  }

  hasContactInfo(): boolean {
    return !!(this.ContactNumber || this.Email);
  }

  toJSON(): VisitorModel {
    return {
      VisitorID: this.VisitorID,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Company: this.Company,
      ContactNumber: this.ContactNumber,
      Email: this.Email,
      CreatedDate: this.CreatedDate
    };
  }

  static fromJSON(data: VisitorModel): VisitorEntity {
    return new VisitorEntity(
      data.VisitorID,
      data.FirstName,
      data.LastName,
      data.Company,
      data.ContactNumber,
      data.Email,
      data.CreatedDate
    );
  }
}