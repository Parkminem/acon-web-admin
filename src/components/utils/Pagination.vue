<template>
  <div class="pagination">
    <ul>
      <li v-if="pagination(nowPage, lastPage).preBtn">
        <button @click="$emit('goPrePage', pagination(nowPage, lastPage).startPage - 1)">
          <span class="material-icons"> chevron_left </span>
        </button>
      </li>
      <li v-for="page in pagination(nowPage, lastPage).pageArr" :key="page">
        <button :class="{ active: nowPage == page }" @click="$emit('goPage', page)">
          <span>{{ page }}</span>
        </button>
      </li>
      <li v-if="pagination(nowPage, lastPage).nextBtn">
        <button @click="$emit('goNextPage', pagination(nowPage, lastPage).endPage + 1)">
          <span class="material-icons"> chevron_right </span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { pagination } from '@/utils/pagination';
const props = defineProps({
  lastPage: Number,
  nowPage: Number
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
