export interface VisitorManagementModel {
  VisitorID: number;
  FirstName: string;
  LastName: string;
  Company?: string;
  ContactNumber?: string;
  Email?: string;
  CreatedDate: Date;
  Status: 'Active' | 'Inactive';
  TotalVisits: number;
  LastVisitDate?: Date;
}

export class VisitorManagementEntity {
  constructor(
    public VisitorID: number,
    public FirstName: string,
    public LastName: string,
    public Company?: string,
    public ContactNumber?: string,
    public Email?: string,
    public CreatedDate: Date = new Date(),
    public Status: 'Active' | 'Inactive' = 'Active',
    public TotalVisits: number = 0,
    public LastVisitDate?: Date
  ) {}

  getFullName(): string {
    return `${this.FirstName} ${this.LastName}`;
  }

  isActive(): boolean {
    return this.Status === 'Active';
  }

  hasVisited(): boolean {
    return this.TotalVisits > 0;
  }

  isFrequentVisitor(): boolean {
    return this.TotalVisits >= 5;
  }

  incrementVisitCount(): void {
    this.TotalVisits += 1;
    this.LastVisitDate = new Date();
    this.Status = 'Active';
  }

  deactivate(): void {
    this.Status = 'Inactive';
  }

  activate(): void {
    this.Status = 'Active';
  }

  updateContactInfo(phone?: string, email?: string): void {
    if (phone) this.ContactNumber = phone;
    if (email) this.Email = email;
  }

  toJSON(): VisitorManagementModel {
    return {
      VisitorID: this.VisitorID,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Company: this.Company,
      ContactNumber: this.ContactNumber,
      Email: this.Email,
      CreatedDate: this.CreatedDate,
      Status: this.Status,
      TotalVisits: this.TotalVisits,
      LastVisitDate: this.LastVisitDate
    };
  }

  static fromJSON(data: VisitorManagementModel): VisitorManagementEntity {
    return new VisitorManagementEntity(
      data.VisitorID,
      data.FirstName,
      data.LastName,
      data.Company,
      data.ContactNumber,
      data.Email,
      data.CreatedDate,
      data.Status,
      data.TotalVisits,
      data.LastVisitDate
    );
  }
}