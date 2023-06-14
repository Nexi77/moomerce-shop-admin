import axios from "axios";

const url: string = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: url,
    timeout: 5000, 
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default axiosInstance;