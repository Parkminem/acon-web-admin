import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    historyPopupState: false,
    historyState: null,
    partnerPopupState: false,
    partnerState: null,
    locationPopupState: false,
    locationState: null,
    questionTypePopupState: false,
    questionTypeState: null,
    promotionPopupState: false,
    promotionState: null
  }),
  actions: {
    historyOpen(state) {
      this.historyState = state;
      this.historyPopupState = true;
    },
    historyClose() {
      this.historyState = null;
      this.historyPopupState = false;
    },
    partnerOpen(state) {
      this.partnerState = state;
      this.partnerPopupState = true;
    },
    partnerClose() {
      this.partnerState = null;
      this.partnerPopupState = false;
    },
    locationOpen(state) {
      this.locationState = state;
      this.locationPopupState = true;
    },
    locationClose() {
      this.locationState = null;
      this.locationPopupState = false;
    },
    questionTypeOpen(state) {
      this.questionTypeState = state;
      this.questionTypePopupState = true;
    },
    questionTypeClose() {
      this.questionTypeState = null;
      this.questionTypePopupState = false;
    },
    promotionOpen(state) {
      this.promotionState = state;
      this.promotionPopupState = true;
    },
    promotionClose() {
      this.promotionState = null;
      this.promotionPopupState = false;
    }
  }
});
