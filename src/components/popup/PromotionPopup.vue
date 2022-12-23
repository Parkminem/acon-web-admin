<template>
  <div class="cover" @click="popupStore.promotionClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>프로모션 영상 등록</h1>
      <button @click="popupStore.promotionClose"><span class="material-icons"> close </span></button>
    </div>
    <div class="popupBody">
      <div class="inputBox">
        <label>홍보영상 이름</label>
        <input type="text" placeholder="쿠키런" />
      </div>
      <div class="inputBox">
        <label>홍보영상 유튜브 주소</label>
        <input type="text" placeholder="https://www.youtube.com/watch?v=VHo2U9lqV4Y" />
      </div>
      <div class="inputBox">
        <div class="checkBox">
          <label>홍보영상 공개 여부</label>
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
import { usePopupStore } from '../../store/popup';

const popupStore = usePopupStore();

// close 와 함께 값 빈칸 만들어야함
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
