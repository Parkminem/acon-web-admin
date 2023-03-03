<template>
  <SubTitle>콘텐츠</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="usePopupStore().contentOpen" />
      <div class="section__top">
        <div class="section__left">
          <ShowList @changeList="() => changeQueryHandler(1, sortData, searchInputRef)" />
          <LocaleList />
          <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="(e) => changeQueryHandler(nowPageNum, e.target.value, searchInputRef)"
              class="sort-box__select"
            >
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
              @keydown.enter="changeQueryHandler(1, null, searchInputRef)"
              class="search-box__input-box__input"
            />
          </div>
          <div class="search-box__btn-box">
            <button @click="changeQueryHandler(1, null, searchInputRef)" class="search-box__btn-box__btn">
              <span>검색</span>
            </button>
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
        <AllEntries :nowPage="Number(nowPageNum)" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="Number(nowPageNum)"
          @goPage="(page) => changeQueryHandler(page, sortData, searchInputRef)"
          @goNextPage="(page) => changeQueryHandler(page, sortData, searchInputRef)"
          @goPrePage="(page) => changeQueryHandler(page, sortData, searchInputRef)"
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
import { ref, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { usePopupStore } from '@/store/popup';
import contentsApi from '@/api/contents';
import router from '@/routes';

const url = 'https://ideaconcert.com';

const selectStore = useSelect();
const { locale, showNum } = storeToRefs(selectStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const sortData = ref('desc');
const searchInputRef = ref();
const searchVal = ref('title_kr');
let rowCnt = ref();
let lastPage = ref();
let searchData;

const popupStore = usePopupStore();
const contentStore = useContentsStore();
const { contentsList } = storeToRefs(contentStore);

//라우터 변경 감지
watchEffect(() => {
  const { page, sort, keyword } = router.currentRoute.value.query;
  if (page) nowPageNum.value = page;
  if (sort) sortData.value = sort;
  if (keyword) {
    let word = { [searchVal.value]: keyword };
    contentStore.contentsListAct(nowPageNum.value, showNum.value, sortData.value, word).then(() => {
      searchInputRef.value = keyword;
      if (contentsList.value === null) {
        rowCnt.value = null;
        lastPage.value = null;
      } else {
        rowCnt.value = contentsList.value[0].rowcnt;
        lastPage.value = contentsList.value[0].lastpage;
      }
    });
  } else {
    contentStore.contentsListAct(nowPageNum.value, showNum.value, sortData.value).then(() => {
      searchInputRef.value = '';
      rowCnt.value = contentsList.value[0].rowcnt;
      lastPage.value = contentsList.value[0].lastpage;
    });
  }
});

/**
 * 쿼리 변경
 * @param {변경할페이지} page
 * @param {sort값} sort
 * @param {검색어} keyword
 */
function changeQueryHandler(page, sort, keyword) {
  if (keyword == '') {
    router.push({
      path: '/manager/contents',
      query: {
        page,
        list: showNum.value,
        sort
      }
    });
  } else {
    router.push({
      path: '/manager/contents',
      query: {
        page,
        list: showNum.value,
        sort,
        keyword
      }
    });
  }
}

//컨텐츠 삭제
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
