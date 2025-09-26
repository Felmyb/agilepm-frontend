import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Cambia esto por la URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
