<template>
  <SubTitle>연혁</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="section__top">
        <div class="section__left">
          <ShowList @changeList="changeQueryHandler(1, sortData, searchInputRef)" />
          <LocaleList />
          <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="changeQueryHandler(nowPageNum, $event.target.value, searchInputRef)"
              class="sort-box__select"
            >
              <option value="" disabled selected><span>년도</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="year">년도</option>
            <option value="month">월</option>
            <option value="content_kr" selected>내용</option>
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
      <Table :theadData="theadData.history">
        <!-- t-body -->
        <Empty v-if="!historyList" />
        <ul v-else class="td" v-for="item in historyList" :key="item.rownum">
          <li class="w10">{{ item.year }}</li>
          <li class="w10">{{ item.month }}</li>
          <li v-if="locale === 'kr'">{{ item.content_kr }}</li>
          <li v-if="locale === 'id'">{{ item.content_id }}</li>
          <li v-if="locale === 'en'">{{ item.content_us }}</li>
          <li v-if="locale === 'pt'">{{ item.content_pt }}</li>
          <li class="w10">{{ item.active_flag === 1 ? '활성화' : '비활성화' }}</li>
          <li class="w10">
            <button @click="historyStore.detailHistoryAct(item.history_pk, nowPageNum)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteHistory(item.history_pk)"><span>삭제</span></button>
          </li>
        </ul>
        <!-- t-body -->
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="Number(nowPageNum)" :listPage="Number(listPage)" :rowCnt="rowCnt" />
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
import { ref, watch, watchEffect } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import Empty from '@/components/utils/Empty.vue';
import historyApi from '@/api/history';
import { usePopupStore } from '@/store/popup';
import { useHistory } from '@/store/history';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import { storeToRefs } from 'pinia';
import router from '@/routes';

const historyStore = useHistory();
const selectStore = useSelect();
const popupStore = usePopupStore();
const { locale, showNum } = storeToRefs(selectStore);
const { historyList } = storeToRefs(historyStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const sortData = ref();
const searchVal = ref('content_kr');
const searchInputRef = ref();
const rowCnt = ref(0);
const lastPage = ref(0);
let searchData;

//라우터 변경 감지
watchEffect(() => {
  const { page, sort, keyword } = router.currentRoute.value.query;
  if (page) nowPageNum.value = page;
  if (sort) sortData.value = sort;
  if (keyword) {
    let word = { [searchVal.value]: keyword };
    historyStore.historyListAct(nowPageNum.value, showNum.value, sortData.value, word).then(() => {
      searchInputRef.value = keyword;
      if (historyList.value === null) {
        rowCnt.value = null;
        lastPage.value = null;
      } else {
        rowCnt.value = historyList.value[0].rowcnt;
        lastPage.value = historyList.value[0].lastpage;
      }
    });
  } else {
    historyStore.historyListAct(nowPageNum.value, showNum.value, sortData.value).then(() => {
      searchInputRef.value = '';
      rowCnt.value = historyList.value[0].rowcnt;
      lastPage.value = historyList.value[0].lastpage;
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
      path: '/manager/history',
      query: {
        page,
        list: showNum.value,
        sort
      }
    });
  } else {
    router.push({
      path: '/manager/history',
      query: {
        page,
        list: showNum.value,
        sort,
        keyword
      }
    });
  }
}

//게시판 검색어 조건 변경
function handleSearchValue(e) {
  searchVal.value = e.target.value;
}

//등록하기 버튼 클릭 함수
function clickRegisterBtn() {
  popupStore.historyOpen();
  historyStore.currentHistoryPageAct(nowPageNum.value);
}

// 연혁 삭제
function deleteHistory(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    historyApi
      .fecthDeleteHistory(pk)
      .then((res) => {
        if (res.status === 200) {
          if (!sortData.value) {
            historyStore.historyListAct(nowPageNum.value, showNum.value, 'desc');
          } else {
            historyStore.historyListAct(nowPageNum.value, showNum.value, sortData.value);
          }
        }
      })
      .catch((err) => alert('삭제에 실패했습니다.'));
  } else return false;
}
</script>
