<template>
  <SubTitle>홍보영상</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="section__top">
        <div class="section__left">
          <ShowList />
          <div class="sort-box">
            <span class="">sort</span>
            <select name="" id="" @change="sorting" class="sort-box__select">
              <option value="" disabled selected><span>등록일</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div>
        </div>
        <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="promotion_name" selected>영상 이름</option>
            <option value="promotion_url">영상 유튜브 주소</option>
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
      <Table :theadData="theadData.promotion">
        <Empty v-if="!promotionList" />
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
      <div class="section__bottom">
        <AllEntries :nowPage="nowPageNum" :listPage="listPage" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page, promotionStore.promotionListAct, promotionStore.searchPromotionListAct)"
          @goNextPage="
            (page) => changePage(page, promotionStore.promotionListAct, promotionStore.searchPromotionListAct)
          "
          @goPrePage="
            (page) => changePage(page, promotionStore.promotionListAct, promotionStore.searchPromotionListAct)
          "
        />
      </div>
    </section>
  </div>
</template>
<script setup>
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import Table from '@/components/utils/Table.vue';
import AllEntries from '@/components/utils/AllEntries.vue';
import Pagination from '@/components/utils/Pagination.vue';
import Empty from '@/components/utils/Empty.vue';
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
const sortData = ref();
const searchInputRef = ref();
const searchVal = ref('promotion_name');
let searchData;

//프로모션 리스트 조회
await promotionStore.promotionListAct(1, 10, 'desc');

const rowCnt = ref(promotionList.value[0].rowcnt);
const lastPage = ref(promotionList.value[0].lastpage);

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = promotionList.value[0].rowcnt;
  lastPage.value = promotionList.value[0].lastpage;
};

//게시물 갯수 변경 함수
function showList(num) {
  const nowPage = promotionList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    promotionStore.promotionListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    promotionStore.promotionListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    promotionStore.searchPromotionListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    promotionStore.searchPromotionListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < promotionList.value[0].rowCnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

//페이지 변경
function changePage(page) {
  if (!sortData.value && !searchInputRef.value) {
    promotionStore.promotionListAct(page, showNum.value, 'desc');
  } else if (sortData.value && !searchInputRef.value) {
    promotionStore.promotionListAct(page, showNum.value, sortData.value);
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    promotionStore.searchPromotionListAct(page, showNum.value, 'desc', searchData);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    promotionStore.searchPromotionListAct(page, showNum.value, sortData.value, searchData);
  }
  nowPageNum.value = page;
}

//등록일 sort
function sorting(e) {
  sortData.value = e.target.value;
  if (!searchInputRef.value) {
    promotionStore.promotionListAct(nowPageNum.value, listPage.value, sortData.value);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    promotionStore.searchPromotionListAct(1, listPage.value, sortData.value, searchData);
  }
}

//등록하기 버튼 클릭
function clickRegisterBtn() {
  popupStore.promotionOpen();
  promotionStore.currentPromotionPageAct(nowPageNum.value);
}

//검색 조건 변경
function handleSearchValue(e) {
  searchVal.value = e.target.value;
}

//검색 버튼 클릭
async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await promotionStore
    .searchPromotionListAct(1, showNum.value, 'desc', searchData)
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

//프로모션 삭제
function deletePromotion(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    promotionApi
      .fetchDeletePromotion(pk)
      .then((res) => {
        if (res.data.status === 200) {
          if (!sortData.value) {
            promotionStore.promotionListAct(nowPageNum.value, showNum.value, 'desc');
          } else {
            promotionStore.promotionListAct(nowPageNum.value, showNum.value, sortData.value);
          }
        }
      })
      .catch((err) => alert('삭제에 실패하였습니다.'));
  } else return false;
}
</script>
<style lang="scss" scoped></style>
