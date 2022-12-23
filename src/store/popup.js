import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    historyState: false,
    partnerState: false,
    locationState: false,
    questionTypeState: false,
    promotionState: false
  }),
  actions: {
    historyOpen() {
      this.historyState = true;
    },
    historyClose() {
      this.historyState = false;
    },
    partnerOpen() {
      this.partnerState = true;
    },
    partnerClose() {
      this.partnerState = false;
    },
    locationOpen() {
      this.locationState = true;
    },
    locationClose() {
      this.locationState = false;
    },
    questionTypeOpen() {
      this.questionTypeState = true;
    },
    questionTypeClose() {
      this.questionTypeState = false;
    },
    promotionOpen() {
      this.promotionState = true;
    },
    promotionClose() {
      this.promotionState = false;
    }
  }
});
