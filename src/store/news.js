import { defineStore } from 'pinia';
import newsApi from '@/api/news';
import router from '@/routes';

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: null,
    detailNews: null
  }),
  actions: {
    async newsListAct(page, count) {
      await newsApi.fetchNewsList(page, count).then((res) => {
        this.newsList = res.data;
      });
    },
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
