import { defineStore } from 'pinia';
import newsApi from '@/api/news';
import router from '@/routes';

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: null,
    detailNews: null
  }),
  actions: {
    /**
     * 뉴스 리스트 조회 액션
     * @param (현재 페이지 넘버, 한페이지 안의 게시물, sort값 )
     */
    async newsListAct(page, count, sortData) {
      await newsApi
        .fetchNewsList(page, count, sortData)
        .then((res) => {
          this.newsList = res.data;
        })
        .catch((err) => console.log(err));
    },

    /**
     * @param
     */
    async searchNewsListAct(page, count, sortData, keyword) {
      await newsApi
        .fetchSearchNewsList(page, count, sortData, keyword)
        .then((res) => {
          this.newsList = res.data;
        })
        .catch((err) => console.log(err));
    },

    /**
     * 뉴스 상세 조회 액션
     * @param 고유번호
     */
    async newsDetailAct(pk) {
      await newsApi
        .fetchDetailNews(pk)
        .then((res) => {
          this.detailNews = res.data;
          router.push('/news/upload');
          console.log(this.detailNews);
        })
        .catch((err) => console.log(err));
    }
  }
});
