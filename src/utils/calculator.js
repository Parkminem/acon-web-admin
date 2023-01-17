//등록일 형태 변경 함수
export const changeDate = (date) => {
  return date.substr(0, 10).replace(/-/g, '.');
};
