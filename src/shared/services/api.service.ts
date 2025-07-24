import { ApiResponse, PaginationParams, PaginatedResponse } from "../types/common.types";

export class ApiService {
  private static baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  static async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders()
        }
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders()
        },
        body: JSON.stringify(data)
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders()
        },
        body: JSON.stringify(data)
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...this.getAuthHeaders()
        }
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async getPaginated<T>(
    endpoint: string, 
    pagination: PaginationParams,
    params?: Record<string, any>
  ): Promise<ApiResponse<PaginatedResponse<T>>> {
    const allParams = {
      ...params,
      page: pagination.page,
      limit: pagination.limit,
      sortBy: pagination.sortBy,
      sortOrder: pagination.sortOrder
    };

    return this.get<PaginatedResponse<T>>(endpoint, allParams);
  }

  private static async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      return {
        success: false,
        message: errorData.message || `HTTP Error: ${response.status}`,
        errors: errorData.errors
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
      message: data.message
    };
  }

  private static handleError(error: any): ApiResponse<any> {
    console.error('API Error:', error);
    return {
      success: false,
      message: error.message || 'Network error occurred'
    };
  }

  private static getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('auth_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Utility methods for common operations
  static async uploadFile(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders()
          // Don't set Content-Type for FormData, let browser set it with boundary
        },
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async downloadFile(endpoint: string, filename?: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          ...this.getAuthHeaders()
        }
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  }
}