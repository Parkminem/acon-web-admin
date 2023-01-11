<template>
  <div class="selectBox">
    <select name="" id="" @change="optionChange">
      <option v-for="option of options" :value="option.value">{{ option.name }}</option>
    </select>
  </div>
</template>
<script setup>
defineProps({
  options: Array
});
const emit = defineEmits(['update:modelValue']);
function optionChange(e) {
  const value = e.target.value;
  emit('update:modelValue', value);
}
</script>
<style lang="scss"></style>
