import { defineStore } from 'pinia';
import portfolioApi from '@/api/portfolio';

export const usePortfolio = defineStore('portfolio', {
  state: () => ({
    portfolioList: null,
    portfolioPage: null
  }),
  actions: {
    /**
     * 포트폴리오 리스트 조회
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     */
    async portfolioListAct(page, count, sortData, keyword) {
      await portfolioApi
        .fetchPortfolioList(page, count, sortData, keyword)
        .then((res) => {
          this.portfolioList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 포트폴리오 갱신 후 최신 리스트 조회
     * @param(현재페이지 넘버, 한 페이지 안의 게시물 수, sort값)
     */
    async renewalPortfolioAct(page, count, sortData) {
      this.portfolioList = null;
      await portfolioApi
        .fetchRenewalPortfolio()
        .then((res) => {
          if (res.data.status === 200) {
            this.portfolioListAct(page, count, sortData);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * 현재 페이지 저장 액션
     * @param 현재 페이지
     */
    currentPortfolioPageAct(page) {
      this.portfolioPage = page;
    }
  }
});
