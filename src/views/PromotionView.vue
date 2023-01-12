<template>
  <SubTitle>홍보영상</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().promotionOpen" />
      <div class="tableTop">
        <ShowList />
        <SearchBox />
      </div>
      <Table :theadData="theadData.promotion">
        <!-- nodata 시 v-if 작업 -->
        <!-- <empty /> -->
        <ul class="td" v-for="i in promotion.list" :key="i.promotion_pk">
          <li class="w10">{{ i.promotion_pk }}</li>
          <li class="">{{ i.promotion_name }}</li>
          <li class="w20">{{ i.promotion_url }}</li>
          <li class="w10">{{ changeDate(i.regdate) }}</li>
          <li class="w10">{{ i.view_status }}</li>
          <li class="w10">
            <button><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deletePromotion"><span>삭제</span></button>
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
import empty from '@/components/utils/empty.vue';
import { usePopupStore } from '@/store/popup';
import { usePromotion } from '@/store/promotion';
import { useSelect } from '@/store/utils';
import { theadData } from '@/components/utils/theadData';
import { promotion } from '@/components/utils/dummy';
import promotionApi from '@/api/promotion';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

const promotionStore = usePromotion();
const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);
const { promotionList } = storeToRefs(promotionStore);

//등록일 형태 변경 함수
const changeDate = (date) => {
  return date.substr(0, 10).replace(/-/g, '.');
};

//게시물 갯수 변경
watch(showNum, (newShowNum) => {
  promotionStore.promotionListAct(promotionList.value[0].nowpage, newShowNum);
});

//프로모션 삭제
function deletePromotion(pk) {
  promotionApi
    .fetchDeletePromotion(pk)
    .then((res) => {
      if (res.data.status === 200) {
        window.location.href = '/promotion';
      }
    })
    .catch((err) => console.log(err));
}
</script>
<style lang="scss" scoped></style>
