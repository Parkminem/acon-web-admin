import { defineStore } from 'pinia';
import questionTypeApi from '@/api/questionType';
import { usePopupStore } from '@/store/popup';

export const useQuestionType = defineStore('questionType', {
  state: () => ({
    questionTypeList: null,
    detailQuestionType: null,
    questionTypePage: null
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
    async detailQuestionTypeAct(pk, page) {
      this.detailQuestionType = null;
      await questionTypeApi
        .fetchDetailQnaType(pk)
        .then((res) => {
          const popupStore = usePopupStore();
          this.detailQuestionType = res.data;
          this.questionTypePage = page;
          popupStore.questionTypeOpen();
        })
        .catch((err) => console.log(err));
    },
    /**
     * detailQuestionType 값 초기화 액션
     */
    resetDetailQuestionTypeAct() {
      this.detailQuestionType = null;
    },
    /**
     * 현재 페이지 저장 액션
     * @param 현재페이지
     */
    currentQuestionTypeAct(page) {
      this.questionTypePage = page;
    }
  }
});
