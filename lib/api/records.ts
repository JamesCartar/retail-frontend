/**
 * Records API Service
 * Handles all record-related API calls
 */

import { api } from './client';
import { API_ENDPOINTS } from '@/common/constants';
import {
  RecordItem,
  CreateRecordInput,
  UpdateRecordInput,
  PaginatedResponse,
  FilterConfig,
} from '@/common/types';

export const recordService = {
  /**
   * Get all records with pagination and filters
   */
  async getAll(params?: {
    page?: number;
    perPage?: number;
    filters?: FilterConfig;
  }): Promise<PaginatedResponse<RecordItem>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.perPage) queryParams.append('perPage', String(params.perPage));
    
    // Add filters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, String(value));
        }
      });
    }

    const url = `${API_ENDPOINTS.RECORDS.LIST}?${queryParams.toString()}`;
    const response = await api.get<PaginatedResponse<RecordItem>>(url);
    return response.data;
  },

  /**
   * Get a single record by ID
   */
  async getById(id: string): Promise<RecordItem> {
    const response = await api.get<RecordItem>(API_ENDPOINTS.RECORDS.GET(id));
    return response.data;
  },

  /**
   * Create a new record
   */
  async create(data: CreateRecordInput): Promise<RecordItem> {
    const response = await api.post<RecordItem>(API_ENDPOINTS.RECORDS.CREATE, data);
    return response.data;
  },

  /**
   * Update a record
   */
  async update(id: string, data: UpdateRecordInput): Promise<RecordItem> {
    const response = await api.put<RecordItem>(API_ENDPOINTS.RECORDS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Partially update a record
   */
  async partialUpdate(id: string, data: Partial<UpdateRecordInput>): Promise<RecordItem> {
    const response = await api.patch<RecordItem>(API_ENDPOINTS.RECORDS.UPDATE(id), data);
    return response.data;
  },

  /**
   * Delete a record
   */
  async delete(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.RECORDS.DELETE(id));
  },
};
