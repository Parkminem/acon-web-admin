<template>
  <div class="cover" @click="popupStore.historyClose"></div>
  <div class="inner">
    <div class="popupHeader">
      <h1 v-if="!detailHistory">연혁 등록</h1>
      <h1 v-else>연혁 수정</h1>
      <button @click="popupStore.historyClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" id="form">
      <div class="popupBody">
        <Select name="year" title="년도" id="year" :arr="yearArr" v-model="yearRef" :selected="Number(yearRef)" />
        <Select name="month" title="월" id="month" :arr="monthArr" v-model="monthRef" :selected="Number(monthRef)" />
        <Radio
          name="active_flag"
          title="활성화 여부"
          v-model="isActiveRef"
          value01="1"
          value02="-1"
          :checked="isActiveRef"
        />
        <Input name="content_kr" title="내용(한국어)" v-model="contentKrRef" placeholder="IDEACONCERT" />
        <Input name="content_id" title="내용(인도네시아어)" v-model="contentIdRef" placeholder="IDEACONCERT" />
        <Input name="content_pt" title="내용(포르투갈어)" v-model="contentPtRef" placeholder="IDEACONCERT" />
        <Input name="content_us" title="내용(영어)" v-model="contentEnRef" placeholder="IDEACONCERT" />
      </div>
      <div class="popupFooter">
        <button v-if="!detailHistory" @click.prevent="uploadHistory"><span>등록</span></button>
        <button v-else @click.prevent="editHistory"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { usePopupStore } from '@/store/popup';
import Input from '@/components/form/Input.vue';
import Radio from '@/components/form/Radio.vue';
import Select from '@/components/form/Select.vue';
import { ref } from 'vue';
import { useHistory } from '@/store/history';
import { storeToRefs } from 'pinia';
import historyApi from '@/api/history';

const popupStore = usePopupStore();
const historyStore = useHistory();
const { detailHistory } = storeToRefs(historyStore);
const contentKrRef = ref('');
const contentIdRef = ref('');
const contentPtRef = ref('');
const contentEnRef = ref('');
const isActiveRef = ref('');
const yearRef = ref('');
const monthRef = ref();
const currentYear = new Date().getFullYear();

//수정 팝업 랜더링 시 데이터 삽입
if (detailHistory.value) {
  contentKrRef.value = detailHistory.value.content_kr;
  contentIdRef.value = detailHistory.value.content_id;
  contentPtRef.value = detailHistory.value.content_pt;
  contentEnRef.value = detailHistory.value.content_us;
  monthRef.value = detailHistory.value.month;
  yearRef.value = detailHistory.value.year;
  if (detailHistory.value.active_flag == 1) {
    isActiveRef.value = '1';
  } else {
    isActiveRef.value = '-1';
  }
}

//연혁 등록
function uploadHistory() {
  if (
    contentKrRef.value.length == 0 ||
    contentIdRef.value.length == 0 ||
    contentPtRef.value.length == 0 ||
    contentEnRef.value.length == 0 ||
    !isActiveRef.value
  ) {
    alert('모든 내용을 입력해주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    historyApi
      .fetchUploadHistory(formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.historyClose();
          window.location.href = '/history';
        }
      })
      .catch((err) => console.log(err));
  }
}

//연혁 수정
function editHistory() {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  historyApi
    .fetchEditHistory(detailHistory.value.history_pk, formData)
    .then((res) => {
      if (res.data.status === 200) {
        popupStore.historyClose();
      }
    })
    .catch((err) => {
      alert('수정에 실패하였습니다.');
    });
}

//년도, 월 옵션 값
let yearArr = [];
for (let i = 2015; i <= currentYear; i++) {
  yearArr.push(i);
}
yearArr.reverse();
const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>
<style lang="scss">
@import '@/style/popup.scss';
</style>
