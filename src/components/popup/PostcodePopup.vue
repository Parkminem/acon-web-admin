<template>
  <div class="inputBox">
    <label>주소(한국어)</label>
    <input type="text" class="address" v-model="post" placeholder="우편번호" readonly />
    <input type="text" class="address" v-model="address01" placeholder="도로명주소(한국어)" readonly />
    <input
      type="text"
      v-model="address02"
      placeholder="상세주소(한국어)"
      style="margin-bottom: 10px"
      @input="$emit('address02', $event.target.value)"
    />
    <button class="addressBtn" @click="search" type="button"><span>주소 검색</span></button>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { usePopupStore } from '@/store/popup';
const popupStore = usePopupStore();
const { locationPopupState } = storeToRefs(popupStore);

const post = ref('');
const address01 = ref('');
const address02 = ref('');

const emit = defineEmits();
function search() {
  new window.daum.Postcode({
    oncomplete: (data) => {
      //function이 아니라 => 로 바꿔야한다.
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var roadAddr = data.roadAddress; // 도로명 주소 변수
      var extraRoadAddr = ''; // 참고 항목 변수

      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraRoadAddr += extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraRoadAddr !== '') {
        extraRoadAddr = ' (' + extraRoadAddr + ')';
      }
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      post.value = data.zonecode;
      address01.value = roadAddr;
      emit('post', post.value);
      emit('address01', address01.value);
    }
  }).open();
}
function closePost() {
  new window.daum.Postcode({}).close();
}

if (!locationPopupState.value) {
  closePost();
}
</script>
<style lang="scss" scoped>
@import '@/style/popup.scss';
</style>
