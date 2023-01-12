<template>
  <SubTitle>연혁</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().historyOpen" />
      <div class="tableTop">
        <div class="left">
          <ShowList />
          <LocaleList />
        </div>
        <!-- <SearchBox /> -->
      </div>
      <Table :theadData="theadData.history">
        <!-- t-body -->
        <ul class="td" v-for="item in history.list" :key="item.rownum">
          <li class="w10">{{ item.year }}</li>
          <li class="w10">{{ item.month }}</li>
          <li v-if="locale === 'kr'">{{ item.content_kr }}</li>
          <li v-if="locale === 'id'">{{ item.content_id }}</li>
          <li v-if="locale === 'en'">{{ item.content_us }}</li>
          <li v-if="locale === 'pt'">{{ item.content_pt }}</li>
          <li class="w10">{{ item.active_flag === 1 ? '활성화' : '비활성화' }}</li>
          <li class="w10">
            <button @click="historyStore.detailHistoryAct(item.history_pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteHistory(item.history_pk)"><span>삭제</span></button>
          </li>
        </ul>
        <!-- t-body -->
      </Table>
      <div class="tableBottom">
        <AllEntries />
        <Pagination />
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import SearchBox from '@/components/utils/SearchBox.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import empty from '@/components/utils/empty.vue';
import historyApi from '@/api/history';
import { usePopupStore } from '@/store/popup';
import { useHistory } from '@/store/history';
import { useSelect } from '@/store/utils';
import { theadData } from '@/components/utils/theadData';
import { history } from '@/components/utils/dummy';
import { storeToRefs } from 'pinia';

const historyStore = useHistory();
const selectStore = useSelect();
const { locale, showNum } = storeToRefs(selectStore);
const { historyList } = storeToRefs(historyStore);

//연혁 리스트 조회
// await historyStore.historyListAct(1, 10);
await historyStore.detailHistoryAct(1);

// 게시물 갯수 변경
watch(showNum, (newShowNum) => {
  historyStore.historyListAct(historyList.value[0].nowpage, newShowNum);
});

// 연혁 삭제
function deleteHistory(pk) {
  historyApi
    .fecthDeleteHistory(pk)
    .then((res) => {
      if (res.data.status === 200) {
        window.location.href = '/history';
      }
    })
    .catch((err) => console.log(err));
}
</script>
<style lang="scss" scoped></style>
