<template>
  <SubTitle>파트너사</SubTitle>
  <div class="container">
    <section class="section">
      <ResisterBtn @clickRegister="usePopupStore().partnerOpen" />
      <LocaleList />
      <div class="partners-box">
        <Empty v-if="!partnersList" />
        <div v-else class="item" v-for="item in partnersList">
          <div class="item__img-box">
            <a :href="item.url" target="_blank"
              ><img :src="url + item.logo_file_url" :alt="item.name_kr" class="item__img-box__img"
            /></a>
          </div>
          <div class="item__info-box">
            <h1 v-if="locale === 'kr'" class="item__info-box__title">{{ item.name_kr }}</h1>
            <h1 v-if="locale === 'id'" class="item__info-box__title">{{ item.name_id }}</h1>
            <h1 v-if="locale === 'pt'" class="item__info-box__title">{{ item.name_pt }}</h1>
            <h1 v-if="locale === 'en'" class="item__info-box__title">{{ item.name_us }}</h1>
            <div class="item__info-box__btns">
              <button @click="partnersStore.detailPartnerAct(item.partner_pk)" class="item__info-box__btns__btn">
                <span>수정</span>
              </button>
              <button @click="deletePartner(item.partner_pk)" class="item__info-box__btns__btn">
                <span>삭제</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import SubTitle from '@/components/common/SubTitle.vue';
import ResisterBtn from '@/components/utils/ResisterBtn.vue';
import LocaleList from '@/components/utils/LocaleList.vue';
import Empty from '@/components/utils/Empty.vue';
import { usePartners } from '@/store/partners';
import { usePopupStore } from '@/store/popup';
import { useSelect } from '@/store/utils';
import { storeToRefs } from 'pinia';
import partnersApi from '@/api/partners';

const partnersStore = usePartners();
const selectStore = useSelect();

const { partnersList } = storeToRefs(partnersStore);
const { locale } = storeToRefs(selectStore);

const url = 'https://data.ideaconcert.com';

//파트너사 리스트 조회
await partnersStore.partnersListAct();

//파트너사 삭제
function deletePartner(pk) {
  if (window.confirm('삭제하시겠습니까?')) {
    partnersApi
      .fetchDeletePartners(pk)
      .then((res) => {
        if (res.data.status === 200) {
          partnersStore.partnersListAct();
        }
      })
      .catch((err) => {
        alert('삭제에 실패하였습니다.');
      });
  } else return false;
}
</script>
<style lang="scss" scoped>
.partners-box {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.item {
  height: 250px;
  width: 248px;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
  margin: 0 20px 20px 0;

  &__img-box {
    text-align: center;
    &__img {
      width: 248px;
      height: 117px;
      object-fit: contain;
    }
  }
  &__info-box {
    height: calc(100% - 117px);
    padding: 11px 15px 16.6px 15px;
    display: flex;
    flex-direction: column;
    &__title {
      font-weight: 700;
      font-size: 20px;
      color: #292929;
      margin-bottom: 10px;
      text-align: center;
    }
    &__btns {
      text-align: end;
      margin-top: auto;
      &__btn {
        border: 1px solid #000;
        padding: 5px 7px;
        transition: all 0.25s ease-in-out;
        &:first-child {
          margin-right: 10px;
        }
        &:hover {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
