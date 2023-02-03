import instance from '@/api/instance';

/**
 * 지역 리스트 조회
 * @param {페이지} page
 * @param {한페이지안컨텐츠수} count
 * @param {sort값} sortData
 * @param {키워드} keyword
 * @returns
 */
function fetchWorkSpaceList(page, count, sortData, keyword) {
  if (!keyword) {
    return instance.get(
      `/careers/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ cregdate: sortData })
      )}`
    );
  } else {
    return instance.get(
      `/careers/list?nowpage=${page}&listpage=${count}&sort=${encodeURIComponent(
        JSON.stringify({ cregdate: sortData })
      )}&keyword=${encodeURIComponent(JSON.stringify(keyword))}`
    );
  }
}
/**
 * 업무공간 등록
 * @param {데이터(지역(언어4종류),사진파일)} formData
 */
function fetchUploadWorkSpace(formData) {
  return instance.post('/careers', formData);
}
/**
 * 업무공간 위치 상세 정보 조회
 * @param {고유번호} pk
 */
function fetchDetailWorkSpace(pk) {
  return instance.get(`careers/${pk}`);
}
/**
 * 업무공간 상세 이미지 조회
 * @param {고유번호} pk
 */
function fetchDetailWorkSpaceImages(pk) {
  return instance.get(`/careers/imgs/${pk}`);
}
/**
 * 업무공간 이미지 추가
 * @param {지역고유번호} pk
 */
function fetchAddWorkSpaceImage(pk, formData) {
  return instance.post(`/careers/imgs/${pk}`, formData);
}
/**
 * 업무공간 이미지 삭제
 * @param {지역고유번호} pk
 * @param {이미지번호} seq
 */
function fetchDeleteWorkSpaceImage(pk, seq) {
  return instance.delete(`/careers/imgs/${pk}/${seq}`);
}
/**
 * 업무공간 위치 수정
 * @param {고유번호} pk
 * @param {파일(지역관련)} formData
 */
function fetchEditWorkSpace(pk, formData) {
  return instance.put(`/careers/${pk}`, formData);
}
/**
 * 업무공간 삭제
 * @param {고유번호} pk
 */
function fetchDeleteWorkSpace(pk) {
  return instance.delete(`/careers/${pk}`);
}
const workSpaceApi = {
  fetchWorkSpaceList,
  fetchUploadWorkSpace,
  fetchDetailWorkSpace,
  fetchDetailWorkSpaceImages,
  fetchDeleteWorkSpace,
  fetchEditWorkSpace,
  fetchDeleteWorkSpaceImage,
  fetchAddWorkSpaceImage
};

export default workSpaceApi;
