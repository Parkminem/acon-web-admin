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
     * 문의내역 리스트 조회 액션
     * @param {페이지} page
     * @param {한페이지당컨텐츠수} count
     * @param {sort값} sortData
     * @param {키워드} keyword
     * @returns 문의내역리스트
     */
    async questionListAct(page, count, sortData, keyword) {
      await questionApi
        .fetchQnaList(page, count, sortData, keyword)
        .then((res) => {
          this.questionList = res.data;
          return res.data;
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
            router.push('/manager/question');
          }
        })
        .catch((err) => alert('등록에 실패하였습니다.'));
    }
  }
});
