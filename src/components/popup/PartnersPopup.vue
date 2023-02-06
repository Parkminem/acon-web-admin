<template>
  <div class="cover" @click="popupStore.partnerClose"></div>
  <div class="popup">
    <div class="popup__header">
      <h1 v-if="!detailPartner" class="popup__header__title">파트너사 등록</h1>
      <h1 v-else class="popup__header__title">파트너사 수정</h1>
      <button @click="popupStore.partnerClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" enctype="multipart/form-data" id="form">
      <div class="popup__body">
        <Input name="name_kr" title="파트너사명(한국어)" placeholder="IDEACONCERT" v-model="krPartner" />
        <Input name="name_id" title="파트너사명(인도네시아어)" placeholder="IDEACONCERT" v-model="idPartner" />
        <Input name="name_pt" title="파트너사명(포르투갈어)" placeholder="IDEACONCERT" v-model="ptPartner" />
        <Input name="name_us" title="파트너사명(영어)" placeholder="IDEACONCERT" v-model="enPartner" />
        <Input name="url" title="파트너사 홈페이지" placeholder="http://ideaconcert.com" v-model="homepage" />
        <File title="로고" @fileValue="emitFile" :name="fileName" dataName="file" />
      </div>
      <div class="popup__footer">
        <button v-if="!detailPartner" @click.prevent="uploadPartner" class="popup__footer__btn">
          <span>등록</span>
        </button>
        <button v-else @click.prevent="editPartner" class="popup__footer__btn"><span>수정</span></button>
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
          popupStore.partnerClose();
          partnersStore.partnersListAct();
        }
      })
      .catch((err) => alert('등록에 실패하였습니다.'));
  }
}
//파트너사 수정
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
    const edit = (data) => {
      partnersApi
        .fetchEditPartners(detailPartner.value.partner_pk, data)
        .then((res) => {
          if (res.data.status === 200) {
            popupStore.partnerClose();
            partnersStore.partnersListAct();
          }
        })
        .catch((err) => {
          alert('수정에 실패하였습니다.');
        });
    };
    //파일 수정X
    if (detailPartner.value.logo_origin_name === fileName.value) {
      const form = document.getElementById('form');
      const formData = new FormData(form);
      formData.delete('file');
      edit(formData);
    }
    //파일 수정
    if (file.value) {
      const form = document.getElementById('form');
      const formData = new FormData(form);
      edit(formData);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/manager/style/popup.scss';
</style>
