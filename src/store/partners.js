import { defineStore } from 'pinia';
import partnersApi from '@/api/partners';
import { usePopupStore } from '@/store/popup';

export const usePartners = defineStore('partners', {
  state: () => ({
    partnersList: null,
    detailPartner: null,
    partnerPopupState: false
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
          const popupStore = usePopupStore();
          popupStore.partnerOpen();
        })
        .catch((err) => console.log(err));
    },
    /**
     * detailPartner 값 초기화
     */
    resetDetailPartnerAct() {
      if (this.detailPartner === null) {
        return false;
      }
      this.detailPartner = null;
    }
  }
});
