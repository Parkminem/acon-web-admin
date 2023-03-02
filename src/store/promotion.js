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
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     */
    async promotionListAct(page, count, sortData, keyword) {
      await promotionApi
        .fetchPromotionList(page, count, sortData, keyword)
        .then((res) => {
          this.promotionList = res.data;
        })
        .catch((err) => {
          alert('조회에 실패하였습니다.');
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
        .catch((err) => alert('조회에 실패하였습니다.'));
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
