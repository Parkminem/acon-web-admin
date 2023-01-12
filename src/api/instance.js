import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://222.239.218.187:9100/admin'
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
    console.log({ API_URL: response.config.url, DATA: response.data.data });
    return response;
  },
  function (error) {
    console.log(error.response?.data);
    if (error.response.data.status === 500) {
      alert('500 서버 에러');
    } else {
      alert('로그인을 다시 해주세요');
      router.push('/');
    }
  }
);

export default instance;
