import { defineStore } from 'pinia';
import { usePartners } from '@/store/partners';

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
    },
    partnerOpen() {
      this.partnerPopupState = true;
    },
    partnerClose() {
      const partnersStore = usePartners();
      partnersStore.resetDetailPartnerAct();
      this.partnerPopupState = false;
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
