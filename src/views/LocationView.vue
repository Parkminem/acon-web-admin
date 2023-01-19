<template>
  <SubTitle>위치</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="clickRegisterBtn" />
      <div class="tableTop">
        <div class="left">
          <!-- <ShowList /> -->
          <LocaleList />
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
      <Table :theadData="theadData.location">
        <!-- t-body -->
        <Empty v-if="!locationList" />
        <ul v-else class="td" v-for="area in locationList" :key="area.location_pk">
          <li class="w10">{{ area.location_pk }}</li>
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
      <div class="tableBottom">
        <AllEntries :nowPage="nowPageNum" :listPage="Number(listPage)" :rowCnt="rowCnt" />
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
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import ShowList from '@/components/utils/ShowList.vue';
import SearchBox from '@/components/utils/SearchBox.vue';
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

//자사 위치 리스트 조회
await locationStore.locationListAct(1, showNum.value, 'desc');

const listPage = ref(showNum.value < locationList.value[0].rowcnt ? showNum.value : locationList.value[0].rowcnt);
const rowCnt = locationList.value[0].rowcnt;
const lastPage = ref(locationList.value[0].lastpage);

//게시물 갯수 변경
watch(showNum, (newShowNum) => {
  locationStore.locationListAct(locationList.value[0].nowpage, newShowNum);
});

//페이지 변경
function pageFunc(page) {
  if (!sortData.value) {
    locationStore.locationListAct(page, showNum.value, 'desc');
  } else {
    locationStore.locationListAct(page, showNum.value, sortData.value);
  }
  nowPageNum.value = page;
}
function nextPageFunc(page) {
  if (!sortData.value) {
    locationStore.locationListAct(page + 1, showNum.value, 'desc');
  } else {
    locationStore.locationListAct(page + 1, showNum.value, sortData.value);
  }
  nowPageNum.value = page + 1;
}
function prePageFunc(page) {
  if (!sortData.value) {
    locationStore.locationListAct(page - 1, showNum.value, 'desc');
  } else {
    locationStore.locationListAct(page - 1, showNum.value, sortData.value);
  }
  nowPageNum.value = page - 1;
}

//등록일 sort
function sorting(e) {
  sortData.value = e.target.value;
  locationStore.locationListAct(nowPageNum.value, listPage.value, sortData.value);
}

//등록하기 버튼 클릭
function clickRegisterBtn() {
  popupStore.locationOpen();
  locationStore.currentLocationPageAct(nowPageNum.value);
}

//자사 위치 삭제
function deleteLocation(pk) {
  locationApi
    .fetchDeleteLocation(pk)
    .then((res) => {
      if (res.data.status === 200) {
        locationStore.locationListAct(nowPageNum.value, showNum.value);
      }
    })
    .catch((err) => alert('삭제에 실패하였습니다.'));
}
</script>
<style lang="scss" scoped></style>
