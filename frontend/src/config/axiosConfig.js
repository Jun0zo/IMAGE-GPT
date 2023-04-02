import axios from "axios";

const server = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
});

export default server;
