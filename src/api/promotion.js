import instance from '@/api/instance';

/**
 * 프로모션 리스트 조회
 * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수)
 */
function fetchPromotionList(page, count, sortData) {
  return instance.get(
    `/promotion/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ regdate: sortData })
    )}`
  );
}

/**
 * 프로모션 검색결과 조회
 * @param (현재페이지 넘버, 한 페이지 안의 게시물 수, sort값, 키워드({조건:키워드}))
 */
function fetchSearchPromotionList(page, count, sortData, keyword) {
  return instance.get(
    `/promotion/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ regdate: sortData })
    )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
  );
}

/**
 * 프로모션 상세 정보 조회
 * @param 고유번호
 */
function fetchDetailPromotion(pk) {
  return instance.get(`/promotion/${pk}`);
}

/**
 * 프로모션 등록
 * @param object(promotion_name, promotion_url, view_status)
 */
function fetchUploadPromotion(object) {
  return instance.post('/promotion', object);
}

/**
 * 프로모션 수정
 * @param 고유번호, object(promotion_pk, promotion_name, promotion_url, view_status)
 */
function fetchEditPromotion(pk, object) {
  return instance.put(`/promotion/${pk}`, object);
}

/**
 * 프로모션 삭제
 * @param 고유번호
 */
function fetchDeletePromotion(pk) {
  return instance.delete(`/promotion/${pk}`);
}

const promotionApi = {
  fetchPromotionList,
  fetchSearchPromotionList,
  fetchDetailPromotion,
  fetchUploadPromotion,
  fetchEditPromotion,
  fetchDeletePromotion
};

export default promotionApi;
