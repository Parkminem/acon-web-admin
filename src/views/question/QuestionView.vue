<template>
  <SubTitle>문의내역</SubTitle>
  <div class="container">
    <div class="section">
      <div class="tableTop">
        <div class="left">
          <!-- <ShowList /> -->
          <div class="sortBox">
            <span class="">sort</span>
            <select name="" id="" @change="sorting($event)">
              <option value="" disabled selected><span>등록일</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <SearchBox />
      </div>
      <Table :theadData="theadData.question">
        <Empty v-if="!questionList" />
        <ul class="td" v-else v-for="(qna, idx) in questionList" :key="qna.question_pk">
          <li class="w10">{{ qna.nowpage > 1 ? (qna.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li class="w10">{{ qna.question_type_kr }}</li>
          <li class="w10">{{ qna.name }}</li>
          <li class="w10">{{ qna.company }}</li>
          <li class="w10">{{ qna.phone }}</li>
          <li>{{ qna.email }}</li>
          <li class="w10">{{ changeDate(qna.question_date) }}</li>
          <li class="w10">
            <button @click="goAnswerPage(qna.question_pk)">
              <span v-if="!qna.answer_content">등록</span>
              <span v-else>보기</span>
            </button>
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
import ShowList from '@/components/utils/ShowList.vue';
import SearchBox from '@/components/utils/SearchBox.vue';
import Empty from '@/components/utils/Empty.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import { changeDate } from '@/utils/calculator';
import { theadData } from '@/utils/theadData';
import { useSelect } from '@/store/utils';
import { useQuestion } from '@/store/question';
import { storeToRefs } from 'pinia';
import router from '@/routes';

const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);
const questionStore = useQuestion();
const { questionList } = storeToRefs(questionStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);

const sortData = ref();

//문의 내역 조회
await questionStore.questionListAct(1, 10, 'desc');

const rowCnt = questionList.value[0].rowcnt;
const lastPage = ref(questionList.value[0].lastpage);

//페이지 변경
function pageFunc(page) {
  if (!sortData.value) {
    questionStore.questionListAct(page, showNum.value, 'desc');
  } else {
    questionStore.questionListAct(page, showNum.value, sortData.value);
  }
  nowPageNum.value = page;
}
function nextPageFunc(page) {
  if (!sortData.value) {
    questionStore.questionListAct(page + 1, showNum.value, 'desc');
  } else {
    questionStore.questionListAct(page + 1, showNum.value, sortData.value);
  }
  nowPageNum.value = page + 1;
}
function prePageFunc(page) {
  if (!sortData.value) {
    questionStore.questionListAct(page - 1, showNum.value, 'desc');
  } else {
    questionStore.questionListAct(page - 1, showNum.value, sortData.value);
  }
  nowPageNum.value = page - 1;
}

//등록일 sort
function sorting(e) {
  sortData.value = e.target.value;
  questionStore.questionListAct(nowPageNum.value, listPage.value, sortData.value);
}

//답변 등록 페이지로 이동
function goAnswerPage(pk) {
  router.push(`/question/answer?pk=${pk}`);
}
</script>
<style lang="scss" scoped></style>
