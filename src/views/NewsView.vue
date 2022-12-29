<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @click="goUpload" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData">
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
import { useRouter } from 'vue-router';

const theadData = [
  { width: 'w10', name: '번호' },
  { width: '', name: '내용' },
  { width: 'w10', name: '작성자' },
  { width: 'w10', name: '활성화 여부' },
  { width: 'w10', name: '등록일' },
  { width: 'w10', name: '수정' },
  { width: 'w10', name: '삭제' }
];
const router = useRouter();

function goUpload() {
  router.push('/news/upload');
}
</script>
<style lang="scss" scoped></style>
