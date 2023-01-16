import instance from '@/api/instance';

/**
 * 문의내역 리스트 조회
 * @param (현재페이지, 한 페이지 당 총 게시물 수 )
 */
function fetchQnaList(page, count) {
  return instance.get(`/question/list?nowpage=${page}&listpage=${count}`);
}

/**
 * 문의내역 상세 정보 조회
 * @param 고유번호
 */
