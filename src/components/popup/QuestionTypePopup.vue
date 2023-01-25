<template>
  <div class="cover" @click="popupStore.questionTypeClose"></div>
  <div class="popup">
    <div class="popup__header">
      <h1 v-if="!detailQuestionType" class="popup__header__title">문의유형 등록</h1>
      <h1 v-else class="popup__header__title">문의유형 등록</h1>
      <button @click="popupStore.questionTypeClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" id="form">
      <div class="popup__body">
        <Input name="name_kr" title="문의유형명(한국어)" v-model="krType" />
        <Input name="name_id" title="문의유형명(인도네시아어)" v-model="idType" />
        <Input name="name_pt" title="문의유형명(포르투갈어)" v-model="ptType" />
        <Input name="name_us" title="문의유형명(영어)" v-model="enType" />
      </div>
      <div class="popup__footer">
        <button v-if="!detailQuestionType" @click.prevent="uploadQuestionType" class="popup__footer__btn">
          <span>등록</span>
        </button>
        <button v-else @click.prevent="editQuestionType" class="popup__footer__btn"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import Input from '@/components/form/Input.vue';
import questionTypeApi from '@/api/questionType';
import { useQuestionType } from '@/store/questionType';
import { usePopupStore } from '@/store/popup';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const popupStore = usePopupStore();
const questionTypeStore = useQuestionType();
const selectStore = useSelect();

const { detailQuestionType, questionTypePage } = storeToRefs(questionTypeStore);
const { showNum } = storeToRefs(selectStore);

const krType = ref('');
const idType = ref('');
const ptType = ref('');
const enType = ref('');

//수정 팝업 랜더링 시 데이터 삽입
if (detailQuestionType.value) {
  krType.value = detailQuestionType.value.name_kr;
  idType.value = detailQuestionType.value.name_id;
  ptType.value = detailQuestionType.value.name_pt;
  enType.value = detailQuestionType.value.name_us;
}

//문의 유형 등록
function uploadQuestionType() {
  if (krType.value.length == 0 || idType.value.length == 0 || ptType.value.length == 0 || enType.value.length == 0) {
    alert('모든 내용을 입력해주세요');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    questionTypeApi
      .fetchUploadQnaType(formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.questionTypeClose();
          questionTypeStore.questionTypeListAct(questionTypePage.value, showNum.value, 'desc');
        }
      })
      .catch((err) => alert('등록에 실패하였습니다.'));
  }
}

//문의 유형 수정
function editQuestionType() {
  if (krType.value.length == 0 || idType.value.length == 0 || ptType.value.length == 0 || enType.value.length == 0) {
    alert('모든 내용을 입력해주세요');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    questionTypeApi
      .fetchEditQnaType(detailQuestionType.value.question_type_pk, formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.questionTypeClose();
          questionTypeStore.questionTypeListAct(questionTypePage.value, showNum.value, 'desc');
        }
      })
      .catch((err) => alert('수정에 실패하였습니다.'));
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/popup.scss';
</style>
