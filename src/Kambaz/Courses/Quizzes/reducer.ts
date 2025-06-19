import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: { quizzes: any[] } = {
  quizzes: [],
};


const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload }) => {
      state.quizzes = payload;
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);
    },

    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? { ...q, ...quiz  } : q
      );
    },

    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: uuidv4(),
        name: quiz.name,
        course: quiz.course,
        status: quiz.status,
        description: quiz.description,
        type: quiz.type,
        points: quiz.points,
        group: quiz.group,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        showCorrectAnswers: quiz.showCorrectAnswers,
        showCorrectAnswersAfter: quiz.showCorrectAnswersAfter,
        accessCode: quiz.accessCode,
        oneQuestionAtATime: quiz.oneQuestionAtATime,
        webcamRequired: quiz.webcamRequired,
        lockQuestions: quiz.lockQuestions,
        start: quiz.start,
        until: quiz.until,
        due: quiz.due,
        questions: quiz.questions,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
  }
})

export const { setQuizzes, deleteQuiz, updateQuiz, addQuiz} = quizzesSlice.actions;
export default quizzesSlice.reducer;