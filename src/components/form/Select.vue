<template>
  <div class="input-box">
    <label>{{ title }}</label>
    <select :name="name" :id="id" @change="handleInput">
      <option :value="i" v-for="i in arr" :key="i" :selected="i === selected">{{ i }}</option>
    </select>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  id: String,
  arr: Array,
  selected: Number,
  name: String
});
const emit = defineEmits(['update:modelValue']);
function handleInput(event) {
  const value = event.target.value;
  emit('update:modelValue', value);
}
</script>
<style lang="scss" scoped>
select {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid rgba(170, 170, 170, 0.3);
}
</style>
