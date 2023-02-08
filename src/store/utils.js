import { defineStore } from 'pinia';

export const useSelect = defineStore('select', {
  state: () => ({
    locale: 'kr',
    showNum: 10
  }),
  actions: {
    changeLocale(lang) {
      this.locale = lang;
    },
    changeShow(num) {
      this.showNum = num;
    }
  }
});
