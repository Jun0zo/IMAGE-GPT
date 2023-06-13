import axios from "axios";

const server = axios.create({
  baseURL: "https://unilab.kro.kr:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
});

export default server;
