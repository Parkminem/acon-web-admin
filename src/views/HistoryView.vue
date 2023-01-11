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
        <SearchBox />
      </div>
      <Table :theadData="theadData.history">
        <!-- t-body -->
        <ul class="td" v-for="item in history.list" :key="item.rownum">
          <li class="w10">{{ item.year }}</li>
          <li class="w10">{{ item.month }}</li>
          <li>{{ item.content_kr }}</li>
          <!-- 언어변경작업 후 v-if 작업 하는 게 좋을 듯... -->
          <!-- <li>{{item.content_id}}</li>
          <li>{{item.content_us}}</li>
          <li>{{item.content_pt}}</li> -->
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
import { theadData } from '../utils/theadData';
import { history } from '../utils/dummy';

const historyStore = useHistory();

//연혁 리스트 호출
// await historyApi
//   .fetchHistoryList(1, 10)
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));
</script>
<style lang="scss" scoped></style>
