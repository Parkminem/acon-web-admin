<template>
  <div class="cover" @click="popupStore.partnerClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1 v-if="!partnersList">파트너사 등록</h1>
      <h1 v-else>파트너사 등록</h1>
      <button @click="popupStore.partnerClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" enctype="multipart/form-data" id="form">
      <div class="popupBody">
        <Input name="name_kr" title="파트너사명(한국어)" placeholder="IDEACONCERT" v-model="krPartner" />
        <Input name="name_id" title="파트너사명(인도네시아어)" placeholder="IDEACONCERT" v-model="idPartner" />
        <Input name="name_pt" title="파트너사명(포르투갈어)" placeholder="IDEACONCERT" v-model="ptPartner" />
        <Input name="name_us" title="파트너사명(영어)" placeholder="IDEACONCERT" v-model="enPartner" />
        <Input name="url" title="파트너사 홈페이지" placeholder="http://ideaconcert.com" v-model="homepage" />
        <File title="로고" @fileValue="emitFile" />
      </div>
      <div class="popupFooter">
        <button v-if="!partnersList" @click.prevent="submit"><span>등록</span></button>
        <button v-else @click.prevent="submit"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import File from '@/components/form/File.vue';
import { ref } from 'vue';
import { usePopupStore } from '@/store/popup';
import { usePartners } from '@/store/partners';
import { storeToRefs } from 'pinia';

const popupStore = usePopupStore();
const partnersStore = usePartners();

const { partnersList } = storeToRefs(partnersStore);

const krPartner = ref('');
const idPartner = ref('');
const ptPartner = ref('');
const enPartner = ref('');
const homepage = ref('');
const file = ref();

function emitFile(val) {
  file.value = val;
}

//

// console.log(file.value.files);
</script>
<style lang="scss" scoped>
@import '@/assets/style/popup.scss';
</style>
