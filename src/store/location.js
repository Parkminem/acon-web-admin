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
     * @param (현재 페이지, 한 페이지 안의 게시물 갯수, sort값)
     */
    async locationListAct(page, count, sortData) {
      await locationApi
        .fetchLocationList(page, count, sortData)
        .then((res) => {
          this.locationList = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 위치 검색결과 조회
     * @param (현재페이지, 한 페이지 당 총 게시물 수, sort값, 키워드({조건:키워드}))
     */
    async searchLocationListAct(page, count, sortData, keyword) {
      await locationApi
        .fetchSearchLocationList(page, count, sortData, keyword)
        .then((res) => {
          this.locationList = res.data;
        })
        .catch((err) => {
          if (err.response.data.code === 'L000') {
            this.locationList = null;
          } else {
            console.log(err);
          }
        });
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
