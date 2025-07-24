export interface CheckInOutModel {
  VisitID: number;
  VisitorID: number;
  HostID: number;
  Purpose: string;
  CheckInTime: Date;
  CheckOutTime?: Date;
  Status: 'Checked In' | 'Checked Out';
  Duration?: string;
}

export class CheckInOutEntity {
  constructor(
    public VisitID: number,
    public VisitorID: number,
    public HostID: number,
    public Purpose: string,
    public CheckInTime: Date = new Date(),
    public CheckOutTime?: Date,
    public Status: 'Checked In' | 'Checked Out' = 'Checked In'
  ) {}

  checkOut(): void {
    this.CheckOutTime = new Date();
    this.Status = 'Checked Out';
  }

  isActive(): boolean {
    return this.Status === 'Checked In' && !this.CheckOutTime;
  }

  getDuration(): string {
    if (!this.CheckOutTime) {
      const now = new Date();
      const diffMs = now.getTime() - this.CheckInTime.getTime();
      return this.formatDuration(diffMs);
    }
    
    const diffMs = this.CheckOutTime.getTime() - this.CheckInTime.getTime();
    return this.formatDuration(diffMs);
  }

  private formatDuration(diffMs: number): string {
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  toJSON(): CheckInOutModel {
    return {
      VisitID: this.VisitID,
      VisitorID: this.VisitorID,
      HostID: this.HostID,
      Purpose: this.Purpose,
      CheckInTime: this.CheckInTime,
      CheckOutTime: this.CheckOutTime,
      Status: this.Status,
      Duration: this.getDuration()
    };
  }
}