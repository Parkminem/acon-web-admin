<template>
  <div class="cover" @click="popupStore.historyClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1>연혁 등록</h1>
      <button @click="popupStore.historyClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" @submit.prevent="submit">
      <div class="popupBody">
        <Select title="년도" id="year" :arr="yearArr" v-model="year" />
        <Select title="월" id="month" :arr="monthArr" v-model="month" />
        <Radio title="활성화 여부" v-model="isActive" value01="yes" value02="no" />
        <Input title="내용(한국어)" v-model="krDesc" placeholder="IDEACONCERT" />
        <Input title="내용(인도네시아어)" v-model="idDesc" placeholder="IDEACONCERT" />
        <Input title="내용(포르투갈어)" v-model="ptDesc" placeholder="IDEACONCERT" />
        <Input title="내용(영어)" v-model="enDesc" placeholder="IDEACONCERT" />
      </div>
      <div class="popupFooter">
        <button><span>등록</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { usePopupStore } from '../../store/popup';
import Input from '../../form/Input.vue';
import Radio from '../../form/Radio.vue';
import Select from '../../form/Select.vue';
import { ref } from 'vue';
import { useHistory } from '../../store/history';
import { storeToRefs } from 'pinia';

const popupStore = usePopupStore();
const historyStore = useHistory();
const { detailHistory } = storeToRefs(historyStore);
const krDesc = ref('');
const idDesc = ref('');
const ptDesc = ref('');
const enDesc = ref('');
const isActive = ref('');
const year = ref('');
const month = ref('');

if (detailHistory === null) {
  return;
} else {
  krDesc.value = detailHistory.value.content_kr;
  idDesc.value = detailHistory.value.content_id;
  ptDesc.value = detailHistory.value.content_pt;
  enDesc.value = detailHistory.value.content_us;
  month.value = detailHistory.value.month;
  year.value = detailHistory.value.year;
  if (detailHistory.value.active_flag == 1) {
    isActive.value = 'yes';
  } else {
    isActive.value = 'no';
  }
}

//년도, 월 옵션 값
const currentYear = new Date().getFullYear();
let yearArr = [];
for (let i = 2015; i <= currentYear; i++) {
  yearArr.push(i);
}
yearArr.reverse();
const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function submit() {
  //axios
}
</script>
<style lang="scss">
@import '../../style/popup.scss';
</style>
