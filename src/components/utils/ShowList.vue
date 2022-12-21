<template>
  <div class="showBox">
    <span>Show</span>
    <div class="selectBox">
      <select name="" id="">
        <option value="" selected>10</option>
        <option value="">25</option>
        <option value="">50</option>
        <option value="">100</option>
      </select>
    </div>
    <span>entries</span>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.showBox {
  display: flex;
  .selectBox {
    margin: 0 10px;
    select {
      font-size: 15px;
      outline: none;
    }
  }
}
</style>
