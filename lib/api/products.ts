import { api } from './client';

// Example: Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// Product API service - Example of CRUD operations
export const productService = {
  /**
   * Get all products with pagination
   */
  async getAll(params?: { page?: number; perPage?: number; search?: string }) {
    const response = await api.get<PaginatedResponse<Product>>('/products', {
      params,
    });
    return response.data;
  },

  /**
   * Get single product by ID
   */
  async getById(id: string) {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  /**
   * Create new product
   */
  async create(data: CreateProductInput) {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  /**
   * Update existing product
   */
  async update(id: string, data: UpdateProductInput) {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  /**
   * Delete product
   */
  async delete(id: string) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  /**
   * Partial update (PATCH)
   */
  async partialUpdate(id: string, data: UpdateProductInput) {
    const response = await api.patch<Product>(`/products/${id}`, data);
    return response.data;
  },
};
