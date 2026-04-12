import axios from 'axios';

// 1. Define the base URL clearly
export const baseURL = 'http://localhost:5001/api';

// 2. Create the axios instance
const client = axios.create({
  baseURL,
  withCredentials: true
});

// 3. Export both the default client and the named baseURL
export default client;