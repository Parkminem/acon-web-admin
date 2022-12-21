<template>
  <div class="main" :style="{ paddingLeft: movePadding() + 'px' }">
    <Header />
    <div class="contents">
      <router-view></router-view>
      <Footer />
    </div>
  </div>
</template>
<script setup>
import Header from '../components/common/Header.vue';
import Footer from '../components/common/Footer.vue';
import { useHeaderStore } from '../store/header';
import { storeToRefs } from 'pinia';
const headerStore = useHeaderStore();
const { slideState } = storeToRefs(headerStore);

const movePadding = () => {
  if (slideState.value) return 280;
  else return 0;
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  transition: all 0.3s ease-in-out;
  background-color: #f3f8fb;
  .contents {
    width: 100%;
  }
}
</style>
