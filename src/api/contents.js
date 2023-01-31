import instance from '@/api/instance';

/**
 * 컨텐츠 리스트 조회
 * @param 페이지넘버, 페이지 안의 게시물 수
 */
function fetchContentsList(page, count) {
  return instance.get(`/contents/list?nowpage=${page}&listpage=${count}`);
}

/**
 * 컨텐츠 검색 결과 조회
 * @param 페이지넘버, 페이지 안의 게시물 수
 */
function fetchSearchContentsList(page, count, sortData, keyword) {
  return instance.get(
    `/contents/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ regdate: sortData })
    )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
  );
}

/**
 * 컨텐츠 상세 정보 조회
 * @param 고유번호
 */
function fetchDetailContents(pk) {
  return instance.get(`/contents/${pk}`);
}

/**
 * 컨텐츠 등록
 * @param object(name_kr,name_id,name_pt,name_us,url)
 */
function fetchUploadContent(object) {
  return instance.post('/contents', object, { headers: { 'Content-Type': 'multipart/form-data' } });
}

/**
 * 컨텐츠 수정
 * @param 고유번호
 */
function fetchEditContent(pk, object) {
  return instance.put(`/contents/${pk}`, object, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

/**
 * 컨텐츠 삭제
 * @param 고유번호
 */
function fetchDeleteContent(pk) {
  return instance.delete(`/contents/${pk}`);
}

const contentsApi = {
  fetchContentsList,
  fetchDetailContents,
  fetchUploadContent,
  fetchDeleteContent,
  fetchEditContent,
  fetchSearchContentsList
};

export default contentsApi;
