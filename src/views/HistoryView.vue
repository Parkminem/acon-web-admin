<template>
  <SubTitle>연혁</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="tableTop">
        <div class="left">
          <!-- <ShowList /> -->
          <LocaleList />
          <div class="sortBox">
            <span class="">sort</span>
            <select name="" id="" @change="sorting($event)">
              <option value="" disabled selected><span>년도</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <SearchBox />
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
      <div class="tableBottom">
        <AllEntries :nowPage="nowPageNum" :listPage="Number(listPage)" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => pageFunc(page)"
          @goNextPage="(page) => nextPageFunc(page)"
          @goPrePage="(page) => prePageFunc(page)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import SearchBox from '@/components/utils/SearchBox.vue';
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

//연혁 리스트 조회
await historyStore.historyListAct(1, 10);

const rowCnt = historyList.value[0].rowcnt;
const lastPage = ref(historyList.value[0].lastpage);

// 게시물 갯수 변경
watch(showNum, (newShowNum) => {
  function showList(num) {
    const nowpage = historyList.value[0].nowpage;
    listPage.value = Number(num);
    historyStore.historyListAct(nowpage, num).then((res) => {
      console.log(res);
      // lastPage.value = res.data[0].lastpage;
    });
  }
  if (newShowNum < historyList.value[0].rowcnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

//페이지 변경
function pageFunc(page) {
  if (!sortData.value) {
    historyStore.historyListAct(page, showNum.value);
  } else {
    historyStore.sortHistoryListAct(page, showNum.value, sortData.value);
  }
  nowPageNum.value = page;
}
function nextPageFunc(page) {
  if (!sortData.value) {
    historyStore.historyListAct(page + 1, showNum.value);
  } else {
    historyStore.sortHistoryListAct(page + 1, showNum.value, sortData.value);
  }
  nowPageNum.value = page + 1;
}
function prePageFunc(page) {
  if (!sortData.value) {
    historyStore.historyListAct(page - 1, showNum.value);
  } else {
    historyStore.sortHistoryListAct(page - 1, showNum.value, sortData.value);
  }
  nowPageNum.value = page - 1;
}

//년도 sort
function sorting(e) {
  sortData.value = e.target.value;
  historyStore.sortHistoryListAct(nowPageNum.value, listPage.value, sortData.value);
}

//등록하기 버튼 클릭 함수
function clickRegisterBtn() {
  popupStore.historyOpen();
  historyStore.currentHistoryPageAct(nowPageNum.value);
}

// 연혁 삭제
function deleteHistory(pk) {
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
}
</script>
<style lang="scss" scoped></style>
