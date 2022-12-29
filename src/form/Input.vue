<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <slot></slot>
    <input type="text" :placeholder="placeholder" :id="title" :value="modelValue" @input="handleInput" />
  </div>
</template>
<script setup>
defineProps({
  title: String,
  modelValue: String,
  placeholder: String
});
const emit = defineEmits(['update:modelValue']);
function handleInput(event) {
  const value = event.target.value;
  emit('update:modelValue', value);
}
</script>
