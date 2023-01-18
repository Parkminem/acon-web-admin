<template>
  <div class="entryBox">
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
.entryBox {
  p {
    font-size: $fontL;
  }
}
</style>
