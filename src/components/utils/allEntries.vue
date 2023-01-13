<template>
  <div class="entryBox">
    <!-- 숫자 부분 데이터바인딩 -->
    <p>Showing {{ nowpage }} to {{ listpage }} of {{ rowcnt }} entries</p>
  </div>
</template>
<script setup>
defineProps({
  nowpage: Number,
  listpage: Number,
  rowcnt: String
});
</script>
<style lang="scss" scoped>
.entryBox {
  p {
    font-size: $fontL;
  }
}
</style>
