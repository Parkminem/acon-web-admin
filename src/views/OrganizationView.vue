<template>
  <SubTitle>조직도</SubTitle>
  <div class="container">
    <OrganizationMap />
  </div>
</template>
<script setup>
import SubTitle from '../components/common/SubTitle.vue';
import OrganizationMap from '../components/organization/OrganizationMap.vue';
</script>
<style lang="scss" scoped>
.container {
  text-align: center;
}
</style>
