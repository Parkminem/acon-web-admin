import instance from '@/api/instance';

/**
 * 문의내역 리스트 조회
 * @param {페이지} page
 * @param {한페이지당컨텐츠수} count
 * @param {sort값} sortData
 * @param {키워드} keyword
 * @returns 문의내역 검색결과 리스트
 */
function fetchQnaList(page, count, sortData, keyword) {
  if (!keyword) {
    return instance.get(
      `/question/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ question_date: sortData })
      )}`
    );
  } else {
    return instance.get(
      `/question/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ question_date: sortData })
      )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
    );
  }
}

/**
 * 문의내역 상세 정보 조회
 * @param 고유번호
 */
function fetchDetailQna(pk) {
  return instance.get(`question/${pk}`);
}

/**
 * 답변하기
 * @param object(question_pk, language, content)
 */
function fetchAnswer(object) {
  return instance.post('question/answer', object);
}

const questionApi = { fetchQnaList, fetchDetailQna, fetchAnswer };

export default questionApi;
