import { VisitReport, ReportFilter, ReportStatistics, ChartData, DateRange } from "../types/reports.types";

export class ReportsService {
  static async getVisitReports(filter: ReportFilter, dateRange?: DateRange): Promise<VisitReport[]> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            VisitID: 1,
            visitorName: "John Doe",
            hostName: "Alice Wilson",
            department: "Engineering",
            company: "Tech Corp",
            purpose: "Business Meeting",
            checkInTime: new Date("2024-07-24T09:30:00"),
            checkOutTime: new Date("2024-07-24T11:45:00"),
            duration: "2h 15m",
            status: "Checked Out"
          },
          {
            VisitID: 2,
            visitorName: "Jane Smith",
            hostName: "David Brown",
            department: "Marketing",
            company: "Design Studio",
            purpose: "Project Discussion",
            checkInTime: new Date("2024-07-24T14:00:00"),
            checkOutTime: new Date("2024-07-24T15:30:00"),
            duration: "1h 30m",
            status: "Checked Out"
          },
          {
            VisitID: 3,
            visitorName: "Bob Johnson",
            hostName: "Sarah Davis",
            department: "HR",
            company: "Marketing Inc",
            purpose: "Interview",
            checkInTime: new Date("2024-07-24T10:00:00"),
            duration: "45m",
            status: "Checked In"
          }
        ]);
      }, 500);
    });
  }

  static async getStatistics(period: string): Promise<ReportStatistics> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalVisits: 156,
          uniqueVisitors: 89,
          averageDuration: "1h 45m",
          peakHour: "10:00 AM",
          growthRate: 12.5,
          departmentBreakdown: [
            { department: "Engineering", count: 45 },
            { department: "Marketing", count: 32 },
            { department: "HR", count: 28 },
            { department: "Sales", count: 51 }
          ]
        });
      }, 500);
    });
  }

  static async getChartData(period: string): Promise<ChartData> {
    // Mock implementation - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          visitsTrend: [
            { date: "Jul 20", visits: 12 },
            { date: "Jul 21", visits: 18 },
            { date: "Jul 22", visits: 15 },
            { date: "Jul 23", visits: 22 },
            { date: "Jul 24", visits: 25 }
          ],
          departmentDistribution: [
            { name: "Engineering", visits: 45 },
            { name: "Marketing", visits: 32 },
            { name: "HR", visits: 28 },
            { name: "Sales", visits: 51 }
          ],
          hourlyDistribution: [
            { hour: "9 AM", visits: 8 },
            { hour: "10 AM", visits: 15 },
            { hour: "11 AM", visits: 12 },
            { hour: "12 PM", visits: 6 },
            { hour: "1 PM", visits: 4 },
            { hour: "2 PM", visits: 11 },
            { hour: "3 PM", visits: 9 },
            { hour: "4 PM", visits: 7 },
            { hour: "5 PM", visits: 3 }
          ],
          topHosts: [
            { name: "Alice Wilson", visits: 28 },
            { name: "David Brown", visits: 22 },
            { name: "Sarah Davis", visits: 18 },
            { name: "Michael Johnson", visits: 15 }
          ]
        });
      }, 500);
    });
  }

  static async exportReport(reports: VisitReport[], format: 'pdf' | 'excel' | 'csv'): Promise<void> {
    // Mock implementation - replace with actual export logic
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate file download
        const filename = `visitor-report-${new Date().toISOString().split('T')[0]}.${format}`;
        
        if (format === 'csv') {
          const csvContent = this.generateCSV(reports);
          this.downloadFile(csvContent, filename, 'text/csv');
        } else {
          // For PDF and Excel, you would typically send to backend
          console.log(`Exporting ${reports.length} reports as ${format}`);
        }
        
        resolve();
      }, 1000);
    });
  }

  private static generateCSV(reports: VisitReport[]): string {
    const headers = ['Visitor Name', 'Host Name', 'Department', 'Company', 'Purpose', 'Check In', 'Check Out', 'Duration', 'Status'];
    const rows = reports.map(report => [
      report.visitorName,
      report.hostName,
      report.department,
      report.company,
      report.purpose,
      report.checkInTime.toLocaleString(),
      report.checkOutTime?.toLocaleString() || '',
      report.duration,
      report.status
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}