import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    historyPopupState: false,
    partnerPopupState: false,
    locationPopupState: false,
    questionTypePopupState: false,
    promotionPopupState: false
  }),
  actions: {
    historyOpen() {
      this.historyPopupState = true;
    },
    historyClose() {
      this.historyPopupState = false;
      window.location.href = '/history';
    },
    partnerOpen() {
      this.partnerPopupState = true;
    },
    partnerClose() {
      this.partnerPopupState = false;
    },
    locationOpen() {
      this.locationPopupState = true;
    },
    locationClose() {
      this.locationPopupState = false;
    },
    questionTypeOpen() {
      this.questionTypePopupState = true;
    },
    questionTypeClose() {
      this.questionTypePopupState = false;
    },
    promotionOpen() {
      this.promotionPopupState = true;
    },
    promotionClose() {
      this.promotionPopupState = false;
    }
  }
});
