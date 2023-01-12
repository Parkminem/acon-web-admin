import instance from './instance';

/**
 * 프로모션 리스트 조회
 * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수)
 */
function fetchPromotionList(page, count) {
  return instance.post('/promotion/list', {
    nowpage: page,
    listpage: count
  });
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
  return instance.post('/promotion', {
    promotion_name: object.promotion_name,
    promotion_url: object.promotion_url,
    view_status: object.view_status
  });
}

/**
 * 프로모션 수정
 * @param object(promotion_pk, promotion_name, promotion_url, view_status)
 */
function fetchEditPromotion(object) {
  return instance.put('/promotion', {
    promotion_pk: object.promotion_pk,
    promotion_name: object.promotion_name,
    promotion_url: object.promotion_url,
    view_status: object.view_status
  });
}

/**
 * 프로모션 삭제
 * @param 고유번호
 */
function fetchDeletePromotion(pk) {
  return instance.delete('/history', {
    promotion_pk: pk
  });
}

const promotionApi = {
  fetchPromotionList,
  fetchDetailPromotion,
  fetchUploadPromotion,
  fetchEditPromotion,
  fetchDeletePromotion
};

export default promotionApi;
