<template>
  <SubTitle>파트너사</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().partnerOpen" />
      <div class="partnersBox">
        <!-- item v-for 사용하면 됨 -->
        <div class="item">
          <div class="box">
            <a href=""><img src="/images/test.png" alt="" /></a>
            <h1>레드아이스 스튜디오</h1>
          </div>
          <div class="btns">
            <button><span>수정</span></button>
            <button><span>삭제</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '../components/common/SubTitle.vue';
import ResisterBtn from '../components/utils/ResisterBtn.vue';
import empty from '../components/utils/empty.vue';

import { usePopupStore } from '../store/popup';
</script>
<style lang="scss" scoped>
.partnersBox {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
    width: 248px;
    margin: 0 20px 20px 0;

    .box {
      min-height: 120px;
      text-align: center;
      padding: 15px 15px 50px 15px;
      a img {
        width: 100%;
        object-fit: contain;
      }
      h1 {
        font-weight: 700;
        font-size: 20px;
        color: #292929;
        margin-top: 40px;
      }
    }
    .btns {
      text-align: end;
      padding: 15px 10px;
      button {
        border: 1px solid #000;
        padding: 5px 7px;
        transition: all 0.25s ease-in-out;
        &:first-child {
          margin-right: 10px;
        }
        &:hover {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
