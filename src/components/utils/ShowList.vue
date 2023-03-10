<template>
  <div class="show-box">
    <span>Show</span>
    <Select :options="select.show" v-model="showVal" :selected="showNum.toString()" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import Select from '@/components/utils/SelecteBar.vue';
import { select } from '@/utils/select';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const { showNum } = storeToRefs(selectStore);

const showVal = ref();

const emit = defineEmits(['changeList']);

//스토어의 갯수 state를 바뀐 value로 변경
watch(showVal, (newShowVal) => {
  selectStore.changeShow(newShowVal);
  emit('changeList', newShowVal);
});
</script>
<style lang="scss">
.show-box {
  display: flex;
  .select-box {
    margin: 0 10px;
    select {
      font-size: 15px;
      outline: none;
    }
  }
}
</style>
