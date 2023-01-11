<template>
  <SubTitle>연혁</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().historyOpen" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData.history">
        <!-- t-body -->

        <ul class="td">
          <li class="w10">2014</li>
          <li class="w10">2</li>
          <li>아이디어콘서트 설립</li>
          <li class="w10">활성화</li>
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
import SubTitle from '../components/common/SubTitle.vue';
import ResisterBtn from '../components/utils/ResisterBtn.vue';
import ShowList from '../components/utils/ShowList.vue';
import SearchBox from '../components/utils/SearchBox.vue';
import Table from '../components/utils/Table.vue';
import AllEntries from '../components/utils/AllEntries.vue';
import Pagination from '../components/utils/Pagination.vue';
import empty from '../components/utils/empty.vue';
import historyApi from '../api/history';
import { usePopupStore } from '../store/popup';
import { useHistory } from '../store/history';
import { theadData } from '../utils/theadData';

const historyStore = useHistory();

//연혁 리스트 호출
// await historyApi.fetchHistoryList(1);
</script>
<style lang="scss" scoped></style>
