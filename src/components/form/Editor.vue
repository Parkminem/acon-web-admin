<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <ckeditor :editor="editor" v-model="editorDesc" @input="handleInput"></ckeditor>
  </div>
</template>
<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';
const editor = ClassicEditor;

const props = defineProps({
  title: String,
  modelValue: String,
  val: String
});
const editorDesc = ref(props.val);
const emit = defineEmits();

function handleInput() {
  emit('write', editorDesc);
}
</script>
