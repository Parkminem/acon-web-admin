<template>
  <div class="select-box">
    <select name="" id="" @change="optionChange">
      <option v-for="option of options" :value="option.value" :key="option.value" :selected="selected == option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref } from 'vue';
defineProps({
  options: Array,
  selected: String
});

const selectedItem = ref();
//바로 위의 컴포넌트로 값을 올려줌
const emit = defineEmits(['update:modelValue']);
function optionChange(e) {
  const value = e.target.value;
  selectedItem.value = e.target.value;
  emit('update:modelValue', value);
}
</script>
<style lang="scss"></style>
