/**
 * 게시판 검색어 조건 변경
 * @param e
 */
export function handleSearchValue(e) {
  this.searchVal = e.target.value;
}

/**
 * 등록일 sort 기능
 * @param  e
 * @param {list불러오는action} act
 * @param {searchList불러오는action} searchAct
 */
export function sorting(e, act, searchAct) {
  this.sortData = e.target.value;
  if (!this.searchInputRef) {
    act(this.nowPageNum, this.listPage, this.sortData);
  } else {
    this.searchData = { [this.searchVal]: this.searchInputRef };
    searchAct(1, this.listPage, this.sortData, this.searchData);
  }
}

/**
 * 페이지 변경 함수
 * @param {페이지} page
 * @param {list불러오는action} act
 * @param {searchList불러오는action} searchAct
 */
export function changePage(page, act, searchAct) {
  if (!this.sortData && !this.searchInputRef) {
    act(page, this.showNum, 'desc');
  } else if (this.sortData && !this.searchInputRef) {
    act(page, this.showNum, this.sortData);
  } else if (!this.sortData && this.searchInputRef) {
    this.searchData = {
      [this.searchVal]: this.searchInputRef
    };
    searchAct(page, this.showNum, 'desc', this.searchData);
  } else {
    this.searchData = { [this.searchVal]: this.searchInputRef };
    searchAct(page, this.showNum, this.sortData, this.searchData);
  }
  this.nowPageNum = page;
}

// /**
//  * 게시물 갯수 변경 함수(페이지네이션 변경)
//  * @param {게시물갯수} num
//  * @param {리스트} list
//  * @param {list불러오는action} act
//  * @param {searchList불러오는action} searchAct
//  */
// export class showList {
//   constructor(num, list, act, searchAct) {
//     //게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들
//     const nowPage = list[0].nowpage;
//     this.listPage = Number(num);
//     if (!this.sortData && !this.searchInputRef) {
//       act(nowPage, num, 'desc').then(() => {
//         this.nowPageNum = 1;
//         this.rowCnt = list[0].rowcnt;
//         this.lastPage = list[0].lastpage;
//       });
//     } else if (this.sortData && !this.searchInputRef) {
//       list(nowPage, num, this.sortData).then(() => {
//         this.nowPageNum = 1;
//         this.rowCnt = list[0].rowcnt;
//         this.lastPage = list[0].lastpage;
//       });
//     } else if (!this.sortData && this.searchInputRef) {
//       this.searchData = {
//         [this.searchVal]: this.searchInputRef
//       };
//       searchAct(nowPage, num, 'desc', this.searchData).then(() => {
//         this.nowPageNum = 1;
//         this.rowCnt = list[0].rowcnt;
//         this.lastPage = list[0].lastpage;
//       });
//     } else {
//       this.searchData = { [this.searchVal]: this.searchInputRef };
//       searchAct(nowPage, num, this.sortData, this.searchData).then(() => {
//         this.nowPageNum = 1;
//         this.rowCnt = list[0].rowcnt;
//         this.lastPage = list[0].lastpage;
//       });
//     }
//   }
// }
