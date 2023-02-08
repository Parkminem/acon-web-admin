import { defineStore } from 'pinia';
import { usePartners } from '@/store/partners';
import { useHistory } from '@/store/history';
import { useLocation } from '@/store/location';
import { useQuestionType } from '@/store/questionType';
import { usePromotion } from '@/store/promotion';
import { useContentsStore } from '@/store/contents';
import { useWorkSpace } from '@/store/workSpace';

export const usePopupStore = defineStore('popup', {
  state: () => ({
    historyPopupState: false,
    partnerPopupState: false,
    locationPopupState: false,
    questionTypePopupState: false,
    promotionPopupState: false,
    contentPopupState: false,
    workSpacePopupState: false
  }),
  actions: {
    historyOpen() {
      this.historyPopupState = true;
    },
    historyClose() {
      const historyStore = useHistory();
      historyStore.resetDetailHistoryAct();
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
      const locationStore = useLocation();
      locationStore.resetDetailLocationAct();
      this.locationPopupState = false;
    },
    questionTypeOpen() {
      this.questionTypePopupState = true;
    },
    questionTypeClose() {
      const questionTypeStore = useQuestionType();
      questionTypeStore.resetDetailQuestionTypeAct();
      this.questionTypePopupState = false;
    },
    promotionOpen() {
      this.promotionPopupState = true;
    },
    promotionClose() {
      const promotionStore = usePromotion();
      promotionStore.resetDetailPromotionAct();
      this.promotionPopupState = false;
    },
    contentOpen() {
      this.contentPopupState = true;
    },
    contentClose() {
      const contentsStore = useContentsStore();
      contentsStore.resetDetailContentsAct();
      this.contentPopupState = false;
    },
    workSpaceOpen() {
      this.workSpacePopupState = true;
    },
    workSpaceClose() {
      const workSpaceStore = useWorkSpace();
      workSpaceStore.resetDetailWorkSpaceAct();
      this.workSpacePopupState = false;
    }
  }
});
