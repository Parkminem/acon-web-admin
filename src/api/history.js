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
 * parameter : 페이지 넘버
 */
function fetchHistoryList(page) {
  return instance.post('/history/list');
}

const historyApi = { fetchDetailHistory, fetchHistoryList };

export default historyApi;
