<template>
  <SubTitle>소식</SubTitle>
  <div class="container">
    <div class="section">
      <div class="title" v-if="!detailNews">소식 업로드</div>
      <div class="title" v-else>소식 수정</div>
      <form action="" id="form">
        <Input name="title_kr" title="제목(한국어)" v-model="krTitle" />
        <Input name="title_id" title="제목(인도네시아어)" v-model="idTitle" />
        <Input name="title_pt" title="제목(포르투갈어)" v-model="ptTitle" />
        <Input name="title_us" title="제목(영어)" v-model="enTitle" />
        <File title="썸네일" @fileValue="emitFile" />
        <Radio
          name="active_flag"
          title="활성화 여부"
          value01="1"
          value02="-1"
          v-model="isActiveRef"
          :checked="isActiveRef"
        />
        <Editor title="내용(한국어)" @write="emitKrDesc" :val="krDesc" />
        <Editor title="내용(인도네시아어)" @write="emitIdDesc" :val="idDesc" />
        <Editor title="내용(포르투갈어)" @write="emitPtDesc" :val="ptDesc" />
        <Editor title="내용(영어)" @write="emitEnDesc" :val="enDesc" />
        <button class="submitBtn" @click.prevent="onUpload" v-if="!detailNews">완료</button>
        <button class="submitBtn" @click.prevent="editNews" v-else>수정</button>
      </form>
    </div>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import File from '@/components/form/File.vue';
import Radio from '@/components/form/Radio.vue';
import Editor from '@/components/form/Editor.vue';
import SubTitle from '@/components/common/SubTitle.vue';
import { ref } from 'vue';
import { useNewsStore } from '@/store/news';
import { storeToRefs } from 'pinia';
import newsApi from '@/api/news';
import router from '@/routes';

const newsStore = useNewsStore();
const { detailNews } = storeToRefs(newsStore);

const krTitle = ref('');
const idTitle = ref('');
const ptTitle = ref('');
const enTitle = ref('');
const thumbnail = ref('');
const krDesc = ref('');
const idDesc = ref('');
const ptDesc = ref('');
const enDesc = ref('');
const isActiveRef = ref('');

function emitFile(val) {
  thumbnail.value = val;
}
function emitKrDesc(val) {
  krDesc.value = val.value;
}
function emitIdDesc(val) {
  idDesc.value = val.value;
}
function emitPtDesc(val) {
  ptDesc.value = val.value;
}
function emitEnDesc(val) {
  enDesc.value = val.value;
}

// 수정 렌더링 시 데이터 삽입
if (detailNews.value) {
  krTitle.value = detailNews.value.title_kr;
  idTitle.value = detailNews.value.title_id;
  ptTitle.value = detailNews.value.title_pt;
  enTitle.value = detailNews.value.title_us;
  thumbnail.value = detailNews.value.thumbnail_origin_name;
  krDesc.value = detailNews.value.content_kr;
  idDesc.value = detailNews.value.content_id;
  ptDesc.value = detailNews.value.content_pt;
  enDesc.value = detailNews.value.content_us;
  if (detailNews.value.active_flag == 1) {
    isActiveRef.value = '1';
  } else {
    isActiveRef.value = '-1';
  }
  console.log(thumbnail.value);
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
    krDesc.value.length === 0 ||
    idDesc.value.length === 0 ||
    ptDesc.value.length === 0 ||
    enDesc.value.length === 0
  ) {
    alert('모든 내용을 입력해주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    formData.append('content_kr', krDesc.value);
    formData.append('content_id', idDesc.value);
    formData.append('content_pt', ptDesc.value);
    formData.append('content_us', enDesc.value);
    console.log(...formData);
    newsApi
      .fetchUploadNews(formData) //
      .then((res) => {
        console.log(res);
      })
      .then(router.push('/news'))
      .catch((err) => {
        console.log(err);
      });
  }
}

// 뉴스 수정
function editNews() {
  const inputObj = {
    news_pk: detailNews.value.news_pk,
    title_kr: krTitle.value,
    title_id: idTitle.value,
    title_pt: ptTitle.value,
    title_us: enTitle.value,
    // Todo thumbnail
    active_flag: isActiveRef.value,
    content_kr: krDesc.value,
    content_id: idDesc.value,
    content_pt: ptDesc.value,
    content_us: enDesc.value
  };
  newsApi
    .fetchEditNews(inputObj)
    .then((res) => {
      if (res.data.status === 200) {
        alert('수정이 완료되었습니다');
        router.push('/news');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>
<style lang="scss">
* {
  font-family: 'Lato', sans-serif;
}
.container {
  padding: 30px;
  .section {
    .title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0;
      color: #333;
      text-transform: capitalize;
      margin-bottom: 30px;
    }
    .inputBox {
      display: flex;
      color: #666;
      flex-direction: column;
      &:not(&:last-child) {
        margin-bottom: 30px;
      }
      label {
        margin-bottom: 10px;
      }
      input[type='text'] {
        padding: 12px;
        border-radius: 5px;
        border: 1px solid rgba(170, 170, 170, 0.3);
        &:focus {
          border-color: #80bdff;
        }
      }
      .fileBox {
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
      .radioBox {
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
    }
    .submitBtn {
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
  }
}
</style>
