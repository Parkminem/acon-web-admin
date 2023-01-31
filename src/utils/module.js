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

/**
 * 게시물 갯수 변경 함수(페이지네이션 변경)
 * @param {게시물갯수} num
 * @param {리스트} list
 * @param {list불러오는action} act
 * @param {searchList불러오는action} searchAct
 */
export function showList(num, list, act, searchAct) {
  if (!this.sortData && !this.searchInputRef) {
    act(list[0].nowpage, num, 'desc').then((result) => {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  } else if (this.sortData && !this.searchInputRef) {
    act(list[0].nowpage, num, this.sortData).then((result) => {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  } else if (!this.sortData && this.searchInputRef) {
    this.searchData = {
      [this.searchVal]: this.searchInputRef
    };
    searchAct(list[0].nowpage, num, 'desc', this.searchData).then((result) => {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  } else {
    this.searchData = { [this.searchVal]: this.searchInputRef };
    searchAct(list[0].nowpage, num, this.sortData, this.searchData).then((result) => {
      this.nowPageNum = 1;
      this.rowCnt = result[0].rowcnt;
      this.lastPage = result[0].lastpage;
    });
  }
}
