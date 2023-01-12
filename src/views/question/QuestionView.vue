<template>
  <SubTitle>문의내역</SubTitle>
  <div class="container">
    <div class="section">
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData.question">
        <ul class="td">
          <li class="w10">1</li>
          <li class="w10">데이터 가공</li>
          <li class="w10">홍길동</li>
          <li class="w10">아이디어콘서트 부천 스튜디오에 문의</li>
          <li class="w10">000-0000-0000</li>
          <li>idea@ideaconcert.kr</li>
          <li class="w10">2022.03.03</li>
          <li class="w10">
            <button><span>등록</span></button>
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
import ShowList from '../../components/utils/ShowList.vue';
import SearchBox from '../../components/utils/SearchBox.vue';
import Table from '../../components/utils/Table.vue';
import AllEntries from '../../components/utils/AllEntries.vue';
import Pagination from '../../components/utils/Pagination.vue';
import { theadData } from '../../utils/theadData';
</script>
<style lang="scss" scoped></style>
