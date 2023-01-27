import { defineStore } from 'pinia';
import contentsApi from '@/api/contents';

export const useContentsStore = defineStore('contents', {
  state: () => ({
    contentsList: null
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
          console.log(res);
          this.contentsList = res.data;
        })
        .catch((err) => console.log(err));
    }
  }
});
