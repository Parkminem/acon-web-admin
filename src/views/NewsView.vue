<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="onUpload" />
      <div class="section__top">
        <div class="section__left">
          <ShowList />
          <LocaleList />
          <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="sorting($event, newsStore.newsListAct, newsStore.searchNewsListAct)"
              class="sort-box__select"
            >
              <option value="desc">최신순</option>
              <option value="asc">등록일순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="content_kr" selected>내용</option>
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
      <Table :theadData="theadData.news">
        <!-- t-body -->
        <Empty v-if="!newsStore.newsList" />
        <ul class="td" v-for="(news, index) of newsStore.newsList" :key="news.news_pk">
          <li class="w10">{{ nowPageNum > 1 ? (nowPageNum - 1) * 10 + (index + 1) : index + 1 }}</li>
          <li v-if="locale === 'kr'">{{ news.title_kr }}</li>
          <li v-if="locale === 'en'">{{ news.title_us }}</li>
          <li v-if="locale === 'id'">{{ news.title_id }}</li>
          <li v-if="locale === 'pt'">{{ news.title_pt }}</li>
          <li class="w10">관리자</li>
          <li class="w10">{{ news.active_flag === 1 ? '활성화' : '비활성화' }}</li>
          <li class="w10">{{ new Date(news.regdate).toLocaleDateString() }}</li>
          <li class="w10">
            <button @click="newsStore.newsDetailAct(news.news_pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteNews(news.news_pk)"><span>삭제</span></button>
          </li>
        </ul>
        <!-- t-body -->
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="nowPageNum" :listPage="Number(listPage)" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page, newsStore.newsListAct, newsStore.searchNewsListAct)"
          @goNextPage="(page) => changePage(page, newsStore.newsListAct, newsStore.searchNewsListAct)"
          @goPrePage="(page) => changePage(page, newsStore.newsListAct, newsStore.searchNewsListAct)"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import Empty from '@/components/utils/Empty.vue';

import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/store/news';
import { ref, watch } from 'vue';
import newsApi from '@/api/news';
import { sorting, changePage, handleSearchValue } from '@/utils/module';

const selectStore = useSelect();
const newsStore = useNewsStore();
const { locale, showNum } = storeToRefs(selectStore);
const { newsList } = storeToRefs(newsStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const sortData = ref();
const searchVal = ref('content_kr');
const searchInputRef = ref();
let searchData;

// 소식 등록하기로 이동
function onUpload() {
  window.location.href = '/news/upload';
}

// 소식 리스트 불러오기
await newsStore.newsListAct(1, 10, 'desc');
const rowCnt = ref(newsList.value[0].rowcnt);
const lastPage = ref(newsList.value[0].lastpage);

// 게시물 갯수가 바뀔 때 사용될 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = newsList.value[0].rowcnt;
  lastPage.value = newsList.value[0].lastpage;
};

// 게시물 갯수 변경 함수
function showList(num) {
  const nowPage = newsList.value[0].nowpage;
  listPage.value = Number(num);

  if (!sortData.value && !searchInputRef.value) {
    newsStore.newsListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    newsStore.newsListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    newsStore.searchNewsListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    newsStore.searchNewsListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < newsList.value[0].rowcnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

// // sort
// function sorting(e) {
//   sortData.value = e.target.value;
//   if (!searchInputRef.value) {
//     newsStore.newsListAct(nowPageNum.value, listPage.value, sortData.value);
//   } else {
//     searchData = { [searchVal.value]: searchInputRef.value };
//     newsStore.searchNewsListAct(1, listPage.value, sortData.value, searchData);
//   }
// }

// // 검색 조건 변경
// function handleSearchValue(e) {
//   searchVal.value = e.target.value;
// }

// // 페이지 변경
// function changePage(page) {
//   if (!sortData.value && !searchInputRef.value) {
//     newsStore.newsListAct(page, showNum.value, 'desc');
//   } else if (sortData.value && !searchInputRef.value) {
//     newsStore.newsListAct(page, showNum.value, sortData.value);
//   } else if (!sortData.value && searchInputRef.value) {
//     searchData = {
//       [searchVal.value]: searchInputRef.value
//     };
//     newsStore.searchNewsListAct(page, showNum.value, 'desc', searchData);
//   } else {
//     searchData = {
//       [searchVal.value]: searchInputRef.value
//     };
//     newsStore.searchNewsListAct(page, showNum.value, sortData.value, searchData);
//   }
//   nowPageNum.value = page;
// }

async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };

  await newsStore
    .searchNewsListAct(1, showNum.value, 'desc', searchData)
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

// 소식 삭제
function deleteNews(pk) {
  if (confirm('삭제하시겠습니까?') === true) {
    newsApi
      .fetchDeleteNews(pk)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = '/news';
        }
      })
      .catch((err) => alert(err));
  } else {
    return false;
  }
}
</script>
<style lang="scss" scoped></style>
