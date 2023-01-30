<template>
  <SubTitle>문의내역</SubTitle>
  <div class="container">
    <section class="section">
      <div class="section__top">
        <div class="section__left">
          <ShowList />
          <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="sorting($event, questionStore.questionListAct, questionStore.searchQuestionListAct)"
              class="sort-box__select"
            >
              <option value="" disabled selected><span>등록일</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="question_type_kr">문의유형</option>
            <option value="name" selected>이름</option>
            <option value="company">회사명</option>
            <option value="phone">연락처</option>
            <option value="email">이메일</option>
            <option value="question_date">등록일</option>
          </select>
          <div class="search-box__input-box">
            <input
              type="text"
              v-model="searchInputRef"
              @keydown.enter="searchBtnClick"
              class="search-box__input-box__input"
            />
          </div>
          <div class="search-box__btn-box">
            <button @click="searchBtnClick" class="search-box__btn-box__btn"><span>검색</span></button>
          </div>
        </div>
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
          <li class="w10">{{ new Date(qna.question_date).toLocaleDateString() }}</li>
          <li class="w10">
            <button @click="goAnswerPage(qna.question_pk)">
              <span v-if="!qna.answer_content">등록</span>
              <span v-else>보기</span>
            </button>
          </li>
        </ul>
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="nowPageNum" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page, questionStore.questionListAct, questionStore.searchQuestionListAct)"
          @goNextPage="(page) => changePage(page, questionStore.questionListAct, questionStore.searchQuestionListAct)"
          @goPrePage="(page) => changePage(page, questionStore.questionListAct, questionStore.searchQuestionListAct)"
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Empty from '@/components/utils/Empty.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import { theadData } from '@/utils/theadData';
import { useSelect } from '@/store/utils';
import { useQuestion } from '@/store/question';
import { storeToRefs } from 'pinia';
import router from '@/routes';
import { handleSearchValue, sorting, changePage } from '@/utils/module';

const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);
const questionStore = useQuestion();
const { questionList } = storeToRefs(questionStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const searchVal = ref('name');
const searchInputRef = ref();

const sortData = ref();
let searchData;

//문의 내역 조회
await questionStore.questionListAct(1, 10, 'desc');

const rowCnt = ref(questionList.value[0].rowcnt);
const lastPage = ref(questionList.value[0].lastpage);

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = questionList.value[0].rowcnt;
  lastPage.value = questionList.value[0].lastpage;
};

//게시물 갯수 변경 함수
function showList(num) {
  const nowPage = questionList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    questionStore.questionListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    questionStore.questionListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    questionStore.searchQuestionListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    questionStore.searchQuestionListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < questionList.value[0].rowcnt) {
    new showList(newShowNum, questionList.value, questionStore.questionListAct, questionStore.searchQuestionListAct);
  } else {
    new showList(showNum.value, questionList.value, questionStore.questionListAct, questionStore.searchQuestionListAct);
  }
});

//답변 등록 페이지로 이동
function goAnswerPage(pk) {
  router.push(`/question/answer?pk=${pk}`);
}

//검색 버튼 클릭
async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await questionStore
    .searchQuestionListAct(1, showNum.value, 'desc', searchData)
    .then(() => {
      paginationConstant();
    })
    .catch((err) => {
      rowCnt.value = null;
      lastPage.value = null;
      nowPageNum.value = null;
      listPage.value = null;
    });
}
</script>
<style lang="scss" scoped></style>
