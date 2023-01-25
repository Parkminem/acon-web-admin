<template>
  <div class="cover" @click="popupStore.promotionClose"></div>
  <div class="popup">
    <div class="popup__header">
      <h1 v-if="!detailPromotion" class="popup__header__title">프로모션 영상 등록</h1>
      <h1 v-else class="popup__header__title">프로모션 영상 수정</h1>
      <button @click="popupStore.promotionClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" id="form">
      <div class="popup__body">
        <Input name="promotion_name" title="홍보영상 이름" placeholder="쿠키런" v-model="name" />
        <Input
          name="promotion_url"
          title="홍보영상 유튜브 주소"
          placeholder="https://www.youtube.com/watch?v=VHo2U9lqV4Y"
          v-model="url"
        />
        <Checkbox name="view_status" title="홍보영상 공개 여부" v-model="openCheck" :checked="openCheck" />
      </div>
      <div class="popup__footer">
        <button v-if="!detailPromotion" @click.prevent="uploadPromotion" class="popup__footer__btn">
          <span>등록</span>
        </button>
        <button v-else @click.prevent="editPromotion" class="popup__footer__btn"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import Checkbox from '@/components/form/Checkbox.vue';
import { usePopupStore } from '@/store/popup';
import { usePromotion } from '@/store/promotion';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSelect } from '@/store/utils';
import promotionApi from '@/api/promotion';

const popupStore = usePopupStore();
const promotionStore = usePromotion();
const selectStore = useSelect();

const { detailPromotion, promotionPage } = storeToRefs(promotionStore);
const { showNum } = storeToRefs(selectStore);
const name = ref('');
const url = ref('');
const openCheck = ref(false);

//수정 팝업 랜더링 시 데이터 삽입
if (detailPromotion.value) {
  name.value = detailPromotion.value.promotion_name;
  url.value = detailPromotion.value.promotion_url;
  openCheck.value = detailPromotion.value.view_status === 'Y' ? true : false;
}

//프로모션 등록
function uploadPromotion() {
  if (name.value.length == 0 || url.value.length == 0) {
    alert('모든 내용을 입력해주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    formData.append('view_status', openCheck.value ? 'Y' : 'N');
    promotionApi
      .fetchUploadPromotion(formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.promotionClose();
          promotionStore.promotionListAct(promotionPage.value, showNum.value, 'desc');
        }
      })
      .catch((err) => {
        alert('등록에 실패하였습니다.');
      });
  }
}

//프로모션 수정
function editPromotion() {
  if (name.value.length == 0 || url.value.length == 0) {
    alert('모든 내용을 입력해주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    formData.append('view_status', openCheck.value ? 'Y' : 'N');
    promotionApi
      .fetchEditPromotion(detailPromotion.value.promotion_pk, formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.promotionClose();
          promotionStore.promotionListAct(promotionPage.value, showNum.value, 'desc');
        }
      })
      .catch((err) => alert('수정에 실패하였습니다.'));
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/popup.scss';
</style>
