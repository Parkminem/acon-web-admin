import instance from '@/api/instance';

/**
 * 소식 리스트 조회
 * @param (페이지 넘버, 한 페이지 안의 게시물 수)
 */
function fetchNewsList(page, count, sortData) {
  return instance.get(
    `/news/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(JSON.stringify({ regdate: sortData }))}`
  );
}

/**
 * search 소식 리스트 조회
 * @param (페이지 넘버, 한 페이지 안의 게시물 수 , sort값)
 */
function fetchSearchNewsList(page, count, sortData, keyword) {
  return instance.get(
    `/news/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
      JSON.stringify({ regdate: sortData })
    )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
  );
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
    active_flag, content_kr, content_id, content_pt, content_us)
 */
function fetchEditNews(pk, object) {
  return instance.put(`/news/${pk}`, object);
}

const newsApi = {
  fetchNewsList,
  fetchDeleteNews,
  fetchDetailNews,
  fetchUploadNews,
  fetchEditNews,
  fetchSearchNewsList
};

export default newsApi;
