<template>
  <div class="footer">
    <p class="footer__text">
      © Copyright 2022. All right reserved. Template by
      <a href="https://colorlib.com/wp/" class="footer__link">Colorlib</a>.
    </p>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.footer {
  background-color: #fff;
  padding: 30px 0;
  &__text {
    width: 100%;
    text-align: center;
    font-weight: 300;
    color: #676666;
    font-size: $fontM;
  }
  &__link {
    color: #007bff;
  }
}
</style>
