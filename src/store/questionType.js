import { defineStore } from 'pinia';
import questionTypeApi from '@/api/questionType';
import { usePopupStore } from '@/store/popup';

const popupStore = usePopupStore();

export const useQuestionType = defineStore('questionType', {
  state: () => ({
    questionTypeList: null,
    detailQuestionType: null
  }),
  actions: {
    /**
     * 문의 유형 리스트 조회 액션
     * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수)
     */
    async questionTypeListAct(page, count) {
      await questionTypeApi
        .fetchQnaTypeList(page, count)
        .then((res) => {
          this.questionTypeList = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 문의 유형 상세 정보 조회 액션
     * @param 고유번호
     */
    async detailQuestionTypeAct(pk) {
      this.detailQuestionType = null;
      await questionTypeApi
        .fetchDetailQnaType(pk)
        .then((res) => {
          this.detailQuestionType = res.data;
          console.log(this.detailQuestionType);
          popupStore.questionTypeOpen();
        })
        .catch((err) => console.log(err));
    }
  }
});
