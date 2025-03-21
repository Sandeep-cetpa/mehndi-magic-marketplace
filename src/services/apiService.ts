
import axios from 'axios';
import { ProductType } from './productService';
import { LeadType } from './leadService';
import { LoginCredentials, AuthResponse } from './authService';

// API base URL - this would come from env variables in production
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsApi = {
  getAll: async (): Promise<ProductType[]> => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  create: async (product: ProductType): Promise<ProductType> => {
    try {
      const response = await api.post('/products', product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },
  
  update: async (id: string, product: Partial<ProductType>): Promise<ProductType> => {
    try {
      const response = await api.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  
  delete: async (id: string): Promise<{ id: string; name: string }> => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Leads API
export const leadsApi = {
  getAll: async (): Promise<LeadType[]> => {
    try {
      const response = await api.get('/leads');
      return response.data;
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },
  
  create: async (lead: LeadType): Promise<LeadType> => {
    try {
      const response = await api.post('/leads', lead);
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }
};

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login', credentials);
      // Store token if login successful
      if (response.data.success && response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return {
        success: false,
        message: 'Login failed'
      };
    }
  },
  
  register: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      return {
        success: false,
        message: 'Registration failed'
      };
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};

export default {
  products: productsApi,
  leads: leadsApi,
  auth: authApi
};
