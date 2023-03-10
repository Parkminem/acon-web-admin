import instance from '@/api/instance';

/**
 * 포트폴리오 리스트 조회
 * @param {페이지} page
 * @param {한페이지당컨텐츠수} count
 * @param {sort값} sortData
 * @param {키워드} keyword
 * @returns 포트폴리오리스트
 */
function fetchPortfolioList(page, count, sortData, keyword) {
  if (!keyword) {
    return instance.get(
      `/portfolio/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ regdate: sortData })
      )}`
    );
  } else {
    return instance.get(
      `/portfolio/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ regdate: sortData })
      )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
    );
  }
}

/**
 * 포트폴리오 갱신
 */
function fetchRenewalPortfolio() {
  return instance.put('/portfolio/sync');
}

const portfolioApi = {
  fetchPortfolioList,
  fetchRenewalPortfolio
};

export default portfolioApi;
