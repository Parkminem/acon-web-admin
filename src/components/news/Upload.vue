<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <div class="section">
      <div class="title">소식 업로드</div>
      <div class="inputBox">
        <label>제목(한국어)</label>
        <input type="text" />
      </div>
      <div class="inputBox">
        <label>제목(인도네시아어)</label>
        <input type="text" />
      </div>
      <div class="inputBox">
        <label>제목(포르투갈어)</label>
        <input type="text" />
      </div>
      <div class="inputBox">
        <label>제목(영어)</label>
        <input type="text" />
      </div>
      <div class="inputBox">
        <label>썸네일</label>
        <input type="file" />
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
        <ckeditor :editor="editor"></ckeditor>
      </div>
      <div class="inputBox">
        <label>내용(인도네시아어)</label>
        <ckeditor :editor="editor"></ckeditor>
      </div>
      <div class="inputBox">
        <label>내용(포르투갈어)</label>
        <ckeditor :editor="editor"></ckeditor>
      </div>
      <div class="inputBox">
        <label>내용(영어)</label>
        <ckeditor :editor="editor"></ckeditor>
      </div>
      <button @click="">완료</button>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '../common/SubTitle.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const editor = ClassicEditor;
</script>
<style lang="scss" scoped>
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
      input[type='text'],
      select {
        padding: 12px;
        border-radius: 5px;
        border: 1px solid rgba(170, 170, 170, 0.3);
        &:focus {
          border-color: #80bdff;
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
    button {
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
