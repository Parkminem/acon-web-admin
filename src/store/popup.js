import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    historyState: false,
    partnerState: false
  }),
  actions: {
    historyOpen() {
      this.historyState = true;
    },
    historyClose() {
      this.historyState = false;
    }
  }
});
