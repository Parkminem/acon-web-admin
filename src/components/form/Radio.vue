<template>
  <div class="input-box">
    <label>{{ title }}</label>
    <div class="radio-box">
      <label for="active01"
        ><input
          :name="name"
          type="radio"
          id="active01"
          :value="value01"
          @change="handleInput"
          :checked="checked === value01"
        /><span>예</span></label
      >
    </div>
    <div class="radio-box">
      <label for="active02"
        ><input
          :name="name"
          type="radio"
          id="active02"
          :value="value02"
          @change="handleInput"
          :checked="checked === value02"
        /><span>아니오</span></label
      >
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  value01: String,
  value02: String,
  modelValue: String,
  name: String,
  checked: {
    type: String,
    default: null
  }
});
const emit = defineEmits(['update:modelValue']);
function handleInput(event) {
  const value = event.target.value;
  emit('update:modelValue', value);
}
</script>
<style lang="scss" scoped>
.radio-box {
  font-size: $fontL;
  &:not(&:last-child) {
    margin-bottom: 5px;
  }
  input[type='radio'] {
    vertical-align: middle;
    appearance: none;
    background-color: #ddd;
    width: 17px;
    height: 17px;
    margin: 0;
    margin-right: 10px;
    border-radius: 100px;
    &:checked {
      border: 5px solid #333;
      background-color: #fff;
    }
  }
}
</style>
