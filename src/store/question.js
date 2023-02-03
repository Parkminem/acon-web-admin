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
     * @param (현재페이지, 한 페이지 당 총 게시물 수, sort 값)
     */
    async questionListAct(page, count, sortData) {
      await questionApi
        .fetchQnaList(page, count, sortData)
        .then((res) => {
          this.questionList = res.data;
        })
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     * 문의 내역 검색결과 조회
     * @param  (현재페이지, 한 페이지 당 총 게시물 수, sort값, 키워드({조건:키워드}))
     */
    async searchQuestionListAct(page, count, sortData, keyword) {
      await questionApi
        .fetchSearchQnaList(page, count, sortData, keyword)
        .then((res) => {
          this.questionList = res.data;
        })
        .catch((err) => {
          if (err.response.data.code === 'N999') {
            this.questionList = null;
          } else {
            alert('조회에 실패하였습니다.');
          }
        });
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
        .catch((err) => alert('조회에 실패하였습니다.'));
    },
    /**
     * 답변 하기
     * @param object(question_pk, language, content)
     */
    async answerAct(object) {
      questionApi
        .fetchAnswer(object)
        .then((res) => {
          if (res.data.status === 200) {
            router.push('/question');
          }
        })
        .catch((err) => alert('등록에 실패하였습니다.'));
    }
  }
});
