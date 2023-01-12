<template>
  <div class="main" :style="{ paddingLeft: movePadding() + 'px' }">
    <Header />
    <div class="contents">
      <Suspense>
        <template #default>
          <router-view></router-view>
        </template>
        <template #fallback>
          <Loading />
        </template>
      </Suspense>
      <Footer />
    </div>
  </div>
  <HistoryPopup v-if="historyPopupState" />
  <PartnersPopup v-if="partnerPopupState" />
  <LocationPopup v-if="locationPopupState" />
  <QuestionTypePopup v-if="questionTypePopupState" />
  <PromotionPopup v-if="promotionPopupState" />
</template>
<script setup>
import Header from '../components/common/Header.vue';
import Footer from '../components/common/Footer.vue';
import HistoryPopup from '../components/popup/HistoryPopup.vue';
import PartnersPopup from '../components/popup/PartnersPopup.vue';
import LocationPopup from '../components/popup/LocationPopup.vue';
import QuestionTypePopup from '../components/popup/QuestionTypePopup.vue';
import PromotionPopup from '../components/popup/PromotionPopup.vue';
import Loading from '../components/utils/Loading.vue';

import { useHeaderStore } from '../store/header';
import { usePopupStore } from '../store/popup';
import { storeToRefs } from 'pinia';
const headerStore = useHeaderStore();
const popupStore = usePopupStore();
const { slideState } = storeToRefs(headerStore);
const { historyPopupState, partnerPopupState, locationPopupState, questionTypePopupState, promotionPopupState } =
  storeToRefs(popupStore);

const movePadding = () => {
  if (slideState.value) return 280;
  else return 0;
};
</script>
<style lang="scss">
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
