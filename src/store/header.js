import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', {
  state: () => ({
    slideState: true
  }),
  actions: {
    sideToggleAct() {
      if (this.slideState) return (this.slideState = false);
      else return (this.slideState = true);
    }
  }
});
