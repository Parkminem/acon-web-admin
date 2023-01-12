<template>
  <div class="tableBox">
    <ul class="tHead">
      <li v-for="th in theadData" :class="[th.width]" @click="upDownSort">
        {{ th.name }}
      </li>
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

function upDownSort(event) {
  let item = event.target;
  if (!item.classList.contains('up') && !item.classList.contains('down')) {
    // sort 작업
    item.classList.add('up');
  } else if (item.classList.replace('up', 'down')) {
    // sort 작업
  } else if (item.classList.replace('down', 'up')) {
    //sort 작업
  }
}
</script>
<style lang="scss">
@import '@/style/table.scss';
</style>
