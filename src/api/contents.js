import instance from '@/api/instance';

/**
 * 컨텐츠 리스트 조회
 * @param {페이지} page
 * @param {한페이지당컨텐츠수} count
 * @param {sort값} sortData
 * @param {키워드} keyword
 * @returns 컨텐츠 검색결과 리스트
 */
function fetchContentsList(page, count, sortData, keyword) {
  if (!keyword) {
    return instance.get(
      `/contents/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ regdate: sortData })
      )}`
    );
  } else {
    return instance.get(
      `/contents/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ regdate: sortData })
      )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
    );
  }
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
  fetchEditContent
};

export default contentsApi;
