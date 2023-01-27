<template>
  <SubTitle>콘텐츠</SubTitle>
  <div class="container">
    <section class="section">
      <div class="renewalBtn">
        <button @click="clickRenewalHandler"><span>등록</span></button>
      </div>
      <div class="section__top">
        <div class="section__left">
          <ShowList />
          <LocaleList />
          <div class="sort-box">
            <span class="">sort</span>
            <select name="" id="" @change="sorting" class="sort-box__select">
              <option value="desc">최신순</option>
              <option value="asc">등록일순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="title" selected>제목</option>
          </select>
          <div class="search-box__input-box">
            <input
              type="text"
              v-model="searchInputRef"
              @keydown.enter="searchBtnClick"
              class="search-box__input-box__input"
            />
          </div>
          <div class="search-box__btn-box">
            <button @click="searchBtnClick" class="search-box__btn-box__btn"><span>검색</span></button>
          </div>
        </div>
      </div>
      <Table :theadData="theadData.contents">
        <Empty v-if="!contentsList" />
        <ul v-else class="td" v-for="(content, idx) in contentsList" :key="content.contents_pk">
          <li class="w10">{{ idx + 1 }}</li>
          <li v-if="locale === 'kr'">{{ content.title_kr }}</li>
          <li v-if="locale === 'id'">{{ content.title_id }}</li>
          <li v-if="locale === 'pt'">{{ content.title_pt }}</li>
          <li v-if="locale === 'en'">{{ content.title_us }}</li>
          <li class="w10">{{ content.thumbnail_file_url ? 'O' : 'X' }}</li>
          <li class="w10">{{ content.file_url_kr ? 'O' : 'X' }}</li>
          <li class="w10">{{ content.file_url_us ? 'O' : 'X' }}</li>
          <li class="w10">
            <button @click="newsStore.newsDetailAct(news.news_pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteNews(news.news_pk)"><span>삭제</span></button>
          </li>
        </ul>
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="nowPageNum" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page)"
          @goNextPage="(page) => changePage(page)"
          @goPrePage="(page) => changePage(page)"
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import { useContentsStore } from '@/store/contents';
import LocaleList from '@/components/utils/LocaleList.vue';

import SubTitle from '@/components/common/SubTitle.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import Empty from '@/components/utils/Empty.vue';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const { locale, showNum } = storeToRefs(selectStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const sortData = ref();
const searchInputRef = ref();
const searchVal = ref('title');
let searchData;

// 콘텐츠 리스트 조회

const contentStore = useContentsStore();
await contentStore.contentsListAct(1, 10);
const { contentsList } = storeToRefs(contentStore);

const rowCnt = ref(contentsList.value[0].rowcnt);
const lastPage = ref(contentsList.value[0].lastpage);

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들

// const paginationConstant = () => {
//   nowPageNum.value = 1;
//   rowCnt.value = portfolioList.value[0].rowcnt;
//   lastPage.value = portfolioList.value[0].lastpage;
// };

//게시물 갯수 변경 함수

// function showList(num) {
//   const nowPage = portfolioList.value[0].nowpage;
//   listPage.value = Number(num);
//   if (!sortData.value && !searchInputRef.value) {
//     portfolioStore.portfolioListAct(nowPage, showNum.value, 'desc').then(() => {
//       paginationConstant();
//     });
//   } else if (sortData.value && !searchInputRef.value) {
//     portfolioStore.portfolioListAct(nowPage, showNum.value, sortData.value).then(() => {
//       paginationConstant();
//     });
//   } else if (!sortData.value && searchInputRef.value) {
//     searchData = {
//       [searchVal.value]: searchInputRef.value
//     };
//     portfolioStore.searchPortfolioListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
//       paginationConstant();
//     });
//   } else {
//     searchData = { [searchVal.value]: searchInputRef.value };
//     portfolioStore.searchPortfolioListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
//       paginationConstant();
//     });
//   }
// }

// watch(showNum, (newShowNum) => {
//   if (newShowNum < portfolioList.value[0].rowCnt) {
//     showList(newShowNum);
//   } else {
//     showList(showNum.value);
//   }
// });

//페이지 변경

// function changePage(page) {
//   if (!sortData.value && !searchInputRef.value) {
//     portfolioStore.portfolioListAct(page, showNum.value, 'desc');
//   } else if (sortData.value && !searchInputRef.value) {
//     portfolioStore.portfolioListAct(page, showNum.value, sortData.value);
//   } else if (!sortData.value && searchInputRef.value) {
//     searchData = {
//       [searchVal.value]: searchInputRef.value
//     };
//     portfolioStore.searchPortfolioListAct(page, showNum.value, 'desc', searchData);
//   } else {
//     searchData = { [searchVal.value]: searchInputRef.value };
//     portfolioStore.searchPortfolioListAct(page, showNum.value, sortData.value, searchData);
//   }
//   nowPageNum.value = page;
// }

//등록일 sort

// function sorting(e) {
//   sortData.value = e.target.value;
//   if (!searchInputRef.value) {
//     portfolioStore.portfolioListAct(nowPageNum.value, listPage.value, sortData.value);
//   } else {
//     searchData = { [searchVal.value]: searchInputRef.value };
//     portfolioStore.searchPortfolioListAct(1, listPage.value, sortData.value, searchData);
//   }
// }

//검색 조건 변경

// function handleSearchValue(e) {
//   searchVal.value = e.target.value;
// }

//검색 버튼 클릭

// async function searchBtnClick() {
//   searchData = { [searchVal.value]: searchInputRef.value };
//   await portfolioStore
//     .searchPortfolioListAct(1, showNum.value, 'desc', searchData)
//     .then(() => {
//       paginationConstant();
//     })
//     .catch((err) => {
//       rowCnt.value = null;
//       lastPage.value = null;
//       nowPageNum.value = null;
//       listPage.value = null;
//     });
// }

//갱신 버튼 클릭

// function clickRenewalHandler() {
//   portfolioStore.renewalPortfolioAct(1, showNum.value, 'desc');
// }
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
