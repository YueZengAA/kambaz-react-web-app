import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data; 
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data; 
};

export const updateQuestion = async (quizId: string, questionId: String, questionData: any) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, questionData);
  return response.data; 
}

export const deleteQuestion = async (quizId: string, questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data; 
};