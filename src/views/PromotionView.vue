<template>
  <SubTitle>홍보영상</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="tableTop">
        <!-- <ShowList /> -->
        <SearchBox />
      </div>
      <Table :theadData="theadData.promotion">
        <empty v-if="!promotionList" />
        <ul v-else class="td" v-for="(i, idx) in promotionList" :key="i.promotion_pk">
          <li class="w10">{{ i.nowpage > 1 ? (i.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li class="">{{ i.promotion_name }}</li>
          <li class="w20">{{ i.promotion_url }}</li>
          <li class="w10">{{ changeDate(i.regdate) }}</li>
          <li class="w10">{{ i.view_status }}</li>
          <li class="w10">
            <button @click="promotionStore.detailPromotionAct(i.promotion_pk, nowPageNum)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deletePromotion(i.promotion_pk)"><span>삭제</span></button>
          </li>
        </ul>
      </Table>
      <div class="tableBottom">
        <AllEntries :nowPage="nowPageNum" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => pageFunc(page)"
          @goNextPage="(page) => nextPageFunc(page)"
          @goPrePage="(page) => prePageFunc(page)"
        />
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
import Empty from '@/components/utils/Empty.vue';
import { changeDate } from '@/utils/calculator';
import { usePopupStore } from '@/store/popup';
import { usePromotion } from '@/store/promotion';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import promotionApi from '@/api/promotion';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const promotionStore = usePromotion();
const selectStore = useSelect();
const popupStore = usePopupStore();
const { showNum } = storeToRefs(selectStore);
const { promotionList } = storeToRefs(promotionStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);

//프로모션 리스트 조회
await promotionStore.promotionListAct(1, 10);

const rowCnt = promotionList.value[0].rowcnt;
const lastPage = ref(promotionList.value[0].lastpage);

//게시물 갯수 변경
watch(showNum, (newShowNum) => {
  promotionStore.promotionListAct(promotionList.value[0].nowpage, newShowNum);
});

//페이지 변경
function pageFunc(page) {
  promotionStore.promotionListAct(page, showNum.value);
  nowPageNum.value = page;
}
function nextPageFunc(page) {
  promotionStore.promotionListAct(page + 1, showNum.value);
  nowPageNum.value = page + 1;
}
function prePageFunc(page) {
  promotionStore.promotionListAct(page - 1, showNum.value);
  nowPageNum.value = page - 1;
}
//등록하기 버튼 클릭
function clickRegisterBtn() {
  popupStore.promotionOpen();
  promotionStore.currentPromotionPageAct(nowPageNum.value);
}
//프로모션 삭제
function deletePromotion(pk) {
  promotionApi
    .fetchDeletePromotion(pk)
    .then((res) => {
      if (res.data.status === 200) {
        promotionStore.promotionListAct(nowPageNum.value, showNum.value);
      }
    })
    .catch((err) => alert('삭제에 실패하였습니다.'));
}
</script>
<style lang="scss" scoped></style>
