import instance from '@/api/instance';

/**
 * 자사 위치 리스트 조회
 * @param (현재 페이지, 한 페이지 안의 게시물 수)
 */
function fetchLocationList(page, count) {
  return instance.get(`location/list?nowpage=${page}&listpage=${count}`);
}

/**
 * 자사 위치 상세 정보 반환
 * @param 고유번호
 */
function fetchDetailLocation(pk) {
  return instance.get(`/location/${pk}`);
}

/**
 * 자사 위치 등록
 * @param object(name_kr, name_id, name_pt, name_us, post_code, road_address_kr, road_address_id, road_address_pt, road_address_us, detail_address_kr, detail_address_id, detail_address_pt, detail_address_us, contact, fax, check_open)
 */
function fetchUploadLocation(object) {
  return instance.post('/location', object);
}
/**
 * 자사 위치 수정
 * @param pk object(location_pk, name_kr, name_id, name_pt, name_us, post_code, road_address_kr, road_address_id, road_address_pt, road_address_us, detail_address_kr, detail_address_id, detail_address_pt, detail_address_us, contact, fax, check_open)
 */
function fetchEditLocation(pk, object) {
  return instance.put(`/location/${pk}`, object);
}

/**
 * 자사 위치 삭제
 * @param 고유번호
 */
function fetchDeleteLocation(pk) {
  return instance.delete(`/location/${pk}`);
}

const locationApi = {
  fetchLocationList,
  fetchDetailLocation,
  fetchUploadLocation,
  fetchEditLocation,
  fetchDeleteLocation
};

export default locationApi;
