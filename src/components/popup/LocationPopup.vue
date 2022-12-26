<template>
  <div class="cover" @click="popupStore.locationClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>위치 등록</h1>
      <button @click="popupStore.locationClose"><span class="material-icons"> close </span></button>
    </div>
    <div class="popupBody">
      <div class="inputBox">
        <label>위치명(한국어)</label>
        <input type="text" placeholder="판교 본사" />
      </div>
      <div class="inputBox">
        <label>위치명(인도네시아어)</label>
        <input type="text" placeholder="판교 본사" />
      </div>
      <div class="inputBox">
        <label>위치명(포르투갈어)</label>
        <input type="text" placeholder="판교 본사" />
      </div>
      <div class="inputBox">
        <label>위치명(영어)</label>
        <input type="text" placeholder="판교 본사" />
      </div>
      <div class="inputBox">
        <label>연락처</label>
        <input type="text" placeholder="070-8825-5004" />
      </div>
      <div class="inputBox">
        <label>팩스</label>
        <input type="text" placeholder="031-5182-9048" />
      </div>
      <PostcodePopup />
      <div class="inputBox">
        <label>주소(인도네시아어)</label>
        <input type="text" placeholder="도로명주소(인도네시아어)" style="margin-bottom: 10px" />
        <input type="text" placeholder="상세주소(인도네시아어)" />
      </div>
      <div class="inputBox">
        <label>주소(포르투갈어)</label>
        <input type="text" placeholder="도로명주소(포르투갈어)" style="margin-bottom: 10px" />
        <input type="text" placeholder="상세주소(포르투갈어)" />
      </div>
      <div class="inputBox">
        <label>주소(영어)</label>
        <input type="text" placeholder="도로명주소(영어)" style="margin-bottom: 10px" />
        <input type="text" placeholder="상세주소(영어)" />
      </div>
      <div class="inputBox">
        <div class="checkBox">
          <label>공개 여부(푸터 정보란)</label>
          <input type="checkbox" name="" id="" />
        </div>
      </div>
    </div>
    <div class="popupFooter">
      <button><span>등록</span></button>
    </div>
  </div>
</template>
<script setup>
import PostcodePopup from './PostcodePopup.vue';
import { usePopupStore } from '../../store/popup';
const popupStore = usePopupStore();

// close 와 함께 값 빈칸 만들어야함
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
