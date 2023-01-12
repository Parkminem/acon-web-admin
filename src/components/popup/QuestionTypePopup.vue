<template>
  <div class="cover" @click="popupStore.questionTypeClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>문의유형 등록</h1>
      <button @click="popupStore.questionTypeClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="">
      <div class="popupBody">
        <Input title="문의유형명(한국어)" v-model="krType" />
        <Input title="문의유형명(인도네시아어)" v-model="idType" />
        <Input title="문의유형명(포르투갈어)" v-model="ptType" />
        <Input title="문의유형명(영어)" v-model="enType" />
      </div>
      <div class="popupFooter">
        <button @click.prevent="submit"><span>등록</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Input from '@/components/form/Input.vue';
import { usePopupStore } from '@/store/popup';

const popupStore = usePopupStore();

const krType = ref('');
const idType = ref('');
const ptType = ref('');
const enType = ref('');

function submit() {
  //axios
}
</script>
<style lang="scss" scoped>
@import '@/components/style/popup.scss';
</style>
