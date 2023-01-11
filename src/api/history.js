import instance from './instance';

/**
 * 연헉 상세 정보 반환
 * parameter : 연혁 고유 번호
 */
function fetchDetailHistory(pk) {
  return instance.get(`/history/${pk}`);
}

/**
 * 연혁 리스트 조희
 * parameter : 페이지 넘버, 한 페이지 안의 게시물 수
 */
function fetchHistoryList(page, count) {
  return instance.post('/history/list', {
    nowpage: page,
    listpage: count
  });
}

const historyApi = { fetchDetailHistory, fetchHistoryList };

export default historyApi;
