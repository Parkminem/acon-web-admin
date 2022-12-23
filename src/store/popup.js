import { defineStore } from 'pinia';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    historyState: false,
<<<<<<< HEAD
    partnerState: false,
    locationState: false,
    questionTypeState: false,
    promotionState: false
=======
    partnerState: false
>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274
  }),
  actions: {
    historyOpen() {
      this.historyState = true;
    },
    historyClose() {
      this.historyState = false;
<<<<<<< HEAD
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
=======
>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274
    }
  }
});
