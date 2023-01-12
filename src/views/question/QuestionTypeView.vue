<template>
  <SubTitle>문의유형</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().questionTypeOpen" />
      <div class="tableTop">
        <div class="left">
          <ShowList />
          <LocaleList />
        </div>
        <SearchBox />
      </div>
      <Table :theadData="theadData.questionType">
        <ul class="td">
          <li class="w10">1</li>
          <li v-if="locale === 'kr'">데이터 가공</li>
          <li v-if="locale === 'en'">데이터 가공</li>
          <li v-if="locale === 'id'">데이터 가공</li>
          <li v-if="locale === 'pt'">데이터 가공</li>
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
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import SearchBox from '@/components/utils/SearchBox.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import { usePopupStore } from '@/store/popup';
import { theadData } from '@/utils/theadData';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const { locale } = storeToRefs(selectStore);
</script>
<style lang="scss" scoped></style>
