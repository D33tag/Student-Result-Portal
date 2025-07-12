// src/utils/axiosInstance.js
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5050', // Update this if deployed
  withCredentials: true,
})

export default instance
