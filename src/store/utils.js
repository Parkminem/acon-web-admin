import { defineStore } from 'pinia';

export const useSelect = defineStore('select', {
  state: () => ({
    locale: null
  }),
  actions: {
    changeLocale(lang) {
      this.locale = lang;
    }
  }
});
