import { defineStore } from 'pinia';
import authApi from '../api/auth';
import router from '../routes';

export const useAuthStore = defineStore('auth', {
  state: () => ({}),
  actions: {
    async loginAct(id, pw) {
      await authApi
        .getAuth(id, pw)
        .then((res) => {
          console.log(res);
          localStorage.setItem('token', res.data.accessToken);
          console.log(localStorage);
          router.push('/main');
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  }
});
