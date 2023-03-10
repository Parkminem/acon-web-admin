import { defineStore } from 'pinia';
import contentsApi from '@/api/contents';
import { usePopupStore } from './popup';

export const useContentsStore = defineStore('contents', {
  state: () => ({
    contentsList: null,
    detailContent: null,
    contentPopupState: false
  }),
  actions: {
    /**
     * 콘텐츠 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     * @returns 콘텐츠리스트
     */
    async contentsListAct(page, count, sortData, keyword) {
      await contentsApi
        .fetchContentsList(page, count, sortData, keyword)
        .then((res) => {
          this.contentsList = res.data;
        })
        .catch((err) => {
          if (err.response.data.code == 'N999') {
            this.contentsList = null;
          } else {
            alert('조회에 실패하였습니다.');
          }
        });
    },

    /**
     * 콘텐츠 상세 정보 조회 액션
     * @param (현재 페이지 넘버, 한페이지 안의 게시물, sort값 )
     */
    async contentsDetailAct(pk) {
      await contentsApi
        .fetchDetailContents(pk)
        .then((res) => {
          this.detailContent = res.data;
          const popupStore = usePopupStore();
          popupStore.contentOpen();
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     *  detailContent 값 초기화
     */
    resetDetailContentsAct() {
      if (this.detailContent === null) {
        return false;
      }
      this.detailContent = null;
    }
  }
});
