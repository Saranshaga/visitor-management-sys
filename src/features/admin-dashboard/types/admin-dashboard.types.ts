export interface DashboardStats {
  totalVisitorsToday: number;
  currentlyCheckedIn: number;
  averageDuration: string;
  maxCapacity: number;
  growthRate: number;
  departmentDistribution: { name: string; visits: number }[];
  hourlyTrend: { hour: string; visits: number }[];
}

export interface ActiveVisit {
  VisitID: number;
  visitorName: string;
  hostName: string;
  purpose: string;
  checkInTime: Date;
  duration: string;
  company?: string;
}

export interface RecentActivity {
  id: number;
  type: 'check-in' | 'check-out' | 'registration' | 'system';
  description: string;
  timestamp: Date;
  userId?: number;
  metadata?: any;
}

export interface SystemAlert {
  id: number;
  type: 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface SystemMetrics {
  uptime: string;
  memoryUsage: number;
  cpuUsage: number;
  diskSpace: number;
  lastBackup: Date;
}