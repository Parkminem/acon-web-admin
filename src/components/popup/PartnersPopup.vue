<template>
  <div class="cover" @click="popupStore.partnerClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>파트너사 등록</h1>
      <button @click="popupStore.partnerClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" enctype="multipart/form-data">
      <div class="popupBody">
        <Input title="파트너사명(한국어)" placeholder="IDEACONCERT" v-model="krPartner" />
        <Input title="파트너사명(인도네시아어)" placeholder="IDEACONCERT" v-model="idPartner" />
        <Input title="파트너사명(포르투갈어)" placeholder="IDEACONCERT" v-model="ptPartner" />
        <Input title="파트너사명(영어)" placeholder="IDEACONCERT" v-model="enPartner" />
        <Input title="파트너사 홈페이지" placeholder="http://ideaconcert.com" v-model="homepage" />
        <File title="로고" @fileValue="emitFile" />
      </div>
      <div class="popupFooter">
        <button @click.prevent="submit"><span>등록</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '../../form/Input.vue';
import File from '../../form/File.vue';
import { ref } from 'vue';
import { usePopupStore } from '../../store/popup';

const popupStore = usePopupStore();

const krPartner = ref('');
const idPartner = ref('');
const ptPartner = ref('');
const enPartner = ref('');
const homepage = ref('');
const file = ref();

function emitFile(val) {
  file.value = val;
}
function submit() {
  //axios
  console.log(file.value.files);
}
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
