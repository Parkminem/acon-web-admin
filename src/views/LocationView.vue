<template>
  <SubTitle>위치</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="section__top">
        <div class="section__left">
          <!-- <ShowList /> -->
          <LocaleList />
          <!-- <div class="sort-box">
            <span class="">sort</span>
            <select
              name=""
              id=""
              @change="sorting"
              class="sort-box__select"
            >
              <option value="" disabled selected><span>등록일</span></option>
              <option value="asc">오름차순</option>
              <option value="desc">내림차순</option>
            </select>
          </div> -->
        </div>
        <!-- <div class="search-box">
          <select name="" id="" @change="handleSearchValue" class="search-box__select">
            <option value="name_kr" selected>위치명</option>
            <option value="road_address_kr">주소</option>
            <option value="contact">연락처</option>
            <option value="fax">팩스</option>
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
        </div> -->
      </div>
      <Table :theadData="theadData.location">
        <!-- t-body -->
        <Empty v-if="!locationList" />
        <ul v-else class="td" v-for="(area, idx) in locationList" :key="area.location_pk">
          <li class="w10">{{ area.nowpage > 1 ? (area.nowpage - 1) * 10 + (idx + 1) : idx + 1 }}</li>
          <li class="w10" v-if="locale === 'kr'">{{ area.name_kr }}</li>
          <li class="w10" v-if="locale === 'id'">{{ area.name_id }}</li>
          <li class="w10" v-if="locale === 'pt'">{{ area.name_pt }}</li>
          <li class="w10" v-if="locale === 'en'">{{ area.name_us }}</li>
          <li v-if="locale === 'kr'">{{ area.road_address_kr }}</li>
          <li v-if="locale === 'en'">{{ area.road_address_us }}</li>
          <li v-if="locale === 'id'">{{ area.road_address_id }}</li>
          <li v-if="locale === 'pt'">{{ area.road_address_pt }}</li>
          <li class="w10">{{ area.contact }}</li>
          <li class="w10">{{ area.fax }}</li>
          <li class="w10">{{ area.check_open }}</li>
          <li class="w10">
            <button @click="locationStore.detailLocationAct(area.location_pk, nowPageNum)"><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteLocation(area.location_pk)"><span>삭제</span></button>
          </li>
        </ul>
        <!-- t-body -->
      </Table>
      <div class="section__bottom">
        <AllEntries :nowPage="nowPageNum" :listPage="Number(listPage)" :rowCnt="rowCnt" />
        <Pagination
          :lastPage="Number(lastPage)"
          :nowPage="nowPageNum"
          @goPage="(page) => changePage(page, locationStore.locationListAct, locationStore.searchLocationListAct)"
          @goNextPage="(page) => changePage(page, locationStore.locationListAct, locationStore.searchLocationListAct)"
          @goPrePage="(page) => changePage(page, locationStore.locationListAct, locationStore.searchLocationListAct)"
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
import LocaleList from '@/components/utils/LocaleList.vue';
import { useSelect } from '@/store/utils';
import { theadData } from '@/utils/theadData';
import { usePopupStore } from '@/store/popup';
import { useLocation } from '@/store/location';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import locationApi from '@/api/location';

const selectStore = useSelect();
const locationStore = useLocation();
const popupStore = usePopupStore();
const { locale, showNum } = storeToRefs(selectStore);
const { locationList } = storeToRefs(locationStore);

const nowPageNum = ref(1);
const sortData = ref();
const searchVal = ref('name_kr');
const searchInputRef = ref();
const listPage = ref(10);
const rowCnt = ref(0);
const lastPage = ref(0);

let searchData;

//자사 위치 리스트 조회
await locationStore.locationListAct(1, showNum.value, 'desc');
if (locationList.value) {
  listPage.value = showNum.value < locationList.value[0].rowcnt ? showNum.value : locationList.value[0].rowcnt;
  rowCnt.value = locationList.value[0].rowcnt;
  lastPage.value = locationList.value[0].lastpage;
}

//게시물 갯수가 바뀔 때 사용할 페이지네이션 변경 상수들
const paginationConstant = () => {
  nowPageNum.value = 1;
  rowCnt.value = locationList.value[0].rowcnt;
  lastPage.value = locationList.value[0].lastpage;
};

//게시물 갯수 변경 함수
function showList(num) {
  const nowPage = locationList.value[0].nowpage;
  listPage.value = Number(num);
  if (!sortData.value && !searchInputRef.value) {
    locationStore.locationListAct(nowPage, showNum.value, 'desc').then(() => {
      paginationConstant();
    });
  } else if (sortData.value && !searchInputRef.value) {
    locationStore.locationListAct(nowPage, showNum.value, sortData.value).then(() => {
      paginationConstant();
    });
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    locationStore.locationListAct(nowPage, showNum.value, 'desc', searchData).then(() => {
      paginationConstant();
    });
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    locationStore.locationListAct(nowPage, showNum.value, sortData.value, searchData).then(() => {
      paginationConstant();
    });
  }
}

watch(showNum, (newShowNum) => {
  if (newShowNum < locationList.value[0].rowcnt) {
    showList(newShowNum);
  } else {
    showList(showNum.value);
  }
});

//페이지 변경
function changePage(page) {
  if (!sortData.value && !searchInputRef.value) {
    locationStore.locationListAct(page, showNum.value, 'desc');
  } else if (sortData.value && !searchInputRef.value) {
    locationStore.locationListAct(page, showNum.value, sortData.value);
  } else if (!sortData.value && searchInputRef.value) {
    searchData = {
      [searchVal.value]: searchInputRef.value
    };
    locationStore.searchLocationListAct(page, showNum.value, 'desc', searchData);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    locationStore.searchLocationListAct(page, showNum.value, sortData.value, searchData);
  }
  nowPageNum.value = page;
}

//등록일 sort
function sorting(e) {
  sortData.value = e.target.value;
  if (!searchInputRef.value) {
    locationStore.locationListAct(nowPageNum.value, listPage.value, sortData.value);
  } else {
    searchData = { [searchVal.value]: searchInputRef.value };
    locationStore.searchLocationListAct(1, listPage.value, sortData.value, searchData);
  }
}

//등록하기 버튼 클릭
function clickRegisterBtn() {
  popupStore.locationOpen();
  locationStore.currentLocationPageAct(nowPageNum.value);
}

//검색 조건 변경
function handleSearchValue(e) {
  searchVal.value = e.target.value;
}

//검색 버튼 클릭
async function searchBtnClick() {
  searchData = { [searchVal.value]: searchInputRef.value };
  await locationStore
    .locationListAct(1, showNum.value, 'desc', searchData)
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

//자사 위치 삭제
function deleteLocation(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    locationApi
      .fetchDeleteLocation(pk)
      .then((res) => {
        if (res.data.status === 200) {
          if (!sortData.value) {
            locationStore.locationListAct(nowPageNum.value, showNum.value, 'desc');
          } else {
            locationStore.locationListAct(nowPageNum.value, showNum.value, sortData.value);
          }
        }
      })
      .catch((err) => alert('삭제에 실패하였습니다.'));
  } else return false;
}
</script>
<style lang="scss" scoped></style>
