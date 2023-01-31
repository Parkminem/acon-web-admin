<template>
  <div class="input-box">
    <label>{{ title }}</label>
    <div class="file-box">
      <input type="file" :name="dataName" :id="dataName" ref="file" @change="fileUpload" />
      <label :for="dataName"
        ><span class="fileName">{{ fileName }}</span
        ><span class="btn">Browse</span></label
      >
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  name: { typs: String, required: false },
  dataName: String
});
const emit = defineEmits();
const file = ref();
const fileName = ref(props.name);

function fileUpload(event) {
  fileName.value = file.value.files[0].name;
  emit('fileValue', event.target);
  console.log(fileName.value);
}
</script>
<style lang="scss" scoped>
.file-box {
  width: 100%;
  label {
    display: flex;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgba(170, 170, 170, 0.3);
    align-items: center;
    justify-content: space-between;
    height: 41px;
    background-color: transparent;
    .fileName {
      padding-left: 10px;
      font-size: 12px;
    }
    .btn {
      height: 41px;
      display: inline-block;
      font-size: 13px;
      line-height: 41px;
      padding: 0 10px;
      border-radius: 0 5px 5px 0;
      background-color: #dedede;
      border-left: 1px solid #ced4da;
    }
  }
  input[type='file'] {
    position: absolute;
    z-index: 2;
    width: 0;
    height: 0;
    padding: 0;
    border: none;
  }
}
</style>
