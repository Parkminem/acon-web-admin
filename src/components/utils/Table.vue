<template>
  <div class="tableBox">
    <ul class="tHead">
      <li v-for="th in theadData" :class="[th.width]">{{ th.name }}</li>
    </ul>
    <div class="tbody">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  theadData: Array
});
</script>
<style lang="scss">
@import '../../style/table.scss';
</style>
