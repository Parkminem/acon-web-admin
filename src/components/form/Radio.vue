<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <div class="radioBox">
      <label for="active01"
        ><input type="radio" name="active" id="active01" :value="value01" @change="handleInput" /><span>예</span></label
      >
    </div>
    <div class="radioBox">
      <label for="active02"
        ><input type="radio" name="active" id="active02" :value="value02" @change="handleInput" /><span
          >아니오</span
        ></label
      >
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  value01: String,
  value02: String,
  modelValue: String
});
const emit = defineEmits(['update:modelValue']);
function handleInput(event) {
  const value = event.target.value;
  emit('update:modelValue', value);
}
</script>
