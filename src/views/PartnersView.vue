<template>
  <SubTitle>파트너사</SubTitle>
  <div class="container">
    <div class="section">
      <ResisterBtn @clickRegister="usePopupStore().partnerOpen" />
      <LocaleList />
      <div class="partnersBox">
        <div v-if="newPartner" class="item" v-for="item in newPartner">
          <div class="imgBox">
            <a :href="item.url" target="_blank"><img :src="item.src" :alt="item.name_kr" /></a>
          </div>
          <div class="info">
            <h1 v-if="locale === 'kr'">{{ item.name_kr }}</h1>
            <h1 v-if="locale === 'id'">{{ item.name_id }}</h1>
            <h1 v-if="locale === 'pt'">{{ item.name_pt }}</h1>
            <h1 v-if="locale === 'en'">{{ item.name_us }}</h1>
            <div class="btns">
              <button @click="partnersApi.fetchDetailPartners(item.partner_pk)"><span>수정</span></button>
              <button @click="deletePartner(item.partner_pk)"><span>삭제</span></button>
            </div>
          </div>
        </div>
        <Empty v-if="!partnersList || !newPartner" />
        <div v-else class="item" v-for="item in partnersList">
          <div class="imgBox">
            <a :href="item.url" target="_blank"><img :src="url + item.logo_file_url" :alt="item.name_kr" /></a>
          </div>
          <div class="info">
            <h1 v-if="locale === 'kr'">{{ item.name_kr }}</h1>
            <h1 v-if="locale === 'id'">{{ item.name_id }}</h1>
            <h1 v-if="locale === 'pt'">{{ item.name_pt }}</h1>
            <h1 v-if="locale === 'en'">{{ item.name_us }}</h1>
            <div class="btns">
              <button @click="partnersStore.detailPartnerAct(item.partner_pk)"><span>수정</span></button>
              <button @click="deletePartner(item.partner_pk)"><span>삭제</span></button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

const { partnersList, newPartner } = storeToRefs(partnersStore);
const { locale } = storeToRefs(selectStore);

const url = 'http://data.ideaconcert.com';

//파트너사 리스트 조회
await partnersStore.partnersListAct();

//파트너사 삭제
function deletePartner(pk) {
  partnersApi
    .fetchDeletePartners(pk)
    .then((res) => {
      if (res.data.status === 200) {
        window.location.href = '/partners';
      }
    })
    .catch((err) => {
      alert('삭제에 실패하였습니다.');
    });
}
</script>
<style lang="scss" scoped>
.partnersBox {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    height: 250px;
    width: 248px;
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
    margin: 0 20px 20px 0;

    .imgBox {
      text-align: center;
      a img {
        width: 248px;
        height: 117px;
        object-fit: contain;
      }
    }
    .info {
      height: calc(100% - 117px);
      padding: 11px 15px 16.6px 15px;
      display: flex;
      flex-direction: column;
      h1 {
        font-weight: 700;
        font-size: 20px;
        color: #292929;
        margin-bottom: 10px;
        text-align: center;
      }
      .btns {
        text-align: end;
        margin-top: auto;
        button {
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
}
</style>
