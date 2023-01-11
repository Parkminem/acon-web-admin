<template>
  <SubTitle>연혁</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().historyOpen('등록')" />
      <div class="tableTop">
        <div class="left">
          <ShowList />
          <LocaleList />
        </div>
        <SearchBox />
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
            <button @click="historyStore.detailHistoryAct(pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button><span>삭제</span></button>
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
import SubTitle from '../components/common/SubTitle.vue';
import ResisterBtn from '../components/utils/ResisterBtn.vue';
import ShowList from '../components/utils/ShowList.vue';
import SearchBox from '../components/utils/SearchBox.vue';
import Table from '../components/utils/Table.vue';
import AllEntries from '../components/utils/AllEntries.vue';
import Pagination from '../components/utils/Pagination.vue';
import LocaleList from '../components/utils/LocaleList.vue';
import empty from '../components/utils/empty.vue';
import historyApi from '../api/history';
import { usePopupStore } from '../store/popup';
import { useHistory } from '../store/history';
import { useSelect } from '../store/utils';
import { theadData } from '../utils/theadData';
import { history } from '../utils/dummy';
import { storeToRefs } from 'pinia';

const historyStore = useHistory();
const selectStore = useSelect();
const { locale, showNum } = storeToRefs(selectStore);

watch(
  showNum,
  (newShowNum) => {
    //연혁 리스트 호출(showNum(한 페이지 당 게시물 수) 사용))
    // await historyApi
    //   .fetchHistoryList(1, 10)
    //   .then((res) => console.log(res.data))
    //   .catch((err) => console.log(err));
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
