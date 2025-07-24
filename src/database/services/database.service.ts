import { ApiService } from "../../shared/services/api.service";
import { 
  Visitor, Host, Visit, 
  CreateVisitorDTO, UpdateVisitorDTO,
  CreateHostDTO, UpdateHostDTO,
  CreateVisitDTO, UpdateVisitDTO,
  VisitorFilter, HostFilter, VisitFilter,
  VisitorWithVisits, HostWithVisits, VisitWithDetails
} from "../models/database.models";

export class DatabaseService {
  // Visitor operations
  static async getVisitors(filter?: VisitorFilter) {
    return ApiService.getPaginated<Visitor>('/visitors', {
      page: filter?.page || 1,
      limit: filter?.limit || 50,
      sortBy: filter?.sortBy,
      sortOrder: filter?.sortOrder
    }, filter);
  }

  static async getVisitorById(id: number) {
    return ApiService.get<VisitorWithVisits>(`/visitors/${id}`);
  }

  static async createVisitor(data: CreateVisitorDTO) {
    return ApiService.post<Visitor>('/visitors', data);
  }

  static async updateVisitor(id: number, data: UpdateVisitorDTO) {
    return ApiService.put<Visitor>(`/visitors/${id}`, data);
  }

  static async deleteVisitor(id: number) {
    return ApiService.delete(`/visitors/${id}`);
  }

  static async searchVisitors(query: string) {
    return ApiService.get<Visitor[]>(`/visitors/search`, { query });
  }

  // Host operations
  static async getHosts(filter?: HostFilter) {
    return ApiService.getPaginated<Host>('/hosts', {
      page: filter?.page || 1,
      limit: filter?.limit || 50,
      sortBy: filter?.sortBy,
      sortOrder: filter?.sortOrder
    }, filter);
  }

  static async getHostById(id: number) {
    return ApiService.get<HostWithVisits>(`/hosts/${id}`);
  }

  static async createHost(data: CreateHostDTO) {
    return ApiService.post<Host>('/hosts', data);
  }

  static async updateHost(id: number, data: UpdateHostDTO) {
    return ApiService.put<Host>(`/hosts/${id}`, data);
  }

  static async deleteHost(id: number) {
    return ApiService.delete(`/hosts/${id}`);
  }

  static async getHostsByDepartment(department: string) {
    return ApiService.get<Host[]>(`/hosts/department/${department}`);
  }

  static async getAvailableHosts() {
    return ApiService.get<Host[]>('/hosts/available');
  }

  // Visit operations
  static async getVisits(filter?: VisitFilter) {
    return ApiService.getPaginated<VisitWithDetails>('/visits', {
      page: filter?.page || 1,
      limit: filter?.limit || 50,
      sortBy: filter?.sortBy,
      sortOrder: filter?.sortOrder
    }, filter);
  }

  static async getVisitById(id: number) {
    return ApiService.get<VisitWithDetails>(`/visits/${id}`);
  }

  static async createVisit(data: CreateVisitDTO) {
    return ApiService.post<Visit>('/visits', data);
  }

  static async updateVisit(id: number, data: UpdateVisitDTO) {
    return ApiService.put<Visit>(`/visits/${id}`, data);
  }

  static async deleteVisit(id: number) {
    return ApiService.delete(`/visits/${id}`);
  }

  static async checkInVisitor(data: CreateVisitDTO) {
    return ApiService.post<Visit>('/visits/check-in', data);
  }

  static async checkOutVisitor(visitId: number) {
    return ApiService.put<Visit>(`/visits/${visitId}/check-out`, {});
  }

  static async getActiveVisits() {
    return ApiService.get<VisitWithDetails[]>('/visits/active');
  }

  static async getVisitsByVisitor(visitorId: number) {
    return ApiService.get<VisitWithDetails[]>(`/visits/visitor/${visitorId}`);
  }

  static async getVisitsByHost(hostId: number) {
    return ApiService.get<VisitWithDetails[]>(`/visits/host/${hostId}`);
  }

  // Statistics and reporting
  static async getDashboardStats() {
    return ApiService.get('/statistics/dashboard');
  }

  static async getVisitorStats(period: string = 'month') {
    return ApiService.get('/statistics/visitors', { period });
  }

  static async getHostStats(period: string = 'month') {
    return ApiService.get('/statistics/hosts', { period });
  }

  static async getVisitStats(period: string = 'month') {
    return ApiService.get('/statistics/visits', { period });
  }

  // Database maintenance
  static async backupDatabase() {
    return ApiService.post('/admin/backup', {});
  }

  static async runDatabaseMaintenance() {
    return ApiService.post('/admin/maintenance', {});
  }

  static async getDatabaseHealth() {
    return ApiService.get('/admin/health');
  }

  // Bulk operations
  static async bulkImportVisitors(data: CreateVisitorDTO[]) {
    return ApiService.post('/visitors/bulk-import', { visitors: data });
  }

  static async bulkImportHosts(data: CreateHostDTO[]) {
    return ApiService.post('/hosts/bulk-import', { hosts: data });
  }

  static async exportData(type: 'visitors' | 'hosts' | 'visits', format: 'csv' | 'excel' | 'json') {
    return ApiService.downloadFile(`/export/${type}?format=${format}`, `${type}-export.${format}`);
  }
}