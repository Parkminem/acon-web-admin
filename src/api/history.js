import instance from './instance';

/**
 * 연헉 상세 정보 반환
 * parameter : 연혁 고유 번호
 */
function fetchDetailHistory(pk) {
  return instance.get(`/history/${pk}`);
}

const historyApi = { fetchDetailHistory };

export default historyApi;
