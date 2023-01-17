<template>
  <SubTitle>문의</SubTitle>
  <div class="container">
    <div class="section">
      <div class="card">
        <div class="titleBox">
          <h1>문의내용</h1>
        </div>
        <div class="form">
          <div class="formHead">
            <div class="row">
              <div class="col">
                <div class="name col1"><span>문의유형</span></div>
                <div class="text">
                  <span>{{ detailQuestion.question_type_kr }}</span>
                </div>
              </div>
              <div class="col">
                <div class="name"><span>회사명</span></div>
                <div class="text">
                  <span>{{ detailQuestion.company }}</span>
                </div>
              </div>
              <div class="col">
                <div class="name"><span>부서/직급</span></div>
                <div class="text">
                  <span>{{ detailQuestion.department_position }}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="name"><span>이름</span></div>
                <div class="text">
                  <span>{{ detailQuestion.name }}</span>
                </div>
              </div>
              <div class="col">
                <div class="name"><span>연락처</span></div>
                <div class="text">
                  <span>{{ detailQuestion.phone }}</span>
                </div>
              </div>
              <div class="col">
                <div class="name"><span>이메일</span></div>
                <div class="text">
                  <span>{{ detailQuestion.email }}</span>
                </div>
              </div>
              <div class="col">
                <div class="name"><span>등록일</span></div>
                <div class="text">
                  <span>{{ changeDate(detailQuestion.regdate) }}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col textBox">
                <div class="name"><span>내용</span></div>
                <div class="text" v-html="detailQuestion.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="titleBox">
          <h1>답변 등록</h1>
        </div>
        <form class="form" id="form">
          <div class="formHead">
            <div class="row">
              <div class="col">
                <div class="name col1"><span>언어</span></div>
                <div class="text">
                  <label for="kr"><input type="radio" name="language" value="kr" id="kr" /><span>한국어</span></label>
                  <label for="id"
                    ><input type="radio" name="language" value="id" id="id" /><span>인도네시아어</span></label
                  >
                  <label for="pt"
                    ><input type="radio" name="language" value="pt" id="pt" /><span>포르투갈어</span></label
                  >
                  <label for="en"><input type="radio" name="language" value="en" id="en" /><span>영어</span></label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col textBox">
                <div class="name"><span>내용</span></div>
                <div class="text"><textarea name="" id="" cols="30" rows="15"></textarea></div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="btn">
        <button><span>완료</span></button>
      </div>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '@/components/common/SubTitle.vue';
import { useQuestion } from '@/store/question';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { changeDate } from '@/utils/calculator';

const route = useRoute();
const questionStore = useQuestion();

const { detailQuestion } = storeToRefs(questionStore);

//문의 내역 상세 조회
await questionStore.detailQuestionAct(route.query.pk);
</script>
<style lang="scss">
.card {
  &:first-child {
    margin-bottom: 50px;
  }
  .titleBox {
    margin-bottom: 30px;
    h1 {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0;
      color: #333;
    }
  }
  .form {
    border: 1px solid #333;
    border-radius: 10px;
    &Head {
      .row {
        &:not(&:last-child) {
          border-bottom: 1px solid #444;
        }
        display: flex;
        .col {
          width: 100%;
          display: flex;
          .name {
            width: 100px;
            padding: 10px;
            background-color: #444;
            color: #fff;
            text-align: center;
            &.col1 {
              border-radius: 10px 0 0 0;
            }
          }
          .text {
            padding: 10px;
            label {
              margin-right: 10px;
              span {
                padding-left: 5px;
                font-size: 14px;
              }
            }
          }
          &.textBox {
            flex-direction: column;
            .name {
              width: 100%;
            }
            .text {
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
      }
    }
  }
}
.btn {
  margin-top: 20px;
  button {
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
