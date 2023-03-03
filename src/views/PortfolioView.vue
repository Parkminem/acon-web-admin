<template>
  <SubTitle>포트폴리오</SubTitle>
  <div class="container">
    <section class="section">
      <div class="renewalBtn">
        <button @click="clickRenewalHandler"><span>갱신</span></button>
      </div>
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
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="title" selected>영상 이름</option>
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
      <Table :theadData="theadData.portfolio">
        <Empty v-if="!portfolioList" />
        <ul v-else class="td" v-for="(i, idx) in portfolioList" :key="i.id">
          <li class="w10">{{ i.nowpage > 1 ? (i.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li class="">{{ i.title }}</li>
          <li class="w20">
            <a :href="`https://www.youtube.com/watch?v=${i.video_id}`" target="_blank"
              >https://www.youtube.com/watch?v={{ i.video_id }}</a
            >
          </li>
          <li class="w10">{{ new Date(i.regdate).toLocaleDateString() }}</li>
        </ul>
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="Number(nowPage)" :listPage="Number(showNum)" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
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
import SubTitle from '@/components/common/SubTitle.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import Empty from '@/components/utils/Empty.vue';
import router from '@/routes';
import { usePortfolio } from '@/store/portfolio';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import { ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const portfolioStore = usePortfolio();
const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);
const { portfolioList } = storeToRefs(portfolioStore);
const route = useRoute();

const searchInputRef = ref();
const nowPage = ref(1);
const rowCnt = ref();
const lastPage = ref();
const sortData = ref('desc');
const searchVal = ref('title');

//라우터 변경 감지
watchEffect(() => {
  const { page, sort, keyword } = router.currentRoute.value.query;
  if (page) nowPage.value = page;
  if (sort) sortData.value = sort;
  if (keyword) {
    let word = { [searchVal.value]: keyword };
    portfolioStore.portfolioListAct(nowPage.value, showNum.value, sortData.value, word).then(() => {
      searchInputRef.value = keyword;
      if (portfolioList.value === null) {
        rowCnt.value = null;
        lastPage.value = null;
      } else {
        rowCnt.value = portfolioList.value[0].rowcnt;
        lastPage.value = portfolioList.value[0].lastpage;
      }
    });
  } else {
    portfolioStore.portfolioListAct(nowPage.value, showNum.value, sortData.value).then(() => {
      searchInputRef.value = '';
      rowCnt.value = portfolioList.value[0].rowcnt;
      lastPage.value = portfolioList.value[0].lastpage;
    });
  }
});

//포트폴리오 리스트 조회
await portfolioStore.portfolioListAct(1, showNum.value, 'desc');
rowCnt.value = portfolioList.value[0].rowcnt;
lastPage.value = portfolioList.value[0].lastpage;

/**
 * 쿼리 변경
 * @param {변경할페이지} page
 * @param {sort값} sort
 * @param {검색어} keyword
 */
function changeQueryHandler(page, sort, keyword) {
  if (keyword == '') {
    router.push({
      path: '/manager/portfolio',
      query: {
        page,
        list: showNum.value,
        sort
      }
    });
  } else {
    router.push({
      path: '/manager/portfolio',
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
function handleSearchValue(e) {
  searchVal.value = e.target.value;
}

//갱신 버튼 클릭
function clickRenewalHandler() {
  portfolioStore.renewalPortfolioAct(1, showNum.value, sortData.value);
}
</script>
<style lang="scss" scoped>
.renewalBtn {
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
  }
}
</style>
