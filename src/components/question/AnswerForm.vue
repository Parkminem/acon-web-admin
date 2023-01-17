<template>
  <div class="card">
    <div class="titleBox">
      <h1>문의내용</h1>
    </div>
    <div class="form">
      <div class="formHead">
        <div class="row">
          <div class="col">
            <div class="name col1"><span>문의유형</span></div>
            <div class="text"><span>문의유형</span></div>
          </div>
          <div class="col">
            <div class="name"><span>회사명</span></div>
            <div class="text"><span>회사명</span></div>
          </div>
          <div class="col">
            <div class="name"><span>부서/직급</span></div>
            <div class="text"><span>부서/직급</span></div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="name"><span>이름</span></div>
            <div class="text"><span>이름</span></div>
          </div>
          <div class="col">
            <div class="name"><span>연락처</span></div>
            <div class="text"><span>연락처</span></div>
          </div>
          <div class="col">
            <div class="name"><span>이메일</span></div>
            <div class="text"><span>이메일</span></div>
          </div>
          <div class="col">
            <div class="name"><span>등록일</span></div>
            <div class="text"><span>등록일</span></div>
          </div>
        </div>
        <div class="row">
          <div class="col textBox">
            <div class="name"><span>내용</span></div>
            <div class="text"></div>
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
              <label for=""><input type="radio" name="" id="" /><span>한국어</span></label>
              <label for=""><input type="radio" name="" id="" /><span>인도네시아어</span></label>
              <label for=""><input type="radio" name="" id="" /><span>포르투갈어</span></label>
              <label for=""><input type="radio" name="" id="" /><span>영어</span></label>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col textBox">
            <div class="name"><span>내용</span></div>
            <div class="text"><textarea name="" id="" cols="30" rows="18"></textarea></div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup></script>
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
        display: flex;
        border-bottom: 1px solid #444;
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
          }
          &.textBox {
            flex-direction: column;
            .name {
              width: 100%;
            }
            .text {
              min-height: 300px;
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
</style>
