<template>
  <SubTitle>연혁</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="section__top">
        <div class="section__left">
          <ShowList />
          <LocaleList />
          <div class="sort-box">
            <span class="">sort</span>
            <select name="" id="" @change="sorting" class="sort-box__select">
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
              @keydown.enter="searchBtnClick"
              class="search-box__input-box__input"
            />
          </div>
          <div class="search-box__btn-box">
            <button @click="searchBtnClick" class="search-box__btn-box__btn"><span>검색</span></button>
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
        <AllEntries :nowPage="nowPageNum" :listPage="Number(listPage)" :rowCnt="rowCnt" />
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
import { ref, watch } from 'vue';
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
let searchData;

//연혁 리스트 조회
await historyStore.historyListAct(1, 10, 'desc');

const rowCnt = ref(historyList.value[0].rowcnt);
const lastPage = ref(historyList.value[0].lastpage);

//게시물 갯수가 바뀔 때 사용될 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = historyList.value[0].rowcnt;
  lastPage.value = historyList.value[0].lastpage;
};

// 게시물 갯수 변경 함수
function showList(num) {
  const nowPage = historyList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    historyStore.historyListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    historyStore.historyListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    historyStore.seartchHistoryListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    historyStore.seartchHistoryListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < historyList.value[0].rowcnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

//페이지 변경
function changePage(page) {
  if (!sortData.value && !searchInputRef.value) {
    historyStore.historyListAct(page, showNum.value, 'desc');
  } else if (sortData.value && !searchInputRef.value) {
    historyStore.historyListAct(page, showNum.value, sortData.value);
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    historyStore.seartchHistoryListAct(page, showNum.value, 'desc', searchData);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    historyStore.seartchHistoryListAct(page, showNum.value, sortData.value, searchData);
  }
  nowPageNum.value = page;
}

//년도 sort
function sorting(e) {
  sortData.value = e.target.value;
  if (!searchInputRef.value) {
    historyStore.historyListAct(nowPageNum.value, listPage.value, sortData.value);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    historyStore.seartchHistoryListAct(1, listPage.value, sortData.value, searchData);
  }
}

//검색 조건 변경
function handleSearchValue(e) {
  searchVal.value = e.target.value;
}

async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await historyStore
    .seartchHistoryListAct(1, showNum.value, 'desc', searchData)
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
