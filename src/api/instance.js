import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://222.239.218.187:9100/admin'
});

export default instance;
