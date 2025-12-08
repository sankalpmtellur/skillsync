// src/config/api.js
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
    ME: `${API_BASE_URL}/api/auth/me`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
  },
  PROJECTS: {
    GET_ALL: `${API_BASE_URL}/api/projects`,
    CREATE: `${API_BASE_URL}/api/projects`,
  },
  USERS: {
    GET_ALL: `${API_BASE_URL}/api/users`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/users/${id}`,
  },
};

export default API_BASE_URL;
