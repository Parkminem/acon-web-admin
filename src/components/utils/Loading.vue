<template>
  <div class="loading-box">
    <div class="imgBox">
      <img :src="loadingImg" alt="loading" />
    </div>
  </div>
</template>
<script setup>
import loadingImg from '@/assets/manager/images/common/loading.gif';
</script>
<style lang="scss" scoped>
.loading-box {
  min-height: calc(100vh - 74px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
