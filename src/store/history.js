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
     * @param 고유번호
     */
    async detailHistoryAct(pk) {
      this.detailHistory = null;
      await historyApi
        .fetchDetailHistory(pk)
        .then((res) => {
          // console.log(res.data);
          this.detailHistory = res.data.data;
          popupStore.historyOpen();
        })
        .catch((err) => console.log(err));
    },

    /**
     * 연혁 등록 액션
     * @param object(year, month, content_kr, content_id, content_pt,content_us,active_flag)
     */
    async uploadHistoryAct() {
      await historyApi.fetchUploadHistory(object).then((res) => {
        console.log(res.data);
        //status 보고 컴포넌트에서 다시 list api 호출, 팝업 close, value 비우기
      });
    },

    /**
     * 연혁 수정 액션
     * @param object(history_pk, year, month, content_kr, content_id, content_pt, content_us, active_flag)
     */
    async editHistoryAct(object) {
      await historyApi
        .fetchEditHistory(object)
        .then((res) => {
          console.log(res.data);
          //status 보고 컴포넌트에서 다시 list api 호출하기,팝업 close, value 비우기
        })
        .catch((err) => console.log(err));
    },

    /**
     * 연혁 삭제 액션
     * @param 고유번호
     */
    async deletHistoryAct(pk) {
      await historyApi
        .fecthDeleteHistory(pk)
        .then((res) => {
          console.log(res.data);
          //status 보고 컴포넌트에서 다시 list api 호출하기
        })
        .catch((err) => console.log(err));
    }
  }
});
