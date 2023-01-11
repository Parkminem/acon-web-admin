<template>
  <div class="LocaleList">
    <span>language</span>
    <SeleteBar :options="select.locale" />
  </div>
</template>
<script setup>
import SeleteBar from './SelecteBar.vue';
import { select } from '../../utils/select';
</script>
<style lang="scss">
.LocaleList {
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
