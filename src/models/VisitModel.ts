// Visit Model - Database Entity Definition
export interface VisitModel {
  VisitID: number;
  VisitorID: number;
  HostID: number;
  Purpose: string;
  CheckInTime: Date;
  CheckOutTime?: Date;
  Status: 'Checked In' | 'Checked Out';
}

// Visit Data Transfer Object (DTO)
export interface CreateVisitDTO {
  VisitorID: number;
  HostID: number;
  Purpose: string;
}

export interface UpdateVisitDTO {
  Purpose?: string;
  CheckOutTime?: Date;
  Status?: 'Checked In' | 'Checked Out';
}

// Visit Business Logic
export class VisitEntity {
  constructor(
    public VisitID: number,
    public VisitorID: number,
    public HostID: number,
    public Purpose: string,
    public CheckInTime: Date = new Date(),
    public CheckOutTime?: Date,
    public Status: 'Checked In' | 'Checked Out' = 'Checked In'
  ) {}

  // Business methods
  isActive(): boolean {
    return this.Status === 'Checked In' && !this.CheckOutTime;
  }

  checkOut(): void {
    this.CheckOutTime = new Date();
    this.Status = 'Checked Out';
  }

  getDuration(): string {
    if (!this.CheckOutTime) return 'Active';
    
    const diffMs = this.CheckOutTime.getTime() - this.CheckInTime.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  isToday(): boolean {
    const today = new Date();
    const checkInDate = new Date(this.CheckInTime);
    return checkInDate.toDateString() === today.toDateString();
  }

  toJSON(): VisitModel {
    return {
      VisitID: this.VisitID,
      VisitorID: this.VisitorID,
      HostID: this.HostID,
      Purpose: this.Purpose,
      CheckInTime: this.CheckInTime,
      CheckOutTime: this.CheckOutTime,
      Status: this.Status
    };
  }

  static fromJSON(data: VisitModel): VisitEntity {
    return new VisitEntity(
      data.VisitID,
      data.VisitorID,
      data.HostID,
      data.Purpose,
      data.CheckInTime,
      data.CheckOutTime,
      data.Status
    );
  }
}