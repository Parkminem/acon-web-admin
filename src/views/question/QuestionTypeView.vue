<template>
  <SubTitle>문의유형</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().questionTypeOpen" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData">
        <ul class="td">
          <li class="w10">1</li>
          <li>데이터 가공</li>
          <li class="w10">
            <button><span>수정</span></button>
          </li>
          <li class="w10">
            <button><span>삭제</span></button>
          </li>
        </ul>
      </Table>
      <div class="tableBottom">
        <AllEntries />
        <Pagination />
      </div>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '../../components/common/SubTitle.vue';
import ResisterBtn from '../../components/utils/ResisterBtn.vue';
import ShowList from '../../components/utils/ShowList.vue';
import SearchBox from '../../components/utils/SearchBox.vue';
import Table from '../../components/utils/Table.vue';
import AllEntries from '../../components/utils/AllEntries.vue';
import Pagination from '../../components/utils/Pagination.vue';
import { usePopupStore } from '../../store/popup';

const theadData = [
  { width: 'w10', name: '번호' },
  { width: '', name: '문의유형명' },
  { width: 'w10', name: '수정' },
  { width: 'w10', name: '삭제' }
];
</script>
<style lang="scss" scoped></style>
