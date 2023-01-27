<template>
  <div class="input-box">
    <div class="check-box">
      <label>{{ title }}</label>
      <input type="checkbox" :id="title" v-model="isCheck" @change="handleInput" :checked="checked" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const isCheck = ref();

const props = defineProps({
  title: String,
  modelValue: Boolean,
  checked: Boolean
});
const emit = defineEmits(['update:modelValue']);
function handleInput() {
  emit('update:modelValue', isCheck.value);
}
</script>
<style lang="scss" scoped>
.check-box {
  display: flex;
  flex-direction: column;
  input[type='checkbox'] {
    margin-top: 10px;
  }
}
</style>
