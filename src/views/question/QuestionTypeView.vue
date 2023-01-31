<template>
  <SubTitle>문의유형</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="section__top">
        <div class="section__left">
          <ShowList />
          <LocaleList />
          <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="
                sorting($event, questionTypeStore.questionTypeListAct, questionTypeStore.searchQuestionTypeListAct)
              "
              class="sort-box__select"
            >
              <option value="" disabled selected><span>번호</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="name_kr" selected>문의유형</option>
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
      <Table :theadData="theadData.questionType">
        <Empty v-if="!questionTypeList" />
        <ul v-else class="td" v-for="(type, idx) in questionTypeList" :key="type.question_type_pk">
          <li class="w10">{{ type.nowpage > 1 ? (type.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li v-if="locale === 'kr'">{{ type.name_kr }}</li>
          <li v-if="locale === 'en'">{{ type.name_us }}</li>
          <li v-if="locale === 'id'">{{ type.name_id }}</li>
          <li v-if="locale === 'pt'">{{ type.name_pt }}</li>
          <li class="w10">
            <button @click="questionTypeStore.detailQuestionTypeAct(type.question_type_pk, nowPageNum)">
              <span>수정</span>
            </button>
          </li>
          <li class="w10">
            <button @click="deleteQuestionType(type.question_type_pk)"><span>삭제</span></button>
          </li>
        </ul>
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="nowPageNum" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="
            (page) =>
              changePage(page, questionTypeStore.questionTypeListAct, questionTypeStore.searchQuestionTypeListAct)
          "
          @goNextPage="
            (page) =>
              changePage(page, questionTypeStore.questionTypeListAct, questionTypeStore.searchQuestionTypeListAct)
          "
          @goPrePage="
            (page) =>
              changePage(page, questionTypeStore.questionTypeListAct, questionTypeStore.searchQuestionTypeListAct)
          "
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
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
import { changePage, handleSearchValue, sorting } from '@/utils/module';

const questionTypeStore = useQuestionType();
const selectStore = useSelect();
const popupStore = usePopupStore();
const { locale, showNum } = storeToRefs(selectStore);
const { questionTypeList } = storeToRefs(questionTypeStore);

const nowPageNum = ref(1);
const listPage = ref(showNum.value);
const searchVal = ref('name_kr');
const searchInputRef = ref();

const sortData = ref();
let searchData;

//문의 유형 리스트 조회
await questionTypeStore.questionTypeListAct(1, 10, 'desc');

const rowCnt = ref(questionTypeList.value[0].rowcnt);
const lastPage = ref(questionTypeList.value[0].lastpage);

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = questionTypeList.value[0].rowcnt;
  lastPage.value = questionTypeList.value[0].lastpage;
};

//게시물 갯수 변경 함수
function showList(num) {
  const nowPage = questionTypeList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    questionTypeStore.questionTypeListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    questionTypeStore.questionTypeListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    questionTypeStore.searchQuestionTypeListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    questionTypeStore.searchQuestionTypeListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < questionTypeList.value[0].rowcnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

//등록하기 버튼 클릭
function clickRegisterBtn() {
  popupStore.questionTypeOpen();
  questionTypeStore.currentQuestionTypeAct(nowPageNum.value);
}

//검색 버튼 클릭
async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await questionTypeStore
    .searchQuestionTypeListAct(1, showNum.value, 'desc', searchData)
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

//문의 유형 삭제
function deleteQuestionType(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    questionTypeApi
      .fetchDeleteQnaType(pk)
      .then((res) => {
        if (res.data.status === 200) {
          if (!sortData.value) {
            questionTypeStore.questionTypeListAct(nowPageNum.value, showNum.value, 'desc');
          } else {
            questionTypeStore.questionTypeListAct(nowPageNum.value, showNum.value, sortData.value);
          }
        }
      })
      .catch((err) => alert('삭제에 실패하였습니다.'));
  } else return false;
}
</script>
<style lang="scss" scoped></style>
