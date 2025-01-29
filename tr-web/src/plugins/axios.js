// axios
import axios from 'axios';
var qs = require('qs');

let baseURL =  location.hostname.includes('local') ? "http://localhost:3330/api" : "https://cosmhync-1.onrender.com/api";

const http = axios.create({
  baseURL: baseURL,
  headers: { 'x-auth-token':  window.localStorage.getItem('x-auth-token') || '', 'Content-Type': 'application/json' },
  paramsSerializer: function (params) {
    return qs.stringify(params)
  }
});

export default http;