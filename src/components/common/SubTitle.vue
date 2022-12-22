<template>
  <div class="subHeader"></div>
  <div class="subTitleBox">
    <h1><slot></slot></h1>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.subHeader {
  height: 50px;
  border-bottom: 1px solid #d8e3e7;
  background-color: #fff;
}
.subTitleBox {
  font-size: $fontTitle;
  font-weight: 300;
  color: #313b3d;
  padding: 17px 30px;
  position: relative;
  background-color: #fff;

  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 4px;
    height: 36px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: #4135f5;
  }
}
</style>
