import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store";
import * as quizzesClient from "./client";
import { Button } from "react-bootstrap";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import TrueFalse from "./QuestionTypes/TrueFalse";
import FillBlank from "./QuestionTypes/FillBlank";

export default function QuizTake() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<{ [questionId: string]: any }>({});

    if (!currentUser) return null;

    const handleAnswerChange = (questionId: string, userAnswer: any) => {
        setAnswers((prev) => ({ ...prev, [questionId]: userAnswer }));
    };

    const handleSubmit = async () => {
        const processedAnswers = quiz.questions.map((q: any) => {
            const userAnswer = answers[q._id];
            let isCorrect = false;

            switch (q.type) {
                case "MULTIPLE_CHOICE":
                    isCorrect = userAnswer === q.answer;  
                    break;
                case "TRUE_FALSE":
                    isCorrect = userAnswer === q.answer;  
                    break;
                case "FILL_BLANK":
                    const correctAnswers = (q.answer as string[]).map(a => a.trim().toLowerCase());
                    const userInputs = (userAnswer as string[]).map(a => a.trim().toLowerCase());
                    isCorrect = JSON.stringify(userInputs) === JSON.stringify(correctAnswers); 
                    break;
                default:
                    isCorrect = false;
            }
            
            return {
                questionId: q._id,
                userAnswer,
                isCorrect,
            };
        });

        const score = processedAnswers.reduce((total: number, a: any) => {
            const question = quiz.questions.find((q: any) => q._id === a.questionId);
            return a.isCorrect && question ? total + question.points : total;
        }, 0);

        const newRecord = await quizzesClient.createRecord(quiz._id, {
            answers: processedAnswers,
            score,
        });
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Result`, {
            state: { record: newRecord },
        });
    };

    const fetchQuizDetails = async () => {
        const quiz = await quizzesClient.findQuizById(qid as string)
        setQuiz(quiz);
    }

    useEffect(() => {
        fetchQuizDetails();
    }, [qid]);

    if (!quiz) return <div>Loading Preview...</div>;
    
    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div id="wd-quiz-take">

            <div className="row">
                <div className="col-md-9 border-end">
                    {(() => {
                        const key = `${currentQuestion._id}-${currentQuestionIndex}`;
                        switch (currentQuestion.type) {
                            case "MULTIPLE_CHOICE":
                                return <MultipleChoice key={key} question={currentQuestion} 
                                    index={currentQuestionIndex} onAnswer={handleAnswerChange}/>;
                            case "TRUE_FALSE":
                                return <TrueFalse key={key} question={currentQuestion} 
                                    index={currentQuestionIndex} onAnswer={handleAnswerChange}/>;
                            case "FILL_BLANK":
                                return <FillBlank key={key} question={currentQuestion} 
                                    index={currentQuestionIndex} onAnswer={handleAnswerChange}/>;
                            default:
                                return <div key={key}>Unsupported question type</div>;
                        }
                    })()}
                    
                    <div className="d-flex justify-content-end mt-3">
                        {currentQuestionIndex < quiz.questions.length - 1 ? (
                            <Button variant="secondary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                                Next
                            </Button>
                        ) : (
                            <Button variant="danger" onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}
                    </div>
                </div>

                <div className="col-md-2">
                    <h5 className="mb-3">Questions</h5>
                    {quiz.questions.map((q: any, idx: number) => (
                        <div
                            key={q._id}
                            className={`mb-2 cursor-pointer ${idx === currentQuestionIndex ? "fw-bold text-danger" : "text-dark"}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setCurrentQuestionIndex(idx)}
                        >
                            Question {idx + 1}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}