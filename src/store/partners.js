import { defineStore } from 'pinia';
import partnersApi from '@/api/partners';

export const usePartners = defineStore('partners', {
  state: () => ({
    partnersList: null,
    detailPartner: null,
    partnerPopupState: false,
    newPartner: []
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
    },
    /**
     * detailPartner 값 초기화
     */
    resetDetailPartnerAct() {
      if (this.detailPartner === null) {
        return false;
      }
      this.detailPartner = null;
    },
    /**
     * 등록 값 저장(임의로 리스트에 추가하기 위함)
     * @param object(name_kr, name_id, name_pt, name_us, url, 임의file_url)
     */
    saveNewPartner(object) {
      this.newPartner.push(object);
      this.newPartner.reverse();
    }
  }
});
