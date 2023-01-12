<template>
  <SubTitle>위치</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().locationOpen" />
      <div class="tableTop">
        <div class="left">
          <ShowList />
          <LocaleList />
        </div>
        <SearchBox />
      </div>
      <Table :theadData="theadData.location">
        <!-- t-body -->
        <ul class="td" v-for="area in location.list" :key="area.location_pk">
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
            <button><span>수정</span></button>
          </li>
          <li class="w10">
            <button @click="deleteLocation(area.location_pk)"><span>삭제</span></button>
          </li>
        </ul>
        <!-- t-body -->
      </Table>
      <div class="tableBottom">
        <AllEntries />
        <Pagination />
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
import empty from '@/components/utils/empty.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import { useSelect } from '@/store/utils';
import { theadData } from '@/components/utils/theadData';
import { usePopupStore } from '@/store/popup';
import { useLocation } from '@/store/location';
import { storeToRefs } from 'pinia';
import { location } from '@/components/utils/dummy';
import { watch } from 'vue';
import locationApi from '@/api/location';

const selectStore = useSelect();
const locationStore = useLocation();
const { locale, showNum } = storeToRefs(selectStore);
const { locationList } = storeToRefs(locationStore);

//자사 위치 리스트 조회
// await locationStore.locationListAct(1, showNum.value);

//게시물 갯수 변경
watch(showNum, (newShowNum) => {
  locationStore.locationListAct(locationList.value[0].nowpage, newShowNum);
});

//자사 위치 삭제
function deleteLocation(pk) {
  locationApi
    .fetchDeleteLocation(pk)
    .then((res) => {
      if (res.data.status === 200) {
        window.location.href = '/location';
      }
    })
    .catch((err) => console.log(err));
}
</script>
<style lang="scss" scoped></style>
