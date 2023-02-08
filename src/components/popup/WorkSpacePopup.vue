<template>
  <div class="cover" @click="popupStore.workSpaceClose"></div>
  <div class="popup">
    <div class="popup__header">
      <h1 v-if="!detailWorkSpace" class="popup__header__title">업무 공간 등록</h1>
      <h1 v-else class="popup__header__title">업무 공간 수정</h1>
      <button @click="popupStore.workSpaceClose"><span class="material-icons"> close </span></button>
    </div>
    <form action="" enctype="multipart/form-data" id="form">
      <div class="popup__body">
        <Input name="name_kr" title="지역명(한국어)" placeholder="판교" v-model="krSpace" />
        <Input name="name_id" title="지역명(인도네시아어)" placeholder="Pangyo" v-model="idSpace" />
        <Input name="name_pt" title="지역명(포르투갈어)" placeholder="Pangyo" v-model="ptSpace" />
        <Input name="name_us" title="지역명(영어)" placeholder="Pangyo" v-model="enSpace" />
        <div class="input-box">
          <label>업무 공간 사진(복수 선택 가능)</label>
          <div class="file-box">
            <input type="file" id="file" @change="fileUpload" ref="file" multiple />
            <label for="file"
              ><div class="fileName">{{ fileName }}</div>
              <span class="btn">Browse</span></label
            >
          </div>
        </div>
        <div class="input-box">
          <div class="preview-box" v-for="(src, idx) in srcs" :key="idx">
            <!-- 등록 시 업로드 할 사진 삭제 버튼 -->
            <div v-if="!src.isDbUrl">
              <button class="preview-box__close" @click.prevent="deleteFileHandler(idx)">
                <span class="material-icons"> cancel </span>
              </button>
            </div>
            <!-- 수정 팝업의 받아온 사진 데이터 삭제 버튼  -->
            <div v-else>
              <button v-if="!src.deleteFlag" class="preview-box__close" @click.prevent="deleteImageHandler(idx)">
                <span class="material-icons"> cancel </span>
              </button>
              <button v-else class="preview-box__undo" @click.prevent="undoImageHandle(src.seq, idx)">
                <span class="material-icons"> undo </span>
              </button>
            </div>
            <img :src="src.url" alt="" :style="{ opacity: transparent(src.deleteFlag) + '%' }" />
          </div>
        </div>
      </div>
      <div class="popup__footer">
        <button v-if="!detailWorkSpace" @click.prevent="uploadWorkSpace" class="popup__footer__btn">
          <span>등록</span>
        </button>
        <button v-else @click.prevent="editWorkSpace" class="popup__footer__btn"><span>수정</span></button>
      </div>
    </form>
  </div>
</template>
<script setup>
import Input from '@/components/form/Input.vue';
import { ref } from 'vue';
import workSpaceApi from '@/api/workSpace';
import { usePopupStore } from '@/store/popup';
import { useWorkSpace } from '@/store/workSpace';
import { storeToRefs } from 'pinia';

const popupStore = usePopupStore();
const workSpaceStore = useWorkSpace();

const { detailWorkSpace, detailImages } = storeToRefs(workSpaceStore);

const url = 'https://ideaconcert.com';
const krSpace = ref('');
const idSpace = ref('');
const ptSpace = ref('');
const enSpace = ref('');
const fileName = ref();
const file = ref();
const fileArr = ref([]);
let srcs = ref([]);

//사진 삭제 취소 스타일(반투명)
function transparent(del) {
  if (del) return 40;
  else return 100;
}

// //수정 팝업 랜더링 시 데이터 삽입
if (detailWorkSpace.value || detailImages.value) {
  krSpace.value = detailWorkSpace.value.name_kr;
  idSpace.value = detailWorkSpace.value.name_id;
  ptSpace.value = detailWorkSpace.value.name_pt;
  enSpace.value = detailWorkSpace.value.name_us;
  if (detailImages.value) {
    detailImages.value.forEach((i) => {
      srcs.value.push({ url: url + i.img_url, isDbUrl: true, deleteFlag: false, seq: i.seq });
    });
  }
}

