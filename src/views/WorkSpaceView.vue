<template>
  <SubTitle>업무 공간</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="section__top">
        <div class="section__left">
          <LocaleList />
        </div>
      </div>
      <Table :theadData="theadData.workSpace">
        <Empty v-if="!workSpaceList" />
        <ul v-else class="td" v-for="(space, idx) in workSpaceList" :key="space.careers_pk">
          <li class="w10">{{ space.nowpage > 1 ? (space.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li v-if="locale === 'kr'">{{ space.name_kr }}</li>
          <li v-if="locale === 'en'">{{ space.name_us }}</li>
          <li v-if="locale === 'id'">{{ space.name_id }}</li>
          <li v-if="locale === 'pt'">{{ space.name_pt }}</li>
          <li class="w10">{{ new Date(space.cregdate).toLocaleDateString() }}</li>
          <li class="w10">
            <button @click="detailWorkSpaceHandler(space.careers_pk)">
              <span>수정</span>
            </button>
          </li>
          <li class="w10">
            <button @click="deleteWorkSpace(space.careers_pk)">
              <span>삭제</span>
            </button>
          </li>
        </ul>
      </Table>
      <div class="section__bottom" style="justify-content: flex-end">
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page)"
          @goNextPage="(page) => changePage(page)"
          @goPrePage="(page) => changePage(page)"
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import Pagination from '@/components/utils/Pagination.vue';
import Table from '@/components/utils/Table.vue';
import Empty from '@/components/utils/Empty.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import workSpaceApi from '@/api/workSpace';
import { theadData } from '@/utils/theadData';
import { useSelect } from '@/store/utils';
import { usePopupStore } from '@/store/popup';
import { useWorkSpace } from '@/store/workSpace';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const workSpaceStore = useWorkSpace();
const popupStore = usePopupStore();
const { locale } = storeToRefs(selectStore);
const { workSpaceList } = storeToRefs(workSpaceStore);

const nowPageNum = ref(1);
const lastPage = ref(0);

//지역 리스트 조회
await workSpaceStore.workSpaceListAct(1, 10, 'desc');
if (workSpaceList.value) {
  lastPage.value = workSpaceList.value[0].lastpage;
}

//페이지 변경
function changePage(page) {
  workSpaceStore.workSpaceListAct(page, 10, 'desc');
  nowPageNum.value = page;
}

//상세 정보 조회
async function detailWorkSpaceHandler(pk) {
  await workSpaceStore.detailWorkSpaceAct(pk);
  await workSpaceStore.detailWorkSpaceImagesAct(pk);
  await popupStore.workSpaceOpen();
}

//등록하기 버튼 클릭
function clickRegisterBtn() {
  popupStore.workSpaceOpen();
}

//삭제
function deleteWorkSpace(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    workSpaceApi
      .fetchDeleteWorkSpace(pk)
      .then((res) => {
        if (res.data.status === 200) {
          workSpaceStore.workSpaceListAct(1, 10, 'desc');
        }
      })
      .catch((err) => alert('삭제에 실패하였습니다.'));
  }
}
</script>
<style lang="scss" scoped></style>
