/**
 * 페이지네이션 함수
 * page : 현재페이지
 * totalPage : 총 페이지 수
 */
export function pagination(page, totalPage) {
  // const size = totalPage > 5 ? 5 : totalPage;
  const startPage = page - ((page - 1) % 5); // 한 컴포넌트의 시작페이지
  const endPage = startPage + (5 - 1) > totalPage ? totalPage : startPage + (5 - 1); //한 컴포넌트 안의 끝나는 페이지
  const preBtn = startPage > 5 ? true : false; //이전 버튼 생성
  const nextBtn = totalPage > 5 && totalPage !== endPage ? true : false; //다음 버튼 생성

  let pageArr = [];
  for (let i = startPage; i <= endPage; i++) pageArr.push(i);

  return {
    startPage,
    endPage,
    preBtn,
    nextBtn,
    pageArr
  };
}
