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
     * @param (현재 페이지 넘버, 한페이지 안의 게시물, sort값 )
     */
    async contentsListAct(page, count) {
      await contentsApi
        .fetchContentsList(page, count)
        .then((res) => {
          this.contentsList = res.data;
          // console.log(this.contentsList);
        })
        .catch((err) => {
          if (err.response.data.status == 404) {
            this.contentsList = null;
          } else {
            alert('조회에 실패하였습니다.');
          }
        });
    },
    /**
     * 콘텐츠 검색 결과 조회 액션
     * @param (현재 페이지 넘버, 한페이지 안의 게시물, sort값 )
     */
    async searchContentsListAct(page, count, sortData, keyword) {
      await contentsApi
        .fetchSearchContentsList(page, count, sortData, keyword)
        .then((res) => {
          this.contentsList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
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
