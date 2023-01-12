import { defineStore } from 'pinia';
import locationApi from '@/api/location';
import { usePopupStore } from '@/store/popup';

const popupStore = usePopupStore();

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
          // console.log(res);
          // this.locationList = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 자사 위치 상세 조회
     * @param 고유번호
     */
    async detailLocationAct(pk) {
      this.detailLocation = null;
      await locationApi
        .fetchDetailLocation(pk)
        .then((res) => {
          console.log(res);
          // console.log(res.data.data);
          this.detailLocation = res.data.data;
          popupStore.locationOpen();
        })
        .catch((err) => console.log(err));
    }
  }
});
