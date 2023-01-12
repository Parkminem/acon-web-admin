<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <div class="fileBox">
      <input type="file" name="" id="file" ref="file" @change="fileUpload" />
      <label for="file"><span ref="fileName" class="fileName"></span><span class="btn">Browse</span></label>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
defineProps({
  title: String
});
const emit = defineEmits();
const file = ref();
const fileName = ref();

function fileUpload(event) {
  fileName.value.innerText = file.value.files[0].name;
  if (file.value.files[0].type.split('/')[0] !== 'image') alert('이미지 파일만 선택할 수 있습니다.');
  else emit('fileValue', event.target);
}
</script>
