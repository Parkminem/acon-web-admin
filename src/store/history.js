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
     * sort 없는 연혁 리스트 조회 액션
     * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수, sort값 )
     */
    async historyListAct(page, count, sortData) {
      await historyApi
        .fetchHistoryList(page, count, sortData)
        .then((res) => {
          this.historyList = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 연혁 검색결과 조회
     * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수, sort값, 키워드({조건:키워드}))
     */
    async seartchHistoryListAct(page, count, sortData, keyword) {
      await historyApi
        .fetchSearchHistoryList(page, count, sortData, keyword)
        .then((res) => {
          this.historyList = res.data;
        })
        .catch((err) => {
          if (err.response.data.code === 'H000') {
            this.historyList = null;
          } else {
            console.log(err);
          }
        });
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
        .catch((err) => console.log(err));
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
