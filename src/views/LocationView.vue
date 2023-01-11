<template>
  <SubTitle>위치</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().locationOpen" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData.location">
        <!-- t-body -->
        <ul class="td">
          <li class="w10">1</li>
          <li class="w10">판교</li>
          <li>경기 성남시 수정구 대왕판교로 815 판교기업지원허브 ICT문화융합센터 430호</li>
          <li class="w10">000-000-0000</li>
          <li class="w10">000-000-0000</li>
          <li class="w10">Y</li>
          <li class="w10">
            <button><span>수정</span></button>
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
import { theadData } from '../utils/theadData';
import { usePopupStore } from '../store/popup';
</script>
<style lang="scss" scoped></style>
