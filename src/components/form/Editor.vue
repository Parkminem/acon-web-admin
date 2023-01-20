<template>
  <div class="inputBox">
    <label>{{ title }}</label>
    <textarea :id="title" name="a"></textarea>
    <!-- <ckeditor :id="title" :editor="editor" v-model="editorDesc" @input="handleInput"></ckeditor> -->
  </div>
</template>
<script setup>
import 'suneditor/dist/css/suneditor.min.css';
// import 'suneditor/assets/css/suneditor.css'
// import 'suneditor/assets/css/suneditor-contents.css'
import suneditor from 'suneditor';

import { font, image, video } from 'suneditor/src/plugins';
import plugins from 'suneditor/src/plugins';
import { onMounted, ref } from 'vue';

const props = defineProps({
  title: String,
  modelValue: String,
  val: String,
  editorVar: Object
});

onMounted(() => {
  console.log(props.title);
  props.editorVar.value = suneditor.create(props.title, {
    plugins,
    buttonList: [
      ['undo', 'redo'],
      ['font', 'fontSize', 'formatBlock'],
      ['paragraphStyle', 'blockquote'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['removeFormat'],
      '/', // Line break
      ['outdent', 'indent'],
      ['align', 'horizontalRule', 'list', 'lineHeight'],
      ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
      /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
      ['fullScreen', 'showBlocks', 'codeView'],
      ['preview', 'print'],
      ['save', 'template']
      /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
    ]
  });
});
</script>
