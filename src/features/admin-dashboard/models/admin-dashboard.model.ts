export interface AdminDashboardModel {
  DashboardID: number;
  LastUpdated: Date;
  TotalVisitors: number;
  ActiveVisits: number;
  SystemStatus: 'Operational' | 'Warning' | 'Error';
  Metrics: string; // JSON string of dashboard metrics
  Alerts: string; // JSON string of active alerts
}

export class AdminDashboardEntity {
  constructor(
    public DashboardID: number,
    public LastUpdated: Date = new Date(),
    public TotalVisitors: number = 0,
    public ActiveVisits: number = 0,
    public SystemStatus: 'Operational' | 'Warning' | 'Error' = 'Operational',
    public Metrics: string = '{}',
    public Alerts: string = '[]'
  ) {}

  isHealthy(): boolean {
    return this.SystemStatus === 'Operational';
  }

  hasAlerts(): boolean {
    try {
      const alerts = JSON.parse(this.Alerts);
      return Array.isArray(alerts) && alerts.length > 0;
    } catch {
      return false;
    }
  }

  getActiveAlerts(): any[] {
    try {
      const alerts = JSON.parse(this.Alerts);
      return Array.isArray(alerts) ? alerts.filter(alert => !alert.resolved) : [];
    } catch {
      return [];
    }
  }

  updateMetrics(metrics: any): void {
    this.Metrics = JSON.stringify(metrics);
    this.LastUpdated = new Date();
  }

  addAlert(alert: any): void {
    try {
      const alerts = JSON.parse(this.Alerts);
      alerts.push({ ...alert, id: Date.now(), timestamp: new Date() });
      this.Alerts = JSON.stringify(alerts);
    } catch {
      this.Alerts = JSON.stringify([alert]);
    }
  }

  resolveAlert(alertId: number): void {
    try {
      const alerts = JSON.parse(this.Alerts);
      const updated = alerts.map((alert: any) => 
        alert.id === alertId ? { ...alert, resolved: true } : alert
      );
      this.Alerts = JSON.stringify(updated);
    } catch {
      // Handle error silently
    }
  }

  getMetrics(): any {
    try {
      return JSON.parse(this.Metrics);
    } catch {
      return {};
    }
  }

  updateSystemStatus(): void {
    const activeAlerts = this.getActiveAlerts();
    const errorAlerts = activeAlerts.filter(alert => alert.type === 'error');
    const warningAlerts = activeAlerts.filter(alert => alert.type === 'warning');

    if (errorAlerts.length > 0) {
      this.SystemStatus = 'Error';
    } else if (warningAlerts.length > 0) {
      this.SystemStatus = 'Warning';
    } else {
      this.SystemStatus = 'Operational';
    }
  }

  getVisitorCapacityRatio(): number {
    const metrics = this.getMetrics();
    const maxCapacity = metrics.maxCapacity || 100;
    return Number((this.ActiveVisits / maxCapacity * 100).toFixed(2));
  }

  toJSON(): AdminDashboardModel {
    return {
      DashboardID: this.DashboardID,
      LastUpdated: this.LastUpdated,
      TotalVisitors: this.TotalVisitors,
      ActiveVisits: this.ActiveVisits,
      SystemStatus: this.SystemStatus,
      Metrics: this.Metrics,
      Alerts: this.Alerts
    };
  }

  static fromJSON(data: AdminDashboardModel): AdminDashboardEntity {
    return new AdminDashboardEntity(
      data.DashboardID,
      data.LastUpdated,
      data.TotalVisitors,
      data.ActiveVisits,
      data.SystemStatus,
      data.Metrics,
      data.Alerts
    );
  }
}