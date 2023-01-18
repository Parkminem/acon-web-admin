import instance from '@/api/instance';

/**
 * 파트너사 리스트 조회
 * @param
 */
function fetchPartnersList() {
  return instance.get('/partner/list?nowpage=1&listpage=1000');
}

/**
 * 파트너사 상세 정보 조회
 * @param 고유번호
 */
function fetchDetailPartners(pk) {
  return instance.get(`partner/${pk}`);
}

/**
 * 파트너사 등록
 * @param object(name_kr,name_id,name_pt,name_us,url)
 */
function fetchUploadPartners(object) {
  return instance.post('/partner', object, { headers: { 'Content-Type': 'multipart/form-data' } });
}

/**
 * 파트너사 수정
 * @param 고유번호, object(name_kr,name_id,name_pt,name_us,url,logo_origin_name,logo_save_name,logo_file_url)
 */
function fetchEditPartners(pk, object) {
  return instance.put(`/partner/${pk}`, object, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

/**
 * 파트너사 삭제
 * @param 고유번호
 */
function fetchDeletePartners(pk) {
  return instance.delete(`/partner/${pk}`);
}

const partnersApi = {
  fetchPartnersList,
  fetchDetailPartners,
  fetchUploadPartners,
  fetchEditPartners,
  fetchDeletePartners
};

export default partnersApi;
