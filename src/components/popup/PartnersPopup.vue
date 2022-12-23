<template>
<<<<<<< HEAD
  <div class="cover" @click="popupStore.partnerClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>파트너사 등록</h1>
      <button @click="popupStore.partnerClose"><span class="material-icons"> close </span></button>
    </div>
    <div class="popupBody">
      <div class="inputBox">
        <label>파트너사명(한국어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>파트너사명(인도네시아어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>파트너사명(포르투갈어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>파트너사명(영어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>파트너사 홈페이지</label>
        <input type="text" placeholder="http://ideaconcert.com" />
      </div>
      <div class="inputBox">
        <label>로고</label>
        <div class="fileBox">
          <input type="file" name="" id="file" ref="file" @change="fileUpload" />
          <label for="file"><span ref="fileName" class="fileName"></span><span class="btn">Browse</span></label>
        </div>
=======
  <div class="cover" @click="popupStore.historyClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>연혁 등록</h1>
      <button @click="popupStore.historyClose"><span class="material-icons"> close </span></button>
    </div>
    <div class="popupBody">
      <div class="inputBox">
        <label>년도</label>
        <select name="" id="">
          <option value="" v-for="year in yearArr" :key="year">{{ year }}</option>
        </select>
      </div>
      <div class="inputBox">
        <label>월</label>
        <select name="" id="">
          <option value="" v-for="month in 12" :key="month">{{ month }}</option>
        </select>
      </div>
      <div class="inputBox">
        <label>활성화 여부</label>
        <div class="radioBox">
          <label for="active01"><input type="radio" name="active" id="active01" /><span>예</span></label>
        </div>
        <div class="radioBox">
          <label for="active02"><input type="radio" name="active" id="active02" /><span>아니오</span></label>
        </div>
      </div>
      <div class="inputBox">
        <label>내용(한국어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>내용(인도네시아어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>내용(포르투갈어)</label>
        <input type="text" placeholder="IDEACONCERT" />
      </div>
      <div class="inputBox">
        <label>내용(영어)</label>
        <input type="text" placeholder="IDEACONCERT" />
>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274
      </div>
    </div>
    <div class="popupFooter">
      <button><span>등록</span></button>
    </div>
  </div>
</template>
<script setup>
<<<<<<< HEAD
import { ref } from 'vue';
import { usePopupStore } from '../../store/popup';
const popupStore = usePopupStore();

const file = ref();
const fileName = ref();

function fileUpload() {
  fileName.value.innerText = file.value.files[0].name;
  console.log(file.value.files[0].name);
}
=======
import { usePopupStore } from '../../store/popup';
const popupStore = usePopupStore();

>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274
//년도 옵션 값
const currentYear = new Date().getFullYear();
let yearArr = [];
for (let i = 2015; i <= currentYear; i++) {
  yearArr.push(i);
  yearArr.reverse();
}
// close 와 함께 값 빈칸 만들어야함
</script>
<style lang="scss" scoped>
@import '../../style/popup.scss';
</style>
