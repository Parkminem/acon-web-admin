import { defineStore } from 'pinia';
import historyApi from '../api/history';
import { usePopupStore } from './popup';

const popupStore = usePopupStore();

export const useHistory = defineStore('history', {
  state: () => ({
    detailHistory: null
  }),
  actions: {
    /**
     * 연혁 상세 정보 조회 액션
     * @param {연혁 고유 번호} pk
     */
    async detailHistoryAct(pk) {
      this.detailHistory = null;
      await historyApi
        .fetchDetailHistory(pk)
        .then((res) => {
          // console.log(res.data);
          this.detailHistory = res.data.data;
          popupStore.historyOpen('수정');
        })
        .catch((err) => console.log(err));
    }
  }
});
