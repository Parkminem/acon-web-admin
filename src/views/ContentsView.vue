<template>
  <SubTitle>콘텐츠</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="usePopupStore().contentOpen" />
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
          <select name="" id="" class="search-box__select">
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
          <li class="w10">
            <a :href="url + content.thumbnail_file_url" target="_blank">
              <span class="material-icons-outlined" @click="clickIcons"> image </span>
            </a>
          </li>
          <li class="w10">
            <a :href="url + content.file_url_kr" target="_blank">
              <span class="material-icons-outlined" @click="clickIcons"> folder </span>
            </a>
          </li>
          <li class="w10">
            <a :href="url + content.file_url_us" target="_blank">
              <span class="material-icons-outlined" @click="clickIcons"> folder </span>
            </a>
          </li>
          <li class="w10">
            <button @click="contentStore.contentsDetailAct(content.contents_pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteContent(content.contents_pk)"><span>삭제</span></button>
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
import ResisterBtn from '@/components/utils/ResisterBtn.vue';

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
import { usePopupStore } from '@/store/popup';
import contentsApi from '@/api/contents';

const url = 'https://ideaconcert.com';

const selectStore = useSelect();
const { locale, showNum } = storeToRefs(selectStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const sortData = ref('desc');
const searchInputRef = ref();
const searchVal = ref('title_kr');
let searchData;

const popupStore = usePopupStore();

// 콘텐츠 리스트 조회

const contentStore = useContentsStore();
await contentStore.contentsListAct(1, 10);
const { contentsList } = storeToRefs(contentStore);

let rowCnt = ref(0);
let lastPage = ref(0);

if (contentsList) {
  rowCnt = ref(contentsList.value[0].rowcnt);
  lastPage = ref(contentsList.value[0].lastpage);
}

// console.log(`rowcnt: ${rowCnt.value}`);
// console.log(`lastpage: ${lastPage.value}`);

function deleteContent(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    contentsApi
      .fetchDeleteContent(pk)
      .then((res) => {
        if (res.data.status === 200) {
          contentStore.contentsListAct(nowPageNum.value, listPage.value);
          // location.reload();
        }
      })
      .catch((err) => alert('삭제에 실패하였습니다.'));
  }
}

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들

const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = contentsList.value[0].rowcnt;
  lastPage.value = contentsList.value[0].lastpage;
};

//게시물 갯수 변경 함수

function showList(num) {
  const nowPage = contentsList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    contentStore.contentsListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    contentStore.contentsListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    contentStore.searchContentsListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    contentStore.searchContentsListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < contentsList.value[0].rowCnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

// 페이지 변경

function changePage(page) {
  if (!sortData.value && !searchInputRef.value) {
    contentStore.contentsListAct(page, showNum.value, 'desc');
  } else if (sortData.value && !searchInputRef.value) {
    contentStore.contentsListAct(page, showNum.value, sortData.value);
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    contentStore.searchContentsListAct(page, showNum.value, 'desc', searchData);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    contentStore.searchContentsListAct(page, showNum.value, sortData.value, searchData);
  }
  nowPageNum.value = page;
}

//검색 버튼 클릭

async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await contentStore
    .searchContentsListAct(1, showNum.value, 'desc', searchData)
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
