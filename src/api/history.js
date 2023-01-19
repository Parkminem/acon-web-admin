import instance from '@/api/instance';
const keyword = {
  year: '2021'
};
/**
 * sort 없는 연혁 리스트 조희
 * @param (페이지 넘버, 한 페이지 안의 게시물 수)
 */
function fetchHistoryList(page, count) {
  return instance.get(
    `/history/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ year: 'desc' })
    )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
  );
}
//키워드체크용 &keyword=${encodeURIComponent(JSON.stringify(keyword))}
/**
 * sort한 연혁 리스트 조회
 * @param (페이지 넘버, 한 페이지 안의 게시물 수, sort값)
 */
function fetchSortHistoryList(page, count, sortData) {
  return instance.get(
    `/history/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(JSON.stringify({ year: sortData }))}`
  );
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
  fecthDeleteHistory,
  fetchSortHistoryList
};

export default historyApi;
