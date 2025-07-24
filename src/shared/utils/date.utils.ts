import { format, parseISO, isValid, differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

export class DateUtils {
  // Format date for display
  static formatDate(date: Date | string, formatString: string = 'MMM dd, yyyy'): string {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj) ? format(dateObj, formatString) : 'Invalid Date';
    } catch (error) {
      return 'Invalid Date';
    }
  }

  // Format date and time for display
  static formatDateTime(date: Date | string, formatString: string = 'MMM dd, yyyy HH:mm'): string {
    return this.formatDate(date, formatString);
  }

  // Format time only
  static formatTime(date: Date | string, formatString: string = 'HH:mm'): string {
    return this.formatDate(date, formatString);
  }

  // Get relative time (e.g., "2 hours ago")
  static getRelativeTime(date: Date | string): string {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(dateObj)) return 'Invalid Date';

      const now = new Date();
      const diffMinutes = differenceInMinutes(now, dateObj);
      const diffHours = differenceInHours(now, dateObj);
      const diffDays = differenceInDays(now, dateObj);

      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays}d ago`;
      
      return this.formatDate(dateObj, 'MMM dd');
    } catch (error) {
      return 'Invalid Date';
    }
  }

  // Calculate duration between two dates
  static getDuration(startDate: Date | string, endDate?: Date | string): string {
    try {
      const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
      const end = endDate ? (typeof endDate === 'string' ? parseISO(endDate) : endDate) : new Date();
      
      if (!isValid(start) || !isValid(end)) return 'Invalid';

      const diffMinutes = differenceInMinutes(end, start);
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      if (hours === 0) return `${minutes}m`;
      return `${hours}h ${minutes}m`;
    } catch (error) {
      return 'Invalid';
    }
  }

  // Check if date is today
  static isToday(date: Date | string): boolean {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      if (!isValid(dateObj)) return false;

      const today = new Date();
      return dateObj.toDateString() === today.toDateString();
    } catch (error) {
      return false;
    }
  }

  // Get start of day
  static getStartOfDay(date: Date | string = new Date()): Date {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const start = new Date(dateObj);
    start.setHours(0, 0, 0, 0);
    return start;
  }

  // Get end of day
  static getEndOfDay(date: Date | string = new Date()): Date {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const end = new Date(dateObj);
    end.setHours(23, 59, 59, 999);
    return end;
  }

  // Get date range for common periods
  static getDateRange(period: 'today' | 'yesterday' | 'week' | 'month' | 'year'): { start: Date; end: Date } {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    switch (period) {
      case 'today':
        return {
          start: this.getStartOfDay(now),
          end: this.getEndOfDay(now)
        };
      
      case 'yesterday':
        start.setDate(now.getDate() - 1);
        return {
          start: this.getStartOfDay(start),
          end: this.getEndOfDay(start)
        };
      
      case 'week':
        const dayOfWeek = now.getDay();
        start.setDate(now.getDate() - dayOfWeek);
        end.setDate(start.getDate() + 6);
        return {
          start: this.getStartOfDay(start),
          end: this.getEndOfDay(end)
        };
      
      case 'month':
        start.setDate(1);
        end.setMonth(start.getMonth() + 1, 0);
        return {
          start: this.getStartOfDay(start),
          end: this.getEndOfDay(end)
        };
      
      case 'year':
        start.setMonth(0, 1);
        end.setMonth(11, 31);
        return {
          start: this.getStartOfDay(start),
          end: this.getEndOfDay(end)
        };
      
      default:
        return {
          start: this.getStartOfDay(now),
          end: this.getEndOfDay(now)
        };
    }
  }

  // Convert to ISO string for API
  static toISOString(date: Date | string): string {
    try {
      const dateObj = typeof date === 'string' ? parseISO(date) : date;
      return isValid(dateObj) ? dateObj.toISOString() : '';
    } catch (error) {
      return '';
    }
  }

  // Parse date from various formats
  static parseDate(dateStr: string): Date | null {
    try {
      // Try parsing as ISO string first
      let date = parseISO(dateStr);
      if (isValid(date)) return date;

      // Try parsing as regular Date
      date = new Date(dateStr);
      if (isValid(date)) return date;

      return null;
    } catch (error) {
      return null;
    }
  }
}