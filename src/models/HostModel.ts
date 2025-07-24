// Host Model - Database Entity Definition
export interface HostModel {
  HostID: number;
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
}

// Host Data Transfer Object (DTO)
export interface CreateHostDTO {
  FirstName: string;
  LastName: string;
  Department?: string;
  ContactNumber?: string;
}

export interface UpdateHostDTO {
  FirstName?: string;
  LastName?: string;
  Department?: string;
  ContactNumber?: string;
}

// Host Business Logic
export class HostEntity {
  constructor(
    public HostID: number,
    public FirstName: string,
    public LastName: string,
    public Department?: string,
    public ContactNumber?: string
  ) {}

  // Business methods
  getFullName(): string {
    return `${this.FirstName} ${this.LastName}`;
  }

  hasDepartment(): boolean {
    return !!this.Department;
  }

  hasContactNumber(): boolean {
    return !!this.ContactNumber;
  }

  toJSON(): HostModel {
    return {
      HostID: this.HostID,
      FirstName: this.FirstName,
      LastName: this.LastName,
      Department: this.Department,
      ContactNumber: this.ContactNumber
    };
  }

  static fromJSON(data: HostModel): HostEntity {
    return new HostEntity(
      data.HostID,
      data.FirstName,
      data.LastName,
      data.Department,
      data.ContactNumber
    );
  }
}