import axios from 'axios';

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL if different
  headers: {
    'Content-Type': 'application/json',
  }
});

// Get all API configurations
export const getApiConfigs = () => {
  return api.get('/api-configs');
};

// Create a new API config
export const createApiConfig = (config) => {
  return api.post('/api-configs', config);
};

// Delete an API config
export const deleteApiConfig = (id) => {
  return api.delete(`/api-configs/${id}`);
};

// Get a single API config by ID
export const getApiConfigById = (id) => {
  return api.get(`/api-configs/${id}`);
};

// Update an API config by ID
export const updateApiConfigById = (id, updatedConfig) => {
  return api.patch(`/api-configs/${id}`, updatedConfig);
};

export default api; // Make sure to keep the default export for axios instance
