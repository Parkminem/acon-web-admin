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
     * 소식 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     */
    async newsListAct(page, count, sortData, keyword) {
      await newsApi
<<<<<<< HEAD
        .fetchNewsList(page, count, sortData, keyword)
=======
        .fetchNewsList(page, count, sortData)
        .then((res) => {
          this.newsList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },

    /**
     * @param
     */
    async searchNewsListAct(page, count, sortData, keyword) {
      await newsApi
        .fetchSearchNewsList(page, count, sortData, keyword)
>>>>>>> dev
        .then((res) => {
          this.newsList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
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
          router.push('/manager/news/upload');
          // console.log(this.detailNews);
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    }
  }
});
