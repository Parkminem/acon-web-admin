import instance from '@/api/instance';

/**
 * 연혁 리스트 조회
 * @param {페이지} page
 * @param {한페이지당컨텐츠수} count
 * @param {sort값} sortData
 * @param {키워드} keyword
 * @returns 연혁 리스트
 */
function fetchHistoryList(page, count, sortData, keyword) {
  if (!keyword) {
    return instance.get(
      `/history/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(JSON.stringify({ year: sortData }))}`
    );
  } else {
    return instance.get(
      `/history/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ year: sortData })
      )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
    );
  }
}

/**
 * 연헉 상세 정보 반환
 * @param 고유번호
 */
function fetchDetailHistory(pk) {
  return instance.get(`/history/${pk}`);
}

/**
 * 연혁 등록
 * @param object(year, month, content_kr, content_id, content_pt,content_us,active_flag)
 */
function fetchUploadHistory(object) {
  return instance.post('/history', object);
}
/**
 * 연혁 수정
 * @param pk object(history_pk, year, month, content_kr, content_id, content_pt, content_us, active_flag)
 */
function fetchEditHistory(pk, object) {
  return instance.put(`/history/${pk}`, object);
}

/**
 * 연혁 삭제
 * @param 고유번호
 */
function fecthDeleteHistory(pk) {
  return instance.delete(`/history/${pk}`);
}

const historyApi = {
  fetchDetailHistory,
  fetchHistoryList,
  fetchUploadHistory,
  fetchEditHistory,
  fecthDeleteHistory
};

export default historyApi;
