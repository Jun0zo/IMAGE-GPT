import axios from "axios";

const server = axios.create({
  baseURL: "http://unilab.kro.kr:8000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer ' + localStorage.getItem('token')
  },
});

export default server;
