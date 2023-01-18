<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <div class="fileBox">
      <input type="file" name="file" id="file" ref="file" @change="fileUpload" />
      <label for="file"
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
  name: { typs: String, required: false }
});
const emit = defineEmits();
const file = ref();
const fileName = ref(props.name);

function fileUpload(event) {
  fileName.value = file.value.files[0].name;
  if (file.value.files[0].type.split('/')[0] !== 'image') alert('이미지 파일만 선택할 수 있습니다.');
  else emit('fileValue', event.target);
}
</script>