//사진 미리보기 띄우기
function fileUpload() {
  //파일 검증
  if (file.value.files[0].type.split('/')[0] !== 'image') {
    alert('이미지 파일만 선택할 수 있습니다.');
  } else {
    fileName.value = file.value.files[0].name;
    for (let i = 0; file.value.files.length > i; i++) {
      fileArr.value.push(file.value.files[i]);
    }
    Object.keys(file.value.files).forEach((i) => {
      const fileData = file.value.files[i];
      let reader = new FileReader();
      reader.onload = (e) => {
        srcs.value.push({ url: e.target.result, isDbUrl: false, deleteFlag: false, seq: null });
      };
      reader.readAsDataURL(fileData);
    });
  }
}

//업무 공간 등록
function uploadWorkSpace() {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  for (let i = 0; fileArr.value.length > i; i++) {
    formData.append('file', fileArr.value[i]);
  }
  if (
    krSpace.value.length == 0 ||
    idSpace.value.length == 0 ||
    ptSpace.value.length == 0 ||
    enSpace.value.length == 0 ||
    fileArr.value.length == 0
  ) {
    alert('모든 내용을 입력해주세요');
  } else {
    workSpaceApi
      .fetchUploadWorkSpace(formData)
      .then((res) => {
        if (res.data.status === 200) {
          popupStore.workSpaceClose();
          workSpaceStore.workSpaceListAct(1, 10, 'desc');
        }
      })
      .catch((err) => {
        alert('등록에 실패하였습니다.');
      });
  }
}

//파일 삭제
function deleteFileHandler(idx) {
  srcs.value.splice(idx, 1);
  fileArr.value.splice(idx, 1);
  if (fileArr.value.length === 0) {
    fileName.value = '';
  } else {
    fileName.value = fileArr.value[0].name;
  }
}

//수정 시 받아온 사진 데이터 삭제(반투명 상태로)
function deleteImageHandler(idx) {
  workSpaceStore.deletedWorkSpaceImageAct(idx);
  srcs.value[idx].deleteFlag = true;
}

// 수정 시 삭제할 이미지 데이터 되돌리기
function undoImageHandle(seq, idx) {
  workSpaceStore.undoWorkSpaceImageAct(seq);
  srcs.value[idx].deleteFlag = false;
}

// 수정
async function editWorkSpace() {
  if (
    krSpace.value.length == 0 ||
    idSpace.value.length == 0 ||
    ptSpace.value.length == 0 ||
    enSpace.value.length == 0 ||
    srcs.value.length == 0
  ) {
    alert('모든 내용을 입력해주세요');
  } else {
    try {
      //지역 이름 수정
      const formData = document.getElementById('form');
      const imgData = new FormData();
      for (let i = 0; fileArr.value.length > i; i++) {
        imgData.append('file', fileArr.value[i]);
      }
      const pk = detailWorkSpace.value.careers_pk;
      await workSpaceApi.fetchEditWorkSpace(detailWorkSpace.value.careers_pk, formData);
      //이미지 삭제
      if (workSpaceStore.deletedImages.values) {
        await workSpaceStore.deleteWorkSpaceImageAct();
      }
      //이미지 추가
      if (fileArr.value.length > 0) {
        await workSpaceStore.addWorkSpaceImageAct(pk, imgData);
      }
      await popupStore.workSpaceClose();
      await workSpaceStore.workSpaceListAct(1, 10, 'desc');
    } catch (err) {
      alert('수정에 실패하였습니다.');
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/manager/style/popup.scss';
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
.preview-box {
  position: relative;
  img {
    width: 100%;
    padding: 10px;
    max-height: 300px;
  }
  &__close,
  &__undo {
    position: absolute;
    right: 0;
    z-index: 1;
  }
}
</style>
