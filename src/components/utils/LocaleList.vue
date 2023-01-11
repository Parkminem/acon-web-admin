<template>
  <div class="LocaleList">
    <span>language</span>
    <SeleteBar :options="select.locale" v-model="locale" />
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import SeleteBar from './SelecteBar.vue';
import { select } from '../../utils/select';
import { useSelect } from '../../store/utils';

const selectStore = useSelect();
const locale = ref();

watch(locale, (newLocale) => {
  selectStore.changeLocale(newLocale);
});
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
