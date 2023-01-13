import { defineStore } from 'pinia';
import historyApi from '@/api/history';
import { usePopupStore } from '@/store/popup';

const popupStore = usePopupStore();

export const useHistory = defineStore('history', {
  state: () => ({
    detailHistory: null,
    historyList: null
  }),
  actions: {
    /**
     * 연혁 리스트 조회 액션
     * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수)
     */
    async historyListAct(page, count) {
      await historyApi
        .fetchHistoryList(page, count)
        .then((res) => {
          this.historyList = res.data;
          console.log(this.historyList);
        })
        .catch((err) => console.log(err));
    },
    /**
     * 연혁 상세 정보 조회 액션
     * @param 고유번호
     */ async detailHistoryAct(pk) {
      this.detailHistory = null;
      await historyApi
        .fetchDetailHistory(pk)
        .then((res) => {
          // console.log(res.data);
          this.detailHistory = res.data.data;
          popupStore.historyOpen();
        })
        .catch((err) => console.log(err));
    }
  }
});
