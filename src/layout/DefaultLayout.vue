<template>
  <Header />
  <Subtitle />
  <router-view></router-view>
  <Footer />
</template>
<script setup>
import Header from '../components/common/Header.vue';
import Footer from '../components/common/Footer.vue';
import Subtitle from '../components/common/SubTitle.vue';
</script>
<style lang="scss" scoped></style>
