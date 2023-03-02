<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <section class="section">
      <div class="title-box" v-if="!detailNews"><h1 class="title-box__title">소식 업로드</h1></div>
      <div class="title-box" v-else><h1 class="title-box__title">소식 수정</h1></div>
      <form action="" id="form">
        <Input name="title_kr" title="제목(한국어)" v-model="krTitle" />
        <Input name="title_id" title="제목(인도네시아어)" v-model="idTitle" />
        <Input name="title_pt" title="제목(포르투갈어)" v-model="ptTitle" />
        <Input name="title_us" title="제목(영어)" v-model="enTitle" />
        <File title="썸네일" @fileValue="emitFile" :name="thumbnail" dataName="file" />
        <Radio
          name="active_flag"
          title="활성화 여부"
          value01="1"
          value02="-1"
          v-model="isActiveRef"
          :checked="isActiveRef"
        />
        <Editor title="내용(한국어)" :editorVar="krEditor" :desc="krDesc" />
        <Editor title="내용(인도네시아어)" :editorVar="idEditor" :desc="idDesc" />
        <Editor title="내용(포르투갈어)" :editorVar="ptEditor" :desc="ptDesc" />
        <Editor title="내용(영어)" :editorVar="enEditor" :desc="enDesc" />
        <button class="submit-button" @click.prevent="onUpload" v-if="!detailNews">완료</button>
        <button class="submit-button" @click.prevent="editNews" v-else>수정</button>
      </form>
    </section>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import File from '@/components/form/File.vue';
import Radio from '@/components/form/Radio.vue';
import Editor from '@/components/form/Editor.vue';
import SubTitle from '@/components/common/SubTitle.vue';
import { ref, reactive, toRefs } from 'vue';
import { useNewsStore } from '@/store/news';
import { storeToRefs } from 'pinia';
import newsApi from '@/api/news';

const newsStore = useNewsStore();
const { detailNews } = storeToRefs(newsStore);

function editorRefSetting() {
  const state = reactive({
    krEditor: {},
    idEditor: {},
    ptEditor: {},
    enEditor: {}
  });
  return toRefs(state);
}

const { krEditor, idEditor, ptEditor, enEditor } = editorRefSetting();

const krTitle = ref('');
const idTitle = ref('');
const ptTitle = ref('');
const enTitle = ref('');
const thumbnail = ref('');
const isActiveRef = ref('');

function emitFile(val) {
  thumbnail.value = val;
}

let krDesc = ref();
let idDesc = ref();
let ptDesc = ref();
let enDesc = ref();

// 수정 렌더링 시 데이터 삽입
if (detailNews.value) {
  krTitle.value = detailNews.value.title_kr;
  idTitle.value = detailNews.value.title_id;
  ptTitle.value = detailNews.value.title_pt;
  enTitle.value = detailNews.value.title_us;
  thumbnail.value = detailNews.value.thumbnail_origin_name;
  krDesc = ref(detailNews.value.content_kr);
  idDesc = ref(detailNews.value.content_id);
  ptDesc = ref(detailNews.value.content_pt);
  enDesc = ref(detailNews.value.content_us);
  if (detailNews.value.active_flag == 1) {
    isActiveRef.value = '1';
  } else {
    isActiveRef.value = '-1';
  }
}

// 뉴스 등록
function onUpload() {
  if (
    krTitle.value.length === 0 ||
    idTitle.value.length === 0 ||
    ptTitle.value.length === 0 ||
    enTitle.value.length === 0 ||
    thumbnail.value.length === 0 ||
    !isActiveRef.value.length ||
    krEditor.value.value.getContents(true).length === 0 ||
    idEditor.value.value.getContents(true).length === 0 ||
    ptEditor.value.value.getContents(true).length === 0 ||
    enEditor.value.value.getContents(true).length === 0
  ) {
    alert('모든 내용을 입력해주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);

    formData.append('content_kr', krEditor.value.value.getContents(true));
    formData.append('content_id', idEditor.value.value.getContents(true));
    formData.append('content_pt', ptEditor.value.value.getContents(true));
    formData.append('content_us', enEditor.value.value.getContents(true));

    newsApi
      .fetchUploadNews(formData)
      .then((res) => {
        window.location.href = '/manager/news';
      })
      .catch((err) => {
        alert('등록에 실패하였습니다.');
      });
  }
}

// 뉴스 수정
function editNews() {
  const form = document.getElementById('form');
  const formData = new FormData(form);

  formData.append('content_kr', krEditor.value.value.getContents(true));
  formData.append('content_id', idEditor.value.value.getContents(true));
  formData.append('content_pt', ptEditor.value.value.getContents(true));
  formData.append('content_us', enEditor.value.value.getContents(true));
  // console.log(...formData);
  newsApi
    .fetchEditNews(detailNews.value.news_pk, formData)
    .then((res) => {
      if (res.data.status === 200) {
        alert('수정이 완료되었습니다');
        window.location.href = '/manager/news';
      }
    })
    .catch((err) => {
      alert('수정에 실패하였습니다.');
    });
}
</script>
<style lang="scss">
* {
  font-family: 'Lato', sans-serif;
}
.container {
  padding: 30px;
}
.title-box {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
  color: #333;
  text-transform: capitalize;
  margin-bottom: 30px;
}
.input-box {
  display: flex;
  color: #666;
  flex-direction: column;
  margin-bottom: 30px;
  label {
    margin-bottom: 10px;
  }
}
.submit-button {
  padding: 11px 17px;
  background-color: #343a40;
  color: #fff;
  border-radius: 3px;
  transition: all 0.25s ease-out;
  margin-bottom: 20px;
  &:hover {
    background-color: #000;
  }
}
</style>
