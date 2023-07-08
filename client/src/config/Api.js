import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://waysbooks.fly.dev/waysbook/api/v1',
});
 

// Set Authorization Token Header
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};