<template>
  <SubTitle>문의유형</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().questionTypeOpen" />
      <div class="tableTop">
        <div class="left">
          <!-- <ShowList /> -->
          <LocaleList />
        </div>
        <SearchBox />
      </div>
      <Table :theadData="theadData.questionType">
        <Empty v-if="!questionTypeList" />
        <ul v-else class="td" v-for="(type, idx) in questionTypeList" :key="type.question_type_pk">
          <li class="w10">{{ type.nowpage > 1 ? (type.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li v-if="locale === 'kr'">{{ type.name_kr }}</li>
          <li v-if="locale === 'en'">{{ type.name_us }}</li>
          <li v-if="locale === 'id'">{{ type.name_id }}</li>
          <li v-if="locale === 'pt'">{{ type.name_pt }}</li>
          <li class="w10">
            <button @click="questionTypeStore.detailQuestionTypeAct(type.question_type_pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteQuestionType(type.question_type_pk)"><span>삭제</span></button>
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
import { ref } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import SearchBox from '@/components/utils/SearchBox.vue';
import Table from '@/components/utils/Table.vue';
import Empty from '@/components/utils/Empty.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import questionTypeApi from '@/api/questionType';
import { usePopupStore } from '@/store/popup';
import { useQuestionType } from '@/store/questionType';
import { theadData } from '@/utils/theadData';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const questionTypeStore = useQuestionType();
const selectStore = useSelect();
const { locale, showNum } = storeToRefs(selectStore);
const { questionTypeList } = storeToRefs(questionTypeStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);

//문의 유형 리스트 조회
await questionTypeStore.questionTypeListAct(1, 10);

const rowCnt = questionTypeList.value[0].rowcnt;
const lastPage = ref(questionTypeList.value[0].lastpage);

//페이지 변경
function pageFunc(page) {
  questionTypeStore.questionTypeListAct(page, showNum.value);
  nowPageNum.value = page;
}
function nextPageFunc(page) {
  questionTypeStore.questionTypeListAct(page + 1, showNum.value);
  nowPageNum.value = page + 1;
}
function prePageFunc(page) {
  questionTypeStore.questionTypeListAct(page - 1, showNum.value);
  nowPageNum.value = page - 1;
}

//문의 유형 삭제
function deleteQuestionType(pk) {
  questionTypeApi
    .fetchDeleteQnaType(pk)
    .then((res) => {
      if (res.data.status === 200) {
        window.location.href = '/questiontype';
      }
    })
    .catch((err) => alert('삭제에 실패하였습니다.'));
}
</script>
<style lang="scss" scoped></style>
