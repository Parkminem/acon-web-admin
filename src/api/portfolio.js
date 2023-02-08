import instance from '@/api/instance';

/**
 * 포트폴리오 리스트 조회
 * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수, sort 값)
 */
function fetchPortfolioList(page, count, sortData) {
  return instance.get(
    `/portfolio/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ regdate: sortData })
    )}`
  );
}

/**
 * 포트폴리오 검색결과 조회
 * @param (현재페이지 넘버, 한 페이지 안의 게시물 수, sort값, 키워드({조건:키워드}))
 */
function fetchSearchPortfolioList(page, count, sortData, keyword) {
  return instance.get(
    `/portfolio/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ regdate: sortData })
    )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
  );
}

/**
 * 포트폴리오 갱신
 */
function fetchRenewalPortfolio() {
  return instance.put('/portfolio/sync');
}

const portfolioApi = {
  fetchPortfolioList,
  fetchSearchPortfolioList,
  fetchRenewalPortfolio
};

export default portfolioApi;
