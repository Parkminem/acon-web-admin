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
     * 자사 위치 리스트 조회
     * @param (현재 페이지, 한 페이지 안의 게시물 갯수)
     */
    async locationListAct(page, count) {
      await locationApi
        .fetchLocationList(page, count)
        .then((res) => {
          this.locationList = res.data;
        })
        .catch((err) => console.log(err));
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
        .catch((err) => console.log(err));
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
