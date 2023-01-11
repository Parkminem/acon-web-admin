import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://222.239.218.187:9100/admin'
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');

    if (token) {
      // console.log(eval(`user = ${user}`));
      // console.log(user);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers[
      'AuthorizationAccess'
    ] = `Access eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUb29uZmxpeCJ9.RO2W1p8GAlgByB_hhlYLln-ldD7pFw8TDr5Xf7h0ez8`;

    return config;
  },
  function (error) {
    // Do something with request error
    // 요청 시 에러 처리
    return Promise.reject(error);
  }
);

export default instance;
