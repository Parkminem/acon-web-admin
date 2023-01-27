<template>
  <div class="entry-box">
    <!-- 숫자 부분 데이터바인딩 -->
    <p>Showing {{ nowPage }} to {{ listPage }} of {{ rowCnt }} entries</p>
  </div>
</template>
<script setup>
defineProps({
  nowPage: Number,
  listPage: Number,
  rowCnt: String
});
</script>
<style lang="scss" scoped>
.entry-box {
  p {
    font-size: $fontL;
  }
}
</style>
