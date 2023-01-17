<template>
  <div class="pagination">
    <ul>
      <li v-if="pagination(currentPage, currentLastPage).preBtn">
        <button
          @click="
            $emit('goPrePage', currentStartPage);
            currentPage = currentStartPage - 1;
          "
        >
          <span class="material-icons"> chevron_left </span>
        </button>
      </li>
      <li v-for="page in pageArr" :key="page">
        <button
          :class="{ active: currentPage == page }"
          @click="
            $emit('goPage', page);
            currentPage = page;
          "
        >
          <span>{{ page }}</span>
        </button>
      </li>
      <li v-if="pagination(currentPage, currentLastPage).nextBtn">
        <button
          @click="
            $emit('goNextPage', currentEndPage);
            currentPage = currentEndPage + 1;
          "
        >
          <span class="material-icons"> chevron_right </span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { pagination } from '@/utils/pagination';
import { ref, watch } from 'vue';
const props = defineProps({
  lastPage: Number,
  nowPage: Number
});
const currentPage = ref(props.nowPage);
const currentLastPage = ref(props.lastPage);
const currentEndPage = ref(pagination(currentPage.value, currentLastPage.value).endPage);
const currentStartPage = ref(pagination(currentPage.value, currentLastPage.value).startPage);
const pageArr = ref(pagination(currentPage.value, currentLastPage.value).pageArr);
watch(currentPage, (newNowPage) => {
  currentPage.value = newNowPage;
  currentStartPage.value = pagination(newNowPage, currentLastPage.value).startPage;
  pageArr.value = pagination(newNowPage, currentLastPage.value).pageArr;
});
// lastpage가 watch 되지 않음, 확인 후 수정해야함...
watch(currentLastPage, (newLastPage) => {
  currentLastPage.value = newLastPage;
});
</script>
<style lang="scss" scoped>
.pagination {
  ul {
    display: flex;
    align-items: center;
    li {
      button {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        font-size: 17px;
        margin: 0 2px;
        transition: all 0.2s ease-in-out;
        .material-icons {
          font-size: 20px;
        }
        &.active {
          background: linear-gradient(to bottom, white 0%, #dcdcdc 100%);
          color: #333;
          border: 1px solid #979797;
        }
        &:hover:not(.active) {
          color: #fff;
          border: 1px solid #111;
          background: linear-gradient(to bottom, #585858 0%, #111 100%);
        }
      }
    }
  }
}
</style>
