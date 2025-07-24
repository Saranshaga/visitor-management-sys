export interface VisitReport {
  VisitID: number;
  visitorName: string;
  hostName: string;
  department: string;
  company: string;
  purpose: string;
  checkInTime: Date;
  checkOutTime?: Date;
  duration: string;
  status: 'Checked In' | 'Checked Out';
}

export interface ReportFilter {
  period: 'today' | 'week' | 'month' | 'year';
  reportType: 'visits' | 'visitors' | 'hosts';
  department: string;
}

export interface ReportStatistics {
  totalVisits: number;
  uniqueVisitors: number;
  averageDuration: string;
  peakHour: string;
  growthRate: number;
  departmentBreakdown: { department: string; count: number }[];
}

export interface ChartData {
  visitsTrend: { date: string; visits: number }[];
  departmentDistribution: { name: string; visits: number }[];
  hourlyDistribution: { hour: string; visits: number }[];
  topHosts: { name: string; visits: number }[];
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface ExportOptions {
  format: 'pdf' | 'excel' | 'csv';
  includeCharts: boolean;
  dateRange?: DateRange;
}