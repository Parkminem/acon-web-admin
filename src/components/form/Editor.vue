<template>
  <div class="input-box">
    <label>{{ title }}</label>
    <textarea :id="title" :name="name" :desc="desc"></textarea>
  </div>
</template>
<script setup>
import 'suneditor/dist/css/suneditor.min.css';
// import 'suneditor/assets/css/suneditor.css'
// import 'suneditor/assets/css/suneditor-contents.css'
import suneditor from 'suneditor';
import lang from 'suneditor/src/lang';

import { font, image, video } from 'suneditor/src/plugins';
import plugins from 'suneditor/src/plugins';
import { onMounted } from 'vue';

const props = defineProps({
  title: String,
  editorVar: Object,
  name: String,
  desc: String
});

onMounted(() => {
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
    ],
    lang: lang.ko
  });
  props.editorVar.value.setContents(props.desc);
});
</script>
