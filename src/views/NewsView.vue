<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="goUpload" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData.news">
        <!-- t-body -->
        <ul class="td">
          <li class="w10">1</li>
          <li>아이디어콘서트 설립</li>
          <li class="w10">작성자이름</li>
          <li class="w10">활성화</li>
          <li class="w10">2012.03.24</li>
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
import { useRouter } from 'vue-router';

const router = useRouter();

function goUpload() {
  router.push('/news/upload');
}
</script>
<style lang="scss" scoped></style>
