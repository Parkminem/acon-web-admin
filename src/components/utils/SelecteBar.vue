<template>
  <div class="selectBox">
    <select name="" id="">
      <option v-for="option of options" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>
<script setup>
defineProps({
  options: Array
});
</script>
<style lang="scss"></style>
