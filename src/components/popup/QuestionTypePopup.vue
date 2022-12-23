<template>
  <div class="cover" @click="popupStore.questionTypeClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>문의유형 등록</h1>
      <button @click="popupStore.questionTypeClose"><span class="material-icons"> close </span></button>
    </div>
    <div class="popupBody">
      <div class="inputBox">
        <label>문의유형명(한국어)</label>
        <input type="text" placeholder="" />
      </div>
      <div class="inputBox">
        <label>문의유형명(인도네시아어)</label>
        <input type="text" placeholder="" />
      </div>
      <div class="inputBox">
        <label>문의유형명(포르투갈어)</label>
        <input type="text" placeholder="" />
      </div>
      <div class="inputBox">
        <label>문의유형명(영어)</label>
        <input type="text" placeholder="" />
      </div>
    </div>
    <div class="popupFooter">
      <button><span>등록</span></button>
    </div>
  </div>
</template>
<script setup>
import { usePopupStore } from '../../store/popup';

const popupStore = usePopupStore();

// close 와 함께 값 빈칸 만들어야함
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
