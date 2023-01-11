<template>
  <div class="showBox">
    <span>Show</span>
    <Selete :options="select.show" v-model="showVal" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import Selete from './SelecteBar.vue';
import { select } from '../../utils/select';
import { useSelect } from '../../store/utils';

const selectStore = useSelect();

const showVal = ref();

watch(showVal, (newShowVal) => {
  selectStore.changeShow(newShowVal);
});
</script>
<style lang="scss">
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
