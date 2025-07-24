export interface ReportsModel {
  ReportID: number;
  ReportType: 'Daily' | 'Weekly' | 'Monthly' | 'Custom';
  GeneratedDate: Date;
  DateFrom: Date;
  DateTo: Date;
  TotalVisits: number;
  UniqueVisitors: number;
  Data: string; // JSON string of report data
  CreatedBy?: string;
}

export class ReportsEntity {
  constructor(
    public ReportID: number,
    public ReportType: 'Daily' | 'Weekly' | 'Monthly' | 'Custom',
    public GeneratedDate: Date = new Date(),
    public DateFrom: Date,
    public DateTo: Date,
    public TotalVisits: number = 0,
    public UniqueVisitors: number = 0,
    public Data: string = '{}',
    public CreatedBy?: string
  ) {}

  isValid(): boolean {
    return this.DateFrom <= this.DateTo && this.TotalVisits >= 0 && this.UniqueVisitors >= 0;
  }

  getDuration(): string {
    const diffMs = this.DateTo.getTime() - this.DateFrom.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    if (days === 1) return '1 day';
    if (days <= 7) return `${days} days`;
    if (days <= 30) return `${Math.ceil(days / 7)} weeks`;
    return `${Math.ceil(days / 30)} months`;
  }

  getAverageVisitsPerDay(): number {
    const diffMs = this.DateTo.getTime() - this.DateFrom.getTime();
    const days = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    return Number((this.TotalVisits / days).toFixed(2));
  }

  getUniqueVisitorRatio(): number {
    if (this.TotalVisits === 0) return 0;
    return Number((this.UniqueVisitors / this.TotalVisits * 100).toFixed(2));
  }

  updateData(data: any): void {
    this.Data = JSON.stringify(data);
  }

  getData(): any {
    try {
      return JSON.parse(this.Data);
    } catch {
      return {};
    }
  }

  toJSON(): ReportsModel {
    return {
      ReportID: this.ReportID,
      ReportType: this.ReportType,
      GeneratedDate: this.GeneratedDate,
      DateFrom: this.DateFrom,
      DateTo: this.DateTo,
      TotalVisits: this.TotalVisits,
      UniqueVisitors: this.UniqueVisitors,
      Data: this.Data,
      CreatedBy: this.CreatedBy
    };
  }

  static fromJSON(data: ReportsModel): ReportsEntity {
    return new ReportsEntity(
      data.ReportID,
      data.ReportType,
      data.GeneratedDate,
      data.DateFrom,
      data.DateTo,
      data.TotalVisits,
      data.UniqueVisitors,
      data.Data,
      data.CreatedBy
    );
  }
}