<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <div class="section" v-if="newsStore.newsList">
      <ResisterBtn @clickRegister="goUpload" />
      <div class="tableTop">
        <div class="left">
          <!-- <ShowList /> -->
          <LocaleList />
        </div>
        <SearchBox />
      </div>
      <Table :theadData="theadData.news">
        <!-- t-body -->
        <ul class="td" v-for="(news, index) of newsStore.newsList" :key="news.news_pk">
          <li class="w10">{{ news.news_pk }}</li>
          <li v-if="locale === 'kr'">{{ news.title_kr }}</li>
          <li v-if="locale === 'en'">{{ news.title_en }}</li>
          <li v-if="locale === 'id'">{{ news.title_id }}</li>
          <li v-if="locale === 'pt'">{{ news.title_pt }}</li>
          <li class="w10">작성자이름</li>
          <li class="w10">{{ news.active_flag === 1 ? '활성화' : '비활성화' }}</li>
          <li class="w10">{{ news.regdate }}</li>
          <li class="w10">
            <button @click="newsStore.newsDetailAct(news.news_pk)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteNews(news.news_pk)"><span>삭제</span></button>
          </li>
        </ul>
        <!-- t-body -->
      </Table>
      <div class="tableBottom">
        <!-- <AllEntries /> -->
        <Pagination :lastPage="Number(lastPage)" :nowPage="nowPageNum" @goPage="(page) => pageFunc(page)" />
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
import LocaleList from '@/components/utils/LocaleList.vue';
import Empty from '@/components/utils/Empty.vue';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import router from '@/routes';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/store/news';
import { ref } from 'vue';
import newsApi from '@/api/news';

const selectStore = useSelect();
const { locale } = storeToRefs(selectStore);
const newsStore = useNewsStore();
const { newsList } = storeToRefs(newsStore);

// 소식 등록하기로 이동
function goUpload() {
  // router.push('/news/upload');
  window.location.href = '/news/upload';
}

// 소식 리스트 불러오기
await newsStore.newsListAct(1, 10);

const lastPage = ref(newsList.value[0].lastpage);
const nowPageNum = ref(1);

// 페이지 변경
function pageFunc(page) {
  newsStore.newsListAct(page, 10);
  nowPageNum.value = page;
}

// 소식 삭제
function deleteNews(pk) {
  if (confirm('삭제하시겠습니까?') === true) {
    newsApi
      .fetchDeleteNews(pk)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = '/news';
        }
      })
      .catch((err) => alert(err));
  } else {
    return false;
  }
}
</script>
<style lang="scss" scoped></style>
