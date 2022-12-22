<template>
  <!-- 함수 사용 v-for로 랜더링 -->
  <div class="pagination">
    <ul>
      <li>
        <button><span class="material-icons"> chevron_left </span></button>
      </li>
      <li>
        <button><span>1</span></button>
      </li>
      <li>
        <button class="active"><span>2</span></button>
      </li>
      <li>
        <button><span>3</span></button>
      </li>
      <li>
        <button><span>4</span></button>
      </li>
      <li>
        <button><span>5</span></button>
      </li>
      <li>
        <button><span class="material-icons"> chevron_right </span></button>
      </li>
    </ul>
  </div>
</template>
<script setup></script>
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
