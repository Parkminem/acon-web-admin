import { defineStore } from 'pinia';
import workSpaceApi from '@/api/workSpace';
import { usePopupStore } from '@/store/popup';

export const useWorkSpace = defineStore('workSpace', {
  state: () => ({
    workSpaceList: null,
    detailWorkSpace: null,
    detailImages: null
  }),
  actions: {
    /**
     * 지역 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지안컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     * @returns
     */
    async workSpaceListAct(page, count, sortData, keyword) {
      await workSpaceApi
        .fetchWorkSpaceList(page, count, sortData, keyword)
        .then((res) => {
          this.workSpaceList = res.data;
        })
        .catch((err) => {
          if (err.response.data.code === 'N999') {
            this.workSpaceList = null;
          } else {
            console.log(err);
          }
        });
    },
    /**
     * 업무 공간 상세 위치 조회 액션
     * @param {*} pk
     */
    async detailWorkSpaceAct(pk) {
      await workSpaceApi
        .fetchDetailWorkSpace(pk)
        .then((res) => {
          this.detailWorkSpace = res.data[0];
          console.log(this.detailWorkSpace);
        })
        .catch((err) => console.log(err));
    },
    /**
     * 업무 공간 상세 이미지 조회 액션
     * @param {고유번호} pk
     */
    async detailWorkSpaceImagesAct(pk) {
      await workSpaceApi
        .fetchDetailWorkSpaceImages(pk)
        .then((res) => {
          this.detailImages = res.data;
          console.log(this.detailImages);
        })
        .catch((err) => console.log(err));
    },
    /**
     * detailWorkSpace 값 초기화
     */
    resetDetailWorkSpaceAct() {
      if (this.detailWorkSpace === null) {
        return false;
      }
      this.detailWorkSpace = null;
      this.detailImages = null;
    }
  }
});
