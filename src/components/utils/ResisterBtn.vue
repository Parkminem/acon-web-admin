<template>
  <div class="register-btn">
    <button @click="$emit('clickRegister')"><span>등록하기</span></button>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.register-btn {
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
</style>
