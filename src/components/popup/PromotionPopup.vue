<template>
  <div class="cover" @click="popupStore.promotionClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>프로모션 영상 등록</h1>
      <button @click="popupStore.promotionClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="">
      <div class="popupBody">
        <Input title="홍보영상 이름" placeholder="쿠키런" v-model="name" />
        <Input title="홍보영상 유튜브 주소" placeholder="https://www.youtube.com/watch?v=VHo2U9lqV4Y" v-model="url" />
        <Checkbox title="홍보영상 공개 여부" v-model="openCheck" />
      </div>
      <div class="popupFooter">
        <button @click.prevent="submit"><span>등록</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '../../form/Input.vue';
import Checkbox from '../../form/Checkbox.vue';
import { usePopupStore } from '../../store/popup';
import { ref } from 'vue';

const popupStore = usePopupStore();

const name = ref('');
const url = ref('');
const openCheck = ref('');

function submit() {
  //axios
}
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
