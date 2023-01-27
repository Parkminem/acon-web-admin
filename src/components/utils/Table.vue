<template>
  <div class="table-box">
    <ul class="table-box__head">
      <li v-for="th in theadData" :class="[th.width]">
        {{ th.name }}
      </li>
    </ul>
    <div class="table-box__body">
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
@import '@/assets/style/table.scss';
</style>
