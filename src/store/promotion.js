import { defineStore } from 'pinia';
import promotionApi from '@/api/promotion';
import { usePopupStore } from '@/store/popup';

export const usePromotion = defineStore('promotion', {
  state: () => ({
    promotionList: null,
    detailPromotion: null,
    promotionPage: null
  }),
  actions: {
    /**
     * 프로모션 리스트 조회 액션
     * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수)
     */
    async promotionListAct(page, count) {
      await promotionApi
        .fetchPromotionList(page, count)
        .then((res) => {
          this.promotionList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     *  프로모션 상세 정보 조회 액션
     * @param 고유번호
     */
    async detailPromotionAct(pk, page) {
      this.detailPromotion = null;
      await promotionApi
        .fetchDetailPromotion(pk)
        .then((res) => {
          this.detailPromotion = res.data;
          this.promotionPage = page;
          const popupStore = usePopupStore();
          popupStore.promotionOpen();
        })
        .catch((err) => console.log(err));
    },
    /**
     * detailPromotion 값 초기화 액션
     */
    resetDetailPromotionAct() {
      this.detailPromotion = null;
    },
    /**
     * 현재 페이지 저장 액션
     * @param 현재 페이지
     */
    currentPromotionPageAct(page) {
      this.promotionPage = page;
    }
  }
});
