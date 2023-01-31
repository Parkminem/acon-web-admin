<template>
  <SubTitle>업무 공간</SubTitle>
  <div class="container">
    <section class="section">
      <div class="btns">
        <button><span>지역 등록</span></button>
        <button><span>지역 삭제</span></button>
      </div>
      <div class="section__top">
        <div class="section__left">
          <LocaleList />
        </div>
      </div>
      <Table :theadData="theadData.workSpace"> </Table>
    </section>
  </div>
</template>
<script setup>
import SubTitle from '@/components/common/SubTitle.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import Table from '@/components/utils/Table.vue';
import { theadData } from '@/utils/theadData';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const { locale } = storeToRefs(selectStore);
</script>
<style lang="scss" scoped>
button {
  padding: 11px 17px;
  background-color: #343a40;
  color: #fff;
  border-radius: 3px;
  transition: all 0.25s ease-out;
  margin-bottom: 20px;
  &:hover {
    background-color: #000;
  }
  &:first-child {
    margin-right: 10px;
  }
}
</style>
