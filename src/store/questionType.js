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
     * @param (현재 페이지 넘버, 한 페이지 안의 게시물 수, sort값)
     */
    async questionTypeListAct(page, count, sortData) {
      await questionTypeApi
        .fetchQnaTypeList(page, count, sortData)
        .then((res) => {
          this.questionTypeList = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 문의 유형 검색결과 조회
     * @param (현재페이지, 한 페이지 당 총 게시물 수, sort값, 키워드({조건 : 키워드}))
     */
    async searchQuestionTypeListAct(page, count, sortData, keyword) {
      await questionTypeApi
        .fetchSearchQnaTypeList(page, count, sortData, keyword)
        .then((res) => {
          this.questionTypeList = res.data;
        })
        .catch((err) => {
          if (err.response.data.code === 'L000') {
            this.questionTypeList = null;
          } else {
            console.log(err);
          }
        });
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
