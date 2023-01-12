<template>
  <div class="showBox">
    <span>Show</span>
    <Selete :options="select.show" v-model="showVal" :selected="showNum.toString()" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import Selete from './SelecteBar.vue';
import { select } from '@/components/utils/select';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);

const showVal = ref();

//스토어의 갯수 state를 바뀐 value로 변경
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
