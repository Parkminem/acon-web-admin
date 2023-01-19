<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <ckeditor :id="title" :config="editorConfig" :editor="editor" v-model="editorDesc" @input="handleInput"></ckeditor>
  </div>
</template>
<script setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ref } from 'vue';
import { MyCustomUploadAdapterPlugin } from '@/utils/uploadAdapter';

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
const editorConfig = {
  toolbar: [
    'heading',
    '|',
    'fontBackgroundColor',
    'fontColor',
    'fontSize',
    'bold',
    'italic',
    '|',
    'alignment',
    'bulletedList',
    'numberedList',
    'indent',
    'outdent',
    '|',
    'imageUpload',
    'insertTable',
    'link',
    '|',
    'undo',
    'redo'
  ],
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
  },
  image: {
    resize: true,
    toolbar: ['imageStyle:alignLeft', 'imageStyle:alignRight', 'imageStyle:inline', 'imageStyle:side']
  },

  extraPlugins: [MyCustomUploadAdapterPlugin]
};
</script>
