import { createSlice } from "@reduxjs/toolkit";

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
  }
})

export const { setQuizzes, deleteQuiz, updateQuiz} = quizzesSlice.actions;
export default quizzesSlice.reducer;