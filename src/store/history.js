import { defineStore } from 'pinia';
import historyApi from '@/api/history';
import { usePopupStore } from '@/store/popup';

export const useHistory = defineStore('history', {
  state: () => ({
    detailHistory: null,
    historyList: null,
    historyPage: null
  }),
  actions: {
    /**
     * 연혁 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     */
    async historyListAct(page, count, sortData, keyword) {
      await historyApi
        .fetchHistoryList(page, count, sortData, keyword)
        .then((res) => {
          this.historyList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     * 연혁 상세 정보 조회 액션
     *  @param 고유번호, 페이지
     */
    async detailHistoryAct(pk, page) {
      this.detailHistory = null;
      await historyApi
        .fetchDetailHistory(pk)
        .then((res) => {
          this.detailHistory = res.data;
          this.historyPage = page;
          const popupStore = usePopupStore();
          popupStore.historyOpen();
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     * detailHistory 값 초기화 액션
     */
    resetDetailHistoryAct() {
      this.detailHistory = null;
    },
    /**
     * 현재 페이지 저장 액션
     * @param 현재페이지
     */
    currentHistoryPageAct(page) {
      this.historyPage = page;
    }
  }
});
