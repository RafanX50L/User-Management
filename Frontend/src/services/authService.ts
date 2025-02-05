import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; 

export interface AuthResponse {
  token: string;
  role: 'admin' | 'user';
  id: string;
}

export const AuthService = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
  }): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/register`, userData);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    return response.data;
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    console.log('done')
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    return response.data;
  },
};