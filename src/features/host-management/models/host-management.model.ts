export interface HostManagementModel {
  HostID: number;
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
  Status: 'Active' | 'Inactive';
  TotalVisits: number;
  ActiveVisits: number;
  CreatedDate: Date;
  LastActiveDate?: Date;
}

export class HostManagementEntity {
  constructor(
    public HostID: number,
    public FirstName: string,
    public LastName: string,
    public Department?: string,
    public ContactNumber?: string,
    public Status: 'Active' | 'Inactive' = 'Active',
    public TotalVisits: number = 0,
    public ActiveVisits: number = 0,
    public CreatedDate: Date = new Date(),
    public LastActiveDate?: Date
  ) {}

  getFullName(): string {
    return `${this.FirstName} ${this.LastName}`;
  }

  isActive(): boolean {
    return this.Status === 'Active';
  }

  isBusy(): boolean {
    return this.ActiveVisits > 0;
  }

  isAvailable(): boolean {
    return this.isActive() && !this.isBusy();
  }

  addVisit(): void {
    this.ActiveVisits += 1;
    this.TotalVisits += 1;
    this.LastActiveDate = new Date();
    this.Status = 'Active';
  }

  removeVisit(): void {
    if (this.ActiveVisits > 0) {
      this.ActiveVisits -= 1;
    }
  }

  activate(): void {
    this.Status = 'Active';
  }

  deactivate(): void {
    this.Status = 'Inactive';
    this.ActiveVisits = 0;
  }

  updateContactInfo(department?: string, contactNumber?: string): void {
    if (department) this.Department = department;
    if (contactNumber) this.ContactNumber = contactNumber;
  }

  getWorkload(): 'Light' | 'Moderate' | 'Heavy' {
    if (this.ActiveVisits === 0) return 'Light';
    if (this.ActiveVisits <= 2) return 'Moderate';
    return 'Heavy';
  }

  toJSON(): HostManagementModel {
    return {
      HostID: this.HostID,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Department: this.Department,
      ContactNumber: this.ContactNumber,
      Status: this.Status,
      TotalVisits: this.TotalVisits,
      ActiveVisits: this.ActiveVisits,
      CreatedDate: this.CreatedDate,
      LastActiveDate: this.LastActiveDate
    };
  }

  static fromJSON(data: HostManagementModel): HostManagementEntity {
    return new HostManagementEntity(
      data.HostID,
      data.FirstName,
      data.LastName,
      data.Department,
      data.ContactNumber,
      data.Status,
      data.TotalVisits,
      data.ActiveVisits,
      data.CreatedDate,
      data.LastActiveDate
    );
  }
}