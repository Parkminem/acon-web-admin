<template>
  <SubTitle>홍보영상</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().promotionOpen" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData">
        <div class="empty"><p>No data available in table</p></div>
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
import { usePopupStore } from '../store/popup';

const theadData = [
  { width: 'w10', name: '번호' },
  { width: '', name: '영상 이름' },
  { width: '', name: '영상 유튜브 주소' },
  { width: 'w10', name: '등록일' },
  { width: '', name: '영상 공개 여부' },
  { width: 'w10', name: '수정' },
  { width: 'w10', name: '삭제' }
];
</script>
<style lang="scss" scoped></style>
