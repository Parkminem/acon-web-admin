<template>
  <SubTitle>문의</SubTitle>
  <div class="container">
    <section class="section">
      <div class="card">
        <div class="title-box">
          <h1 class="title-box__title">문의내용</h1>
        </div>
        <div class="form">
          <div class="form-head">
            <div class="form__row">
              <div class="form__col">
                <div class="form__name col1"><span>문의유형</span></div>
                <div class="form__text">
                  <span>{{ detailQuestion.question_type_kr }}</span>
                </div>
              </div>
              <div class="form__col">
                <div class="form__name"><span>회사명</span></div>
                <div class="form__text">
                  <span>{{ detailQuestion.company }}</span>
                </div>
              </div>
              <div class="form__col">
                <div class="form__name"><span>부서/직급</span></div>
                <div class="form__text">
                  <span>{{ detailQuestion.department_position }}</span>
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="form__col">
                <div class="form__name"><span>이름</span></div>
                <div class="form__text">
                  <span>{{ detailQuestion.name }}</span>
                </div>
              </div>
              <div class="form__col">
                <div class="form__name"><span>연락처</span></div>
                <div class="form__text">
                  <span>{{ detailQuestion.phone }}</span>
                </div>
              </div>
              <div class="form__col">
                <div class="form__name"><span>이메일</span></div>
                <div class="form__text">
                  <span>{{ detailQuestion.email }}</span>
                </div>
              </div>
              <div class="form__col">
                <div class="form__name"><span>등록일</span></div>
                <div class="form__text">
                  <span>{{ new Date(detailQuestion.question_date).toLocaleDateString() }}</span>
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="form__col form__col--column">
                <div class="form__name"><span>내용</span></div>
                <div class="form__text" v-html="detailQuestion.question_content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" v-if="!detailQuestion.answer_content">
        <div class="title-box">
          <h1 class="title-box__title">답변 등록</h1>
        </div>
        <form class="form" id="form">
          <div class="form-head">
            <div class="form__row">
              <div class="form__col">
                <div class="form__name col1"><span>언어</span></div>
                <div class="form__text">
                  <label for="kr"
                    ><input type="radio" name="language" value="KR" :ref="krRef" id="kr" /><span>한국어</span></label
                  >
                  <label for="id"
                    ><input type="radio" name="language" value="ID" id="id" :ref="idRef" /><span
                      >인도네시아어</span
                    ></label
                  >
                  <label for="pt"
                    ><input type="radio" name="language" value="PT" id="pt" :ref="ptRef" /><span
                      >포르투갈어</span
                    ></label
                  >
                  <label for="en"
                    ><input type="radio" name="language" value="US" id="en" :ref="enRef" /><span>영어</span></label
                  >
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="form__col form__col--column">
                <div class="form__name"><span>내용</span></div>
                <div class="form__text">
                  <textarea name="content" id="" cols="30" rows="15" v-model="contentVal"></textarea>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div class="form__btn-box">
          <button @click="sendAnswer" class="form__btn-box__btn"><span>완료</span></button>
        </div>
      </div>
      <div class="card" v-else>
        <div class="title-box">
          <h1 class="title-box__title">답변 내용</h1>
        </div>
        <form class="form" id="form">
          <div class="form-head">
            <div class="form__row">
              <div class="form__col">
                <div class="name col1"><span>언어</span></div>
                <div class="form__text">
                  <label for="kr"
                    ><input
                      type="radio"
                      name="language"
                      value="KR"
                      id="kr"
                      disabled
                      :checked="detailQuestion.language === 'KR'"
                    /><span>한국어</span></label
                  >
                  <label for="id"
                    ><input
                      type="radio"
                      name="language"
                      value="ID"
                      id="id"
                      disabled
                      :checked="detailQuestion.language === 'ID'"
                    /><span>인도네시아어</span></label
                  >
                  <label for="pt"
                    ><input
                      type="radio"
                      name="language"
                      value="PT"
                      id="pt"
                      disabled
                      :checked="detailQuestion.language === 'PT'"
                    /><span>포르투갈어</span></label
                  >
                  <label for="en"
                    ><input
                      type="radio"
                      name="language"
                      value="US"
                      id="en"
                      disabled
                      :checked="detailQuestion.language === 'US'"
                    /><span>영어</span></label
                  >
                </div>
              </div>
            </div>
            <div class="form__row">
              <div class="form__col form__col--column">
                <div class="form__name"><span>내용</span></div>
                <div class="form__text" v-html="detailQuestion.answer_content"></div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import SubTitle from '@/components/common/SubTitle.vue';
import { useQuestion } from '@/store/question';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const questionStore = useQuestion();

const contentVal = ref('');
const krRef = ref('');
const idRef = ref('');
const ptRef = ref('');
const enRef = ref('');

const { detailQuestion } = storeToRefs(questionStore);

//문의 내역 상세 조회
await questionStore.detailQuestionAct(route.query.pk);

//답변 전송
function sendAnswer() {
  if (contentVal.value.length == 0) {
    alert('모든 글을 작성해 주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    formData.append('question_pk', detailQuestion.value.question_pk);
    questionStore.answerAct(formData);
  }
}
</script>
<style lang="scss">
.card {
  &:first-child {
    margin-bottom: 50px;
  }
}
.title-box {
  margin-bottom: 30px;
  &__title {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0;
    color: #333;
  }
}
.form {
  border: 1px solid #333;
  border-radius: 10px;
  &__row {
    display: flex;
    &:not(&:last-child) {
      border-bottom: 1px solid #444;
    }
  }
  &__col {
    width: 100%;
    display: flex;
    &--column {
      flex-direction: column;
      .form__name {
        width: 100%;
      }
      .form__text {
        min-height: 230px;
        textarea {
          overflow: auto;
          resize: none;
          width: 100%;
          outline: none;
          font-size: 14px;
          border: none;
        }
      }
    }
  }
  &__name {
    width: 100px;
    padding: 10px;
    background-color: #444;
    color: #fff;
    text-align: center;
    &.col1 {
      border-radius: 10px 0 0 0;
    }
  }
  &__text {
    padding: 10px;
    label {
      margin-right: 10px;
      span {
        padding-left: 5px;
        font-size: 14px;
      }
    }
  }
  &__btn-box {
    margin-top: 20px;
    &__btn {
      padding: 11px 17px;
      background-color: #343a40;
      color: #fff;
      border-radius: 3px;
      transition: all 0.25s ease-out;
      &:hover {
        background-color: #000;
      }
    }
  }
}

input[type='radio'] {
  vertical-align: middle;
  appearance: none;
  background-color: #ddd;
  width: 17px;
  height: 17px;
  margin: 0;
  border-radius: 100px;
  &:checked {
    border: 5px solid #333;
    background-color: #fff;
  }
}
</style>
