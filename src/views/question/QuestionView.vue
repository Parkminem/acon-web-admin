<template>
  <SubTitle>문의내역</SubTitle>
  <div class="container">
    <section class="section">
      <div class="section__top">
        <div class="section__left">
          <ShowList @changeList="() => changeQueryHandler(1, sortData, searchInputRef)" />
          <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="changeQueryHandler(nowPage, $event.target.value, searchInputRef)"
              class="sort-box__select"
            >
              <option value="" disabled selected><span>등록일</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="changeSearchValue" class="search-box__select">
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
              @keydown.enter="changeQueryHandler(1, null, searchInputRef)"
              class="search-box__input-box__input"
            />
          </div>
          <div class="search-box__btn-box">
            <button @click="changeQueryHandler(1, null, searchInputRef)" class="search-box__btn-box__btn">
              <span>검색</span>
            </button>
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
        <AllEntries :nowPage="Number(nowPage)" :listPage="Number(showNum)" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="lastPage"
          :nowPage="Number(nowPage)"
          @goPage="(page) => changeQueryHandler(page, sortData, searchInputRef)"
          @goNextPage="(page) => changeQueryHandler(page, sortData, searchInputRef)"
          @goPrePage="(page) => changeQueryHandler(page, sortData, searchInputRef)"
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue';
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
import { useRoute } from 'vue-router';

const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);
const questionStore = useQuestion();
const { questionList } = storeToRefs(questionStore);
const route = useRoute();

const searchInputRef = ref();
const nowPage = ref(1);
const rowCnt = ref();
const lastPage = ref();
const sortData = ref('desc');
const searchVal = ref('name');

//라우터 변경 감지
watchEffect(() => {
  const { page, sort, keyword } = router.currentRoute.value.query;
  if (page) nowPage.value = page;
  if (sort) sortData.value = sort;
  if (keyword) {
    let word = { [searchVal.value]: keyword };
    questionStore.questionListAct(nowPage.value, showNum.value, sortData.value, word).then(() => {
      searchInputRef.value = keyword;
      if (questionList.value === null) {
        rowCnt.value = null;
        lastPage.value = null;
      } else {
        rowCnt.value = questionList.value[0].rowcnt;
        lastPage.value = questionList.value[0].lastpage;
      }
    });
  } else {
    questionStore.questionListAct(nowPage.value, showNum.value, sortData.value).then(() => {
      searchInputRef.value = '';
      rowCnt.value = questionList.value[0].rowcnt;
      lastPage.value = questionList.value[0].lastpage;
    });
  }
});

/**
 * 쿼리 변경
 * @param {변경할페이지} page
 * @param {sort값} sort
 * @param {검색어} keyword
 */
function changeQueryHandler(page, sort, keyword) {
  if (keyword == '') {
    router.push({
      path: '/manager/question',
      query: {
        page,
        list: showNum.value,
        sort
      }
    });
  } else {
    router.push({
      path: '/manager/question',
      query: {
        page,
        list: showNum.value,
        sort,
        keyword
      }
    });
  }
}

//검색 조건 변경
function changeSearchValue(e) {
  searchVal.value = e.target.value;
}

//답변 등록 페이지로 이동
function goAnswerPage(pk) {
  router.push(`/manager/question/answer?pk=${pk}`);
}
</script>
<style lang="scss" scoped></style>
