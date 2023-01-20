import instance from '@/api/instance';

/**
 * 문의 유형 리스트 조회
 * @param (현재 페이지, 한 페이지 당 총 게시물 수, sort값)
 */
function fetchQnaTypeList(page, count, sortData) {
  return instance.get(
    `/question/type/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ question_type_pk: sortData })
    )}`
  );
}
/**
 * 문의 유형 검색결과 조회
 * @param (현재페이지, 한 페이지 당 총 게시물 수, sort값, 키워드({조건:키워드}))
 */
function fetchSearchQnaTypeList(page, count, sortData, Keyword) {
  return instance.get(
    `/question/type/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ question_type_pk: sortData })
    )}&keyword=${encodeURIComponent(JSON.stringify(Keyword))}`
  );
}

/**
 * 문의 유형 상세 정보 반환
 * @param 고유번호
 */
function fetchDetailQnaType(pk) {
  return instance.get(`question/type/${pk}`);
}

/**
 * 문의 유형 등록
 * @param object(name_kr, name_id, name_pt, name_us)
 */
function fetchUploadQnaType(object) {
  return instance.post('question/type', object);
}

/**
 * 문의 유형 수정
 * @param 고유번호, object(name_kr, name_id, name_pt, name_us)
 */
function fetchEditQnaType(pk, object) {
  return instance.put(`question/type/${pk}`, object);
}

/**
 * 문의 유형 삭제
 * @param 고유번호
 */
function fetchDeleteQnaType(pk) {
  return instance.delete(`question/type/${pk}`);
}

const questionTypeApi = {
  fetchQnaTypeList,
  fetchDetailQnaType,
  fetchUploadQnaType,
  fetchEditQnaType,
  fetchDeleteQnaType,
  fetchSearchQnaTypeList
};
export default questionTypeApi;
