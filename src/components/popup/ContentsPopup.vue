<template>
  <div class="cover" @click="popupStore.contentClose"></div>
  <div class="popup">
    <div class="popup__header">
      <h1 v-if="!detailContent" class="popup__header__title">컨텐츠 등록</h1>
      <h1 v-else class="popup__header__title">컨텐츠 수정</h1>
      <button @click="popupStore.contentClose()"><span class="material-icons"> close </span></button>
    </div>
    <form action="" enctype="multipart/form-data" id="form">
      <div class="popup__body">
        <Input name="title_kr" title="제목(한국어)" v-model="krTitle" />
        <Input name="title_id" title="제목(인도네시아어)" v-model="idTitle" />
        <Input name="title_pt" title="제목(포르투갈어)" v-model="ptTitle" />
        <Input name="title_us" title="제목(영어)" v-model="enTitle" />

        <div class="input-box">
          <label>내용(한국어)</label>
          <textarea class="textarea" name="content_kr" cols="50" rows="10" v-model="krContents"></textarea>
        </div>
        <div class="input-box">
          <label>내용(인도네시아어)</label>
          <textarea class="textarea" name="content_id" cols="50" rows="10" v-model="idContents"></textarea>
        </div>
        <div class="input-box">
          <label>내용(포르투갈어)</label>
          <textarea class="textarea" name="content_pt" cols="50" rows="10" v-model="ptContents"></textarea>
        </div>
        <div class="input-box">
          <label>내용(영어))</label>
          <textarea class="textarea" name="content_us" cols="50" rows="10" v-model="enContents"></textarea>
        </div>

        <File title="썸네일" @fileValue="emitFile" :name="file" dataName="file" />
        <File title="작품소개서(한국어)" @fileValue="emitDataKr" :name="data_kr" dataName="data_kr" />
        <File title="작품소개서(영어)" @fileValue="emitDataUs" :name="data_us" dataName="data_us" />
      </div>
      <div class="popup__footer">
        <button v-if="!detailContent" @click.prevent="uploadContent" class="popup__footer__btn">
          <span>등록</span>
        </button>
        <button v-else @click.prevent="editContent" class="popup__footer__btn"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import File from '@/components/form/File.vue';
import { ref } from 'vue';
import contentsApi from '@/api/contents';

import { usePopupStore } from '@/store/popup';
import { useContentsStore } from '@/store/contents';
import { storeToRefs } from 'pinia';

const popupStore = usePopupStore();
const contentsStore = useContentsStore();

const { detailContent } = storeToRefs(contentsStore);

const krTitle = ref('');
const idTitle = ref('');
const ptTitle = ref('');
const enTitle = ref('');

const krContents = ref('');
const idContents = ref('');
const ptContents = ref('');
const enContents = ref('');

const file = ref('');
const data_kr = ref('');
const data_us = ref('');

function emitFile(val) {
  file.value = val;
}

function emitDataKr(val) {
  data_kr.value = val;
}

function emitDataUs(val) {
  data_us.value = val;
}

// 수정 팝업 랜더링 시 데이터 삽입

if (detailContent.value) {
  krTitle.value = detailContent.value.title_kr;
  idTitle.value = detailContent.value.title_id;
  ptTitle.value = detailContent.value.title_pt;
  enTitle.value = detailContent.value.title_us;
  krContents.value = detailContent.value.content_kr;
  idContents.value = detailContent.value.content_id;
  ptContents.value = detailContent.value.content_pt;
  enContents.value = detailContent.value.content_us;
  file.value = detailContent.value.thumbnail_origin_name;
  data_kr.value = detailContent.value.file_url_kr;
  data_us.value = detailContent.value.file_url_us;
}

// 컨텐츠 등록

function uploadContent() {
  if (file.value.length == 0 || data_kr.value.length == 0 || data_us.value.length == 0) {
    alert('파일을 입력해주세요.');
  } else {
    const form = document.getElementById('form');
    const formData = new FormData(form);
    // console.log(...formData);

    contentsApi
      .fetchUploadContent(formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.contentClose();
          contentsStore.contentsListAct();
        }
        location.reload();
      })
      .catch((err) => alert('등록에 실패하였습니다.'));
  }
}

// 컨텐츠 수정

function editContent() {
  const edit = (data) => {
    contentsApi
      .fetchEditContent(detailContent.value.contents_pk, data)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.contentClose();
          contentsStore.contentsListAct(1, 10);
        }
      })
      .catch((err) => alert('수정에 실패하였습니다.'));
  };

  const form = document.getElementById('form');
  const formData = new FormData(form);
  if (detailContent.value.thumbnail_origin_name == file.value) {
    formData.delete('file');
  }
  if (detailContent.value.file_url_kr == data_kr.value) {
    formData.delete('data_kr');
  }
  if (detailContent.value.file_url_us == data_us.value) {
    formData.delete('data_us');
  }

  edit(formData);

  // console.log(...formData);
  // location.reload();
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/popup.scss';
.textarea {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid rgba(170, 170, 170, 0.3);
  outline: none;
  resize: none;
  &:focus {
    border-color: #80bdff;
  }
}
</style>
