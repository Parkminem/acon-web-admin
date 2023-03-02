import { defineStore } from 'pinia';
import locationApi from '@/api/location';
import { usePopupStore } from '@/store/popup';

export const useLocation = defineStore('location', {
  state: () => ({
    locationList: null,
    detailLocation: null,
    locationPage: null
  }),
  actions: {
    /**
     * 자사위치 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     */
    async locationListAct(page, count, sortData, keyword) {
      await locationApi
        .fetchLocationList(page, count, sortData, keyword)
        .then((res) => {
          this.locationList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },

    /**
     * 자사 위치 상세 조회
     * @param 고유번호, 현재 페이지
     */
    async detailLocationAct(pk, page) {
      this.detailLocation = null;
      await locationApi
        .fetchDetailLocation(pk)
        .then((res) => {
          const popupStore = usePopupStore();
          this.locationPage = page;
          this.detailLocation = res.data;
          popupStore.locationOpen();
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     * detailLocation 값 초기화 액션
     */
    resetDetailLocationAct() {
      this.detailLocation = null;
    },
    /**
     * 현재 페이지 저장 액션
     * @param 현재페이지
     */
    currentLocationPageAct(page) {
      this.locationPage = page;
    }
  }
});
