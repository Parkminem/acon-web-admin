import { defineStore } from 'pinia';
import partnersApi from '@/api/partners';
import { usePopupStore } from '@/store/popup';

const popupStore = usePopupStore();

export const usePartners = defineStore('partners', {
  state: () => ({
    partnersList: null,
    detailPartner: null
  }),
  actions: {
    /**
     * 파트너사 리스트 조회 액션
     */
    async partnersListAct() {
      await partnersApi
        .fetchPartnersList()
        .then((res) => {
          this.partnersList = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 파트너사 상세 정보 조회 액션
     * @param 고유번호
     */
    async detailPartnerAct(pk) {
      await partnersApi
        .fetchDetailPartners(pk)
        .then((res) => {
          this.detailPartner = res.data;
          console.log(this.detailPartner);
        })
        .catch((err) => console.log(err));
    }
  }
});
