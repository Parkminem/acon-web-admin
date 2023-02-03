import { defineStore } from 'pinia';
import workSpaceApi from '@/api/workSpace';

export const useWorkSpace = defineStore('workSpace', {
  state: () => ({
    workSpaceList: null,
    detailWorkSpace: null,
    detailImages: null,
    deletedImages: []
  }),
  actions: {
    /**
     * 지역 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지안컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
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
            alert('조회에 실패하였습니다.');
          }
        });
    },
    /**
     * 업무 공간 상세 위치 조회 액션
     * @param {지역고유번호} pk
     */
    async detailWorkSpaceAct(pk) {
      await workSpaceApi
        .fetchDetailWorkSpace(pk)
        .then((res) => {
          this.detailWorkSpace = res.data[0];
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
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
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     * 업무공간 데이터에서 불러온 이미지를 삭제 할 경우, 그 이미지를 모음
     * @param {index} idx
     */
    deletedWorkSpaceImageAct(idx) {
      this.deletedImages.push(this.detailImages[idx]);
    },
    /**
     * 업무공간 데이터에서 불러온 이미지를 삭제처리 했다가 다시 되돌릴 때, 삭제이미지 배열에서 지우기
     * @param {이미지고유번호} seq
     */
    undoWorkSpaceImageAct(seq) {
      const result = this.deletedImages.filter((i) => {
        i.seq !== seq;
      });
      this.deletedImages = result;
    },
    /**
     * 업무공간 이미지 삭제 액션
     * @param {지역고유번호} pk
     * @param {이미지번호} seq
     */
    async deleteWorkSpaceImageAct() {
      if (this.deletedImages.length > 0) {
        this.deletedImages.forEach(async (i) => {
          try {
            await workSpaceApi.fetchDeleteWorkSpaceImage(i.careers_pk, i.seq);
          } catch (err) {
            alert('삭제에 실패하였습니다.');
          }
        });
        this.deletedImages = null;
      }
      this.deletedImages = [];
    },
    /**
     * 업무공간 이미지 추가(복수 가능)
     * @param {지역고유번호} pk
     * @param {파일들} formData
     */
    async addWorkSpaceImageAct(pk, formData) {
      try {
        const result = await workSpaceApi.fetchAddWorkSpaceImage(pk, formData);
      } catch (err) {
        alert('등록에 실패하였습니다.');
      }
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
      this.deletedImages = [];
    }
  }
});
