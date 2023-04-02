import axios from "axios";

const server = axios.create({
  baseURL: "https://127.0.0.1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
});

export default server;
