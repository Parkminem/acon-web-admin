/**
 * 게시판 검색어 조건 변경
 * @param e
 * @param {검색조건} searchVal
 */
export function handleSearchValue(e) {
  this.searchVal = e.target.value;
}

/**
 * 등록일 sort 기능
 * @param  e
 * @param {list불러오는action} act
 * @param {searchList불러오는action} searchAct
 * @param {sort값} sortData
 * @param {검색어} searchInputRef
 * @param {현재페이지} nowPageNum
 * @param {한페이지당갯수} listPage
 * @param {검색조건} searchVal
 */
export function sorting(e, act, searchAct, sortData, searchInputRef, nowPageNum, listPage, searchVal, searchData) {
  sortData = e.target.value;
  if (!searchInputRef) {
    act(nowPageNum, listPage, sortData);
  } else {
    searchData = { [searchVal]: searchInputRef };
    searchAct(1, listPage, sortData, searchData);
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

/**
 * 게시물 갯수 변경 함수(페이지네이션 변경)
 * @param {게시물갯수} num
 * @param {리스트} list
 * @param {list불러오는action} act
 * @param {searchList불러오는action} searchAct
 */
export function showList(num, list, act, searchAct) {
  if (!this.sortData && !this.searchInputRef) {
    act(list[0].nowpage, num, 'desc').then(function (result) {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  } else if (this.sortData && !this.searchInputRef) {
    act(list[0].nowpage, num, this.sortData).then(function (result) {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  } else if (!this.sortData && this.searchInputRef) {
    this.searchData = {
      [this.searchVal]: this.searchInputRef
    };
    searchAct(list[0].nowpage, num, 'desc', this.searchData).then(function (result) {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  } else {
    this.searchData = { [this.searchVal]: this.searchInputRef };
    searchAct(list[0].nowpage, num, this.sortData, this.searchData).then(function (result) {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  }
}
