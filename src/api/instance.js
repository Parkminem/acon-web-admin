import axios from 'axios';
import router from '@/routes';

const instance = axios.create({
  baseURL: 'http://222.239.218.187:9100/admin',
  headers: {
    'content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    // 요청 시 에러 처리

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  function (response) {
    // console.log({ API_URL: response.config.url, DATA: response.data.data });
    return response;
  },
  function (error) {
    console.log(error.response?.data);
    if (error.response.data.status === 500) {
      alert('500 서버 에러');
    } else if (error.response.data.code === 'C006') {
      alert('토큰이 만료되었습니다');
      localStorage.removeItem('token');
      router.push('/');
    } else {
      console.log(error);
    }
  }
);

export default instance;
