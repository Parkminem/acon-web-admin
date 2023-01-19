import instance from '@/api/instance';

/**
 * 문의내역 리스트 조회
 * @param (현재페이지, 한 페이지 당 총 게시물 수, sort 값 )
 */
function fetchQnaList(page, count, sortData) {
  return instance.get(
    `/question/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ question_date: sortData })
    )}`
  );
}

/**
 * 문의 내역 검색결과 조회
 * @param(현재페이지, 한 페이지 당 총 게시물 수, sort값, 키워드({조건:키워드}))
 */
function fetchSearchQnaList(page, count, sortData, keyword) {
  return instance.get(
    `/question/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ question_date: sortData })
    )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
  );
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

const questionApi = { fetchQnaList, fetchSearchQnaList, fetchDetailQna, fetchAnswer };

export default questionApi;
