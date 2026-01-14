import { api, tokenUtils } from './client';

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Auth API service
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    // Store token on successful login
    if (response.data.token) {
      tokenUtils.setToken(response.data.token);
    }
    
    return response.data;
  },

  /**
   * Register new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', credentials);
    
    // Store token on successful registration
    if (response.data.token) {
      tokenUtils.setToken(response.data.token);
    }
    
    return response.data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Always remove token, even if API call fails
      tokenUtils.removeToken();
      
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Refresh token
   */
  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post<{ token: string }>('/auth/refresh');
    
    if (response.data.token) {
      tokenUtils.setToken(response.data.token);
    }
    
    return response.data;
  },
};
