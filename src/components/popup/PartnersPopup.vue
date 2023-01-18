<template>
  <div class="cover" @click="popupStore.partnerClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1 v-if="!detailPartner">파트너사 등록</h1>
      <h1 v-else>파트너사 수정</h1>
      <button @click="popupStore.partnerClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" enctype="multipart/form-data" id="form">
      <div class="popupBody">
        <Input name="name_kr" title="파트너사명(한국어)" placeholder="IDEACONCERT" v-model="krPartner" />
        <Input name="name_id" title="파트너사명(인도네시아어)" placeholder="IDEACONCERT" v-model="idPartner" />
        <Input name="name_pt" title="파트너사명(포르투갈어)" placeholder="IDEACONCERT" v-model="ptPartner" />
        <Input name="name_us" title="파트너사명(영어)" placeholder="IDEACONCERT" v-model="enPartner" />
        <Input name="url" title="파트너사 홈페이지" placeholder="http://ideaconcert.com" v-model="homepage" />
        <File title="로고" @fileValue="emitFile" :name="fileName" />
      </div>
      <div class="popupFooter">
        <button v-if="!detailPartner" @click.prevent="uploadPartner"><span>등록</span></button>
        <button v-else @click.prevent="editPartner"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import File from '@/components/form/File.vue';
import { ref } from 'vue';
import partnersApi from '@/api/partners';
import { usePopupStore } from '@/store/popup';
import { usePartners } from '@/store/partners';
import { storeToRefs } from 'pinia';

const popupStore = usePopupStore();
const partnersStore = usePartners();

const { detailPartner } = storeToRefs(partnersStore);

const krPartner = ref('');
const idPartner = ref('');
const ptPartner = ref('');
const enPartner = ref('');
const homepage = ref('');
const fileName = ref('');
const file = ref();

function emitFile(val) {
  file.value = val;
}

//수정 팝업 랜더링 시 데이터 삽입
if (detailPartner.value) {
  krPartner.value = detailPartner.value.name_kr;
  idPartner.value = detailPartner.value.name_id;
  ptPartner.value = detailPartner.value.name_pt;
  enPartner.value = detailPartner.value.name_us;
  homepage.value = detailPartner.value.url;
  fileName.value = detailPartner.value.logo_origin_name;
}

//파트너사 등록
function uploadPartner() {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  let reader = new FileReader();
  let src;
  reader.onload = (e) => {
    src = e.target.result;
  };
  reader.readAsDataURL(file.value.files[0]);
  if (
    krPartner.value.length == 0 ||
    idPartner.value.length == 0 ||
    ptPartner.value.length == 0 ||
    enPartner.value.length == 0 ||
    homepage.value.length == 0 ||
    file.value == undefined
  ) {
    alert('모든 내용을 입력해주세요');
  } else {
    partnersApi
      .fetchUploadPartners(formData)
      .then((res) => {
        if (res.data.status === 200) {
          const object = {
            name_kr: krPartner.value,
            name_id: idPartner.value,
            name_pt: ptPartner.value,
            name_us: enPartner.value,
            url: homepage.value,
            src: src,
            partner_pk: res.data.message_detail
          };
          partnersStore.saveNewPartner(object);
          popupStore.partnerClose();
        }
      })
      .catch((err) => console.log(err));
  }
}
//파트너사 수정(파일 수정 X 로직 완료, 파일 수정 시 로직 짜야됨)
function editPartner() {
  if (
    krPartner.value.length == 0 ||
    idPartner.value.length == 0 ||
    ptPartner.value.length == 0 ||
    enPartner.value.length == 0 ||
    homepage.value.length == 0 ||
    fileName.value !== detailPartner.value.logo_origin_name
  ) {
    alert('모든 내용을 입력해주세요');
  } else {
    if (detailPartner.value.logo_origin_name === fileName.value) {
      const formData = new FormData();
      formData.append('name_kr', krPartner.value);
      formData.append('name_id', idPartner.value);
      formData.append('name_pt', ptPartner.value);
      formData.append('name_us', enPartner.value);
      formData.append('url', homepage.value);
      formData.append('logo_file_url', detailPartner.value.logo_file_url);
      formData.append('logo_origin_name', detailPartner.value.logo_origin_name);
      formData.append('logo_save_name', detailPartner.value.logo_save_name);
      partnersApi
        .fetchEditPartners(detailPartner.value.partner_pk, formData)
        .then((res) => {
          if (res.data.status === 200) {
            popupStore.partnerClose();
            window.location.href = '/partners';
          }
        })
        .catch((err) => {
          alert('수정에 실패하였습니다.');
        });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/popup.scss';
</style>
