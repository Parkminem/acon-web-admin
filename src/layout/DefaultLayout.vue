<template>
  <div class="main" :style="{ paddingLeft: movePadding() + 'px' }">
    <Header />
    <div class="contents">
      <router-view></router-view>
      <Footer />
    </div>
  </div>
  <HistoryPopup v-if="historyState" />
<<<<<<< HEAD
  <PartnersPopup v-if="partnerState" />
  <LocationPopup v-if="locationState" />
  <QuestionTypePopup v-if="questionTypeState" />
  <PromotionPopup v-if="promotionState" />
=======
>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274
</template>
<script setup>
import Header from '../components/common/Header.vue';
import Footer from '../components/common/Footer.vue';
import HistoryPopup from '../components/popup/HistoryPopup.vue';
<<<<<<< HEAD
import PartnersPopup from '../components/popup/PartnersPopup.vue';
import LocationPopup from '../components/popup/LocationPopup.vue';
import QuestionTypePopup from '../components/popup/QuestionTypePopup.vue';
import PromotionPopup from '../components/popup/PromotionPopup.vue';
=======
import LocationPopup from '../components/popup/LocationPopup.vue';
import PartnersPopup from '../components/popup/PartnersPopup.vue';
import QuestionListPopup from '../components/popup/QuestionListPopup.vue';
import QuestionPopup from '../components/popup/QuestionPopup.vue';
>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274

import { useHeaderStore } from '../store/header';
import { usePopupStore } from '../store/popup';
import { storeToRefs } from 'pinia';
const headerStore = useHeaderStore();
const popupStore = usePopupStore();
const { slideState } = storeToRefs(headerStore);
<<<<<<< HEAD
const { historyState, partnerState, locationState, questionTypeState, promotionState } = storeToRefs(popupStore);
=======
const { historyState } = storeToRefs(popupStore);
>>>>>>> 6ed0604ef485d98934f21dee45943d9d40fa5274

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
