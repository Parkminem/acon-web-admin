import instance from '@/api/instance';

/**
 * 소식 리스트 조회
 * @param (페이지 넘버, 한 페이지 안의 게시물 수)
 */

function fetchNewsList(page, count) {
  return instance.get(`/news/list?nowpage=${page}&listpage=${count}`);
}

/**
 * 소식 상세 조회
 * @param 고유번호
 */
function fetchDetailNews(pk) {
  return instance.get(`/news/${pk}`);
}

/**
 * 소식 등록
 * @param object(title_kr, title_id, title_pt, title_us, thumbnail_file_url,
 * active_flag, content_kr, content_id, content_pt content_us)
 */
function fetchUploadNews(object) {
  return instance.post('/news', object);
}

/**
 * 소식 삭제
 * @param 고유번호
 */
function fetchDeleteNews(pk) {
  return instance.delete(`/news/${pk}`);
}

/**
 * 소식 수정
 * @param object(news_pk, title_kr, title_id, title_pt, title_us,
    // Todo thumbnail
    active_flag, content_kr, content_id, content_pt, content_us)
 */
function fetchEditNews(object) {
  return instance.put('/news', {
    news_pk: object.news_pk,
    title_kr: object.value,
    title_id: object.value,
    title_pt: object.value,
    title_us: object.value,
    // Todo thumbnail
    active_flag: object.value,
    content_kr: object.value,
    content_id: object.value,
    content_pt: object.value,
    content_us: object.value
  });
}

const newsApi = { fetchNewsList, fetchDeleteNews, fetchDetailNews, fetchUploadNews, fetchEditNews };

export default newsApi;
