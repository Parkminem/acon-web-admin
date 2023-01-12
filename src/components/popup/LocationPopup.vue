<template>
  <div class="cover" @click="popupStore.locationClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1 v-if="!detailLocation">위치 등록</h1>
      <h1 v-else>위치 수정</h1>
      <button @click="popupStore.locationClose"><span class="material-icons"> close </span></button>
    </div>
    <form @submit.prevent="submit">
      <div class="popupBody">
        <Input title="위치명(한국어)" placeholder="판교 본사" v-model="krArea" />
        <Input title="위치명(인도네시아어)" placeholder="판교 본사" v-model="idArea" />
        <Input title="위치명(포르투갈어)" placeholder="판교 본사" v-model="ptArea" />
        <Input title="위치명(영어)" placeholder="판교 본사" v-model="enArea" />
        <Input title="연락처" placeholder="070-8825-5004" v-model="tel" />
        <Input title="팩스" placeholder="031-5182-9048" v-model="fax" />
        <PostcodePopup @post="emitPost" @address01="emitAddress01" @address02="emitAddress02" />
        <Input title="주소(인도네시아어)" placeholder="상세주소(인도네시아어)" v-model="idAddress02">
          <input type="text" placeholder="도로명주소(인도네시아어)" style="margin-bottom: 10px" v-model="idAddress01" />
        </Input>
        <Input title="주소(포르투갈어)" placeholder="상세주소(포르투갈어)" v-model="ptAddress02">
          <input type="text" placeholder="도로명주소(포르투갈어)" style="margin-bottom: 10px" v-model="ptAddress01" />
        </Input>
        <Input title="주소(영어)" placeholder="상세주소(영어)" v-model="enAddress02">
          <input type="text" placeholder="도로명주소(영어)" style="margin-bottom: 10px" v-model="enAddress01" />
        </Input>
        <Checkbox title="공개 여부(푸터 정보란)" v-model="openCheck" />
      </div>
      <div class="popupFooter">
        <button v-if="!detailLocation" @click.prevent="uploadLocation"><span>등록</span></button>
        <button v-else @click.prevent="editLocation"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import PostcodePopup from './PostcodePopup.vue';
import Checkbox from '@/components/form/Checkbox.vue';
import { usePopupStore } from '@/store/popup';
import { useLocation } from '@/store/location';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import locationApi from '@/api/location';
const popupStore = usePopupStore();
const locationStore = useLocation();
const { detailLocation } = storeToRefs(locationStore);

const krArea = ref('');
const idArea = ref('');
const ptArea = ref('');
const enArea = ref('');
const tel = ref('');
const fax = ref('');
const ptAddress01 = ref('');
const ptAddress02 = ref('');
const idAddress01 = ref('');
const idAddress02 = ref('');
const enAddress01 = ref('');
const enAddress02 = ref('');
const post = ref('');
const address01 = ref('');
const address02 = ref('');
const openCheck = ref('');

function emitPost(postVal) {
  post.value = postVal;
}
function emitAddress01(address01Val) {
  address01.value = address01Val;
}
function emitAddress02(address02Val) {
  address02.value = address02Val;
}

//수정 팝업 랜더링 시 데이터 삽입
if (detailLocation.value) {
  krArea.value = detailLocation.value.name_kr;
  idArea.value = detailLocation.value.name_id;
  ptArea.value = detailLocation.value.name_pt;
  enArea.value = detailLocation.value.name_us;
  tel.value = detailLocation.value.contact;
  fax.value = detailLocation.value.fax;
  ptAddress01.value = detailLocation.value.road_address_pt;
  ptAddress02.value = detailLocation.value.detail_address_pt;
  idAddress01.value = detailLocation.value.road_address_id;
  idAddress02.value = detailLocation.value.detail_address_id;
  enAddress01.value = detailLocation.value.road_address_us;
  enAddress02.value = detailLocation.value.detail_address_us;
  post.value = detailLocation.value.post_code;
  address01.value = detailLocation.value.road_address_kr;
  address02.value = detailLocation.value.detail_address_kr;
  if (detailLocation.value.check_open === 'Y') openCheck.value = true;
  else openCheck.value = false;
}

//자사 위치 등록
function uploadLocation() {
  if (
    krArea.value.length == 0 ||
    idArea.value.length == 0 ||
    ptArea.value == 0 ||
    enArea.value.length == 0 ||
    tel.value.length == 0 ||
    fax.value.length == 0 ||
    address01.value.length == 0 ||
    address02.value.length == 0 ||
    ptAddress01.value.length == 0 ||
    idAddress01.value.length == 0 ||
    enAddress01.value.length == 0 ||
    post.value.length == 0
  ) {
    alert('모든 내용을 입력해주세요');
  } else {
    const inputObj = {
      name_kr: krArea.value,
      name_id: idArea.value,
      name_pt: ptArea.value,
      name_us: enArea.value,
      post_code: post.value,
      road_address_kr: address01.value,
      road_address_id: idAddress01.value,
      road_address_pt: ptAddress01.value,
      road_address_us: enAddress01.value,
      detail_address_kr: address02.value,
      detail_address_id: idAddress02.value,
      detail_address_pt: ptAddress02.value,
      detail_address_us: enAddress02.value,
      contact: tel.value,
      fax: fax.value,
      check_open: !check_open.value ? 'N' : 'Y'
    };
    locationApi
      .fetchUploadLocation(inputObj)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.locationClose();
          window.location.href = '/location';
        }
      })
      .catch((err) => console.log(err));
  }
}

//자사 위치 수정
function editLocation() {
  if (
    krArea.value.length == 0 ||
    idArea.value.length == 0 ||
    ptArea.value == 0 ||
    enArea.value.length == 0 ||
    tel.value.length == 0 ||
    fax.value.length == 0 ||
    address01.value.length == 0 ||
    address02.value.length == 0 ||
    ptAddress01.value.length == 0 ||
    idAddress01.value.length == 0 ||
    enAddress01.value.length == 0 ||
    post.value.length == 0
  ) {
    alert('모든 내용을 등록해주세요');
  } else {
    const inputObj = {
      location_pk: detailLocation.value.location_pk,
      name_kr: krArea.value,
      name_id: idArea.value,
      name_pt: ptArea.value,
      name_us: enArea.value,
      post_code: post.value,
      road_address_kr: address01.value,
      road_address_id: idAddress01.value,
      road_address_pt: ptAddress01.value,
      road_address_us: enAddress01.value,
      detail_address_kr: address02.value,
      detail_address_id: idAddress02.value,
      detail_address_pt: ptAddress02.value,
      detail_address_us: enAddress02.value,
      contact: tel.value,
      fax: fax.value,
      check_open: !check_open.value ? 'N' : 'Y'
    };
    locationApi
      .fetchEditLocation(inputObj)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.locationClose();
          window.location.href = '/location';
        }
      })
      .catch((err) => console.log(err));
  }
}
</script>
<style lang="scss" scoped>
@import '@/style/popup.scss';
</style>
