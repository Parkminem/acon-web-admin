<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <slot></slot>
    <input type="text" :placeholder="placeholder" :id="title" :value="modelValue" @input="handleInput" :name="name" />
  </div>
</template>
<script setup>
defineProps({
  title: String,
  modelValue: String,
  placeholder: String,
  name: String
});
const emit = defineEmits(['update:modelValue']);
function handleInput(event) {
  const value = event.target.value;
  emit('update:modelValue', value);
}
</script>
<style lang="scss">
//부모 컴포넌트에서 조작하는 부분이 있어 scoped 하면 안됨
input[type='text'] {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid rgba(170, 170, 170, 0.3);
  &:focus:not(.address) {
    border-color: #80bdff;
  }
}
</style>
