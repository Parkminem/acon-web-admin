import { defineStore } from 'pinia';
import questionApi from '@/api/question';
import router from '@/routes';

export const useQuestion = defineStore('question', {
  state: () => ({
    questionList: null,
    detailQuestion: null
  }),
  actions: {
    /**
     * 문의내역 조회
     * @param (현재페이지, 한 페이지 당 총 게시물 수)
     */
    async questionListAct(page, count) {
      await questionApi
        .fetchQnaList(page, count)
        .then((res) => {
          this.questionList = res.data;
        })
        .catch((err) => console.log(err));
    },
    /**
     * 문의 내용 상세 조회
     * @param 고유번호
     */
    async detailQuestionAct(pk) {
      await questionApi
        .fetchDetailQna(pk)
        .then((res) => {
          this.detailQuestion = res.data;
        })
        .catch((err) => console.log(err));
    }
  }
});
