import { defineStore } from 'pinia';
import locationApi from './../api/location';

export const useLocation = defineStore('location', {
  state: () => ({
    locationList: null,
    detailLocation: null
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
          this.locationList = res.data.data;
        })
        .catch((err) => console.log(err));
    }
  }
});
