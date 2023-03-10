import { defineStore } from 'pinia';
import authApi from '@/api/auth';
import router from '@/routes';

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async loginAct(id, pw) {
      await authApi
        .getAuth(id, pw)
        .then((res) => {
          // console.log(res);
          localStorage.setItem('token', res.data.accessToken);
          // console.log(localStorage);
          router.push('/manager/main');
        })
        .catch((error) => {
          console.log(error);
          const status = error.response.status;
          if (status === 404) {
            alert('User Not Found');
          } else {
            alert('Server Error');
          }
        });
    }
  }
});
