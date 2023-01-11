import instance from './instance';

/**
 * 연헉 상세 정보 반환
 * 인수 : 연혁 고유 번호
 */
function fetchDetailHistory(pk) {
  return instance.get(`/history/${pk}`);
}

/**
 * 연혁 리스트 조희
 * 인수 : 페이지 넘버, 한 페이지 안의 게시물 수
 */
function fetchHistoryList(page, count) {
  return instance.post('/history/list', {
    nowpage: page,
    listpage: count
  });
}

/**
 * 연혁 등록
 * 인수 : object(year, month, content_kr, content_id, content_pt,content_us,active_flag)
 */
function fetchUploadHistory(object) {
  return instance.post('/history', {
    year: object.year,
    month: object.month,
    content_kr: object.content_kr,
    content_id: object.content_id,
    content_pt: object.content_pt,
    content_us: object.content_us,
    active_flag: object.active_flag
  });
}
/**
 * 연혁 수정
 * 인수 : object(history_pk, year, month, content_kr, content_id, content_pt, content_us, active_flag)
 */
function fetchEditHistory(object) {
  return instance.put('/history', {
    history_pk: object.history_pk,
    year: object.year,
    month: object.month,
    content_kr: object.content_kr,
    content_id: object.content_id,
    content_pt: object.content_pt,
    content_us: object.content_us,
    active_flag: object.active_flag
  });
}

/**
 * 연혁 삭제
 * 인수 : history_pk
 */
function fecthDeleteHistory(pk) {
  return instance.delete('/history', {
    history_pk: pk
  });
}

const historyApi = { fetchDetailHistory, fetchHistoryList, fetchUploadHistory, fetchEditHistory, fecthDeleteHistory };

export default historyApi;
