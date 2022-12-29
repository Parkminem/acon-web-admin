<template>
  <div class="cover" @click="popupStore.locationClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>위치 등록</h1>
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
        <button><span>등록</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '../../form/Input.vue';
import PostcodePopup from './PostcodePopup.vue';
import Checkbox from '../../form/Checkbox.vue';
import { usePopupStore } from '../../store/popup';
import { ref } from 'vue';
const popupStore = usePopupStore();

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
function submit() {
  //axios
}
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
