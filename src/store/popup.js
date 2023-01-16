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
      window.location.href = '/partners';
    },
    locationOpen() {
      this.locationPopupState = true;
    },
    locationClose() {
      this.locationPopupState = false;
      window.location.href = '/location';
    },
    questionTypeOpen() {
      this.questionTypePopupState = true;
    },
    questionTypeClose() {
      this.questionTypePopupState = false;
      window.location.href = '/questiontype';
    },
    promotionOpen() {
      this.promotionPopupState = true;
    },
    promotionClose() {
      this.promotionPopupState = false;
      window.location.href = '/promotion';
    }
  }
});
