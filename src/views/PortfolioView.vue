<template>
  <SubTitle>포트폴리오</SubTitle>
  <div class="container">
    <div class="section">
      <div class="renewalBtn">
        <button @click="clickRenewalHandler"><span>갱신</span></button>
      </div>
      <div class="tableTop">
        <div class="left">
          <ShowList />
          <div class="sortBox">
            <span class="">sort</span>
            <select name="" id="" @change="sorting($event)">
              <option value="" disabled selected><span>등록일</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <div class="searchBox">
          <div class="searchSelect">
            <select name="" id="" @change="handleSearchValue">
              <option value="title" selected>영상 이름</option>
            </select>
          </div>
          <div class="searchInput">
            <input type="text" v-model="searchInputRef" @keydown.enter="searchBtnClick" />
          </div>
          <div class="searchBtn">
            <button @click="searchBtnClick"><span>검색</span></button>
          </div>
        </div>
      </div>
      <Table :theadData="theadData.portfolio">
        <empty v-if="!portfolioList" />
        <ul v-else class="td" v-for="(i, idx) in portfolioList" :key="i.id">
          <li class="w10">{{ i.nowpage > 1 ? (i.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li class="">{{ i.title }}</li>
          <li class="w20">
            <a :href="`https://www.youtube.com/watch?v=${i.video_id}`" target="_blank"
              >https://www.youtube.com/watch?v={{ i.video_id }}</a
            >
          </li>
          <li class="w10">{{ new Date(i.regdate).toLocaleDateString() }}</li>
        </ul>
      </Table>
      <div class="tableBottom">
        <AllEntries :nowPage="nowPageNum" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page)"
          @goNextPage="(page) => changePage(page)"
          @goPrePage="(page) => changePage(page)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '@/components/common/SubTitle.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import Empty from '@/components/utils/Empty.vue';
import { usePortfolio } from '@/store/portfolio';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import portfolioApi from '@/api/portfolio';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const portfolioStore = usePortfolio();
const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);
const { portfolioList } = storeToRefs(portfolioStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const sortData = ref();
const searchInputRef = ref();
const searchVal = ref('title');
let searchData;

//포트폴리오 리스트 조회
await portfolioStore.portfolioListAct(1, 10, 'desc');

const rowCnt = ref(portfolioList.value[0].rowcnt);
const lastPage = ref(portfolioList.value[0].lastpage);

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = portfolioList.value[0].rowcnt;
  lastPage.value = portfolioList.value[0].lastpage;
};

//게시물 갯수 변경 함수
function showList(num) {
  const nowPage = portfolioList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    portfolioStore.portfolioListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    portfolioStore.portfolioListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    portfolioStore.searchPortfolioListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    portfolioStore.searchPortfolioListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < portfolioList.value[0].rowCnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

//페이지 변경
function changePage(page) {
  if (!sortData.value && !searchInputRef.value) {
    portfolioStore.portfolioListAct(page, showNum.value, 'desc');
  } else if (sortData.value && !searchInputRef.value) {
    portfolioStore.portfolioListAct(page, showNum.value, sortData.value);
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    portfolioStore.searchPortfolioListAct(page, showNum.value, 'desc', searchData);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    portfolioStore.searchPortfolioListAct(page, showNum.value, sortData.value, searchData);
  }
  nowPageNum.value = page;
}

//등록일 sort
function sorting(e) {
  sortData.value = e.target.value;
  if (!searchInputRef.value) {
    portfolioStore.portfolioListAct(nowPageNum.value, listPage.value, sortData.value);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    portfolioStore.searchPortfolioListAct(1, listPage.value, sortData.value, searchData);
  }
}

//검색 조건 변경
function handleSearchValue(e) {
  searchVal.value = e.target.value;
}

//검색 버튼 클릭
async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await portfolioStore
    .searchPortfolioListAct(1, showNum.value, 'desc', searchData)
    .then(() => {
      paginationConstant();
    })
    .catch((err) => {
      rowCnt.value = null;
      lastPage.value = null;
      nowPageNum.value = null;
      listPage.value = null;
    });
}

//갱신 버튼 클릭
function clickRenewalHandler() {
  portfolioStore.renewalPortfolioAct(1, showNum.value, 'desc');
}
</script>
<style lang="scss" scoped>
.renewalBtn {
  button {
    padding: 11px 17px;
    background-color: #343a40;
    color: #fff;
    border-radius: 3px;
    transition: all 0.25s ease-out;
    margin-bottom: 20px;
    &:hover {
      background-color: #000;
    }
  }
}
</style>
