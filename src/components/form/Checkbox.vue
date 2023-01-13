<template>
  <div class="inputBox">
    <div class="checkBox">
      <label>{{ title }}</label>
      <input type="checkbox" :id="title" v-model="isCheck" @change="handleInput" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const isCheck = ref();

defineProps({
  title: String,
  modelValue: Boolean
});
const emit = defineEmits(['update:modelValue']);
function handleInput() {
  emit('update:modelValue', isCheck.value);
}
</script>
