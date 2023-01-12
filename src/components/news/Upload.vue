<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <div class="section">
      <!-- 소식상세정보(수정 클릭 시 스토어에 받기)가 있을 경우와 없을 경우의 조건으로 업로드, 수정 제목 변경 -->
      <div class="title">소식 업로드</div>
      <form action="" enctype="multipart/form-data">
        <Input title="제목(한국어)" v-model="krTitle" />
        <Input title="제목(인도네시아어)" v-model="idTitle" />
        <Input title="제목(포르투갈어)" v-model="ptTitle" />
        <Input title="제목(영어)" v-model="enTitle" />
        <File title="썸네일" @fileValue="emitFile" />
        <Radio title="활성화 여부" value01="1" value02="-1" v-model="active" />
        <Editor title="내용(한국어)" @write="emitKrDesc" />
        <Editor title="내용(인도네시아어)" @write="emitIdDesc" />
        <Editor title="내용(포르투갈어)" @write="emitPtDesc" />
        <Editor title="내용(영어)" @write="emitEnDesc" />
        <button class="submitBtn" @click.prevent="submit">완료</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import File from '@/components/form/File.vue';
import Radio from '@/components/form/Radio.vue';
import Editor from '@/components/form/Editor.vue';
import SubTitle from '@/components/common/SubTitle.vue';
import { ref } from 'vue';

const krTitle = ref('');
const idTitle = ref('');
const ptTitle = ref('');
const enTitle = ref('');
const thumbnail = ref('');
const active = ref('');
const krDesc = ref('');
const idDesc = ref('');
const ptDesc = ref('');
const enDesc = ref('');

function emitFile(val) {
  thumbnail.value = val;
}
function emitKrDesc(val) {
  krDesc.value = val.value;
}
function emitIdDesc(val) {
  idDesc.value = val.value;
}
function emitPtDesc(val) {
  ptDesc.value = val.value;
}
function emitEnDesc(val) {
  enDesc.value = val.value;
}
function submit() {
  //axios
  console.log(thumbnail.value.files);
}
</script>
<style lang="scss">
* {
  font-family: 'Lato', sans-serif;
}
.container {
  padding: 30px;
  .section {
    .title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0;
      color: #333;
      text-transform: capitalize;
      margin-bottom: 30px;
    }
    .inputBox {
      display: flex;
      color: #666;
      flex-direction: column;
      &:not(&:last-child) {
        margin-bottom: 30px;
      }
      label {
        margin-bottom: 10px;
      }
      input[type='text'] {
        padding: 12px;
        border-radius: 5px;
        border: 1px solid rgba(170, 170, 170, 0.3);
        &:focus {
          border-color: #80bdff;
        }
      }
      .fileBox {
        width: 100%;
        label {
          display: flex;
          width: 100%;
          border-radius: 5px;
          border: 1px solid rgba(170, 170, 170, 0.3);
          align-items: center;
          justify-content: space-between;
          height: 41px;
          background-color: transparent;
          .fileName {
            padding-left: 10px;
            font-size: 12px;
          }
          .btn {
            height: 41px;
            display: inline-block;
            font-size: 13px;
            line-height: 41px;
            padding: 0 10px;
            border-radius: 0 5px 5px 0;
            background-color: #dedede;
            border-left: 1px solid #ced4da;
          }
        }
        input[type='file'] {
          position: absolute;
          z-index: 2;
          width: 0;
          height: 0;
          padding: 0;
          border: none;
        }
      }
      .radioBox {
        font-size: $fontL;
        &:not(&:last-child) {
          margin-bottom: 5px;
        }
        input[type='radio'] {
          vertical-align: middle;
          appearance: none;
          background-color: #ddd;
          width: 17px;
          height: 17px;
          margin: 0;
          margin-right: 10px;
          border-radius: 100px;
          &:checked {
            border: 5px solid #333;
            background-color: #fff;
          }
        }
      }
    }
    .submitBtn {
      padding: 11px 17px;
      background-color: #343a40;
      color: #fff;
      border-radius: 3px;
      transition: all 0.25s ease-out;
      margin-bottom: 20px;
      &:hover {
        background-color: #000;
      }
    }
  }
}
</style>
