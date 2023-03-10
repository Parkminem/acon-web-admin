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
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     */
    async questionTypeListAct(page, count, sortData, keyword) {
      await questionTypeApi
        .fetchQnaTypeList(page, count, sortData, keyword)
        .then((res) => {
          this.questionTypeList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
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
        .catch((err) => alert('조회에 실패하였습니다.'));
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
