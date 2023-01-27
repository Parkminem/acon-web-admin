<template>
  <div class="LocaleList">
    <span>language</span>
    <SeleteBar :options="select.locale" v-model="lang" :selected="locale" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import SeleteBar from '@/components/utils/SelecteBar.vue';
import { select } from '@/utils/select';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';

const selectStore = useSelect();
const { locale } = storeToRefs(selectStore);
const lang = ref();

//스토어의 언어state를 바뀐 언어로 변경
watch(lang, (newlang) => {
  selectStore.changeLocale(newlang);
});
</script>
<style lang="scss">
.LocaleList {
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
