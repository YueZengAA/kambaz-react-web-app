import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    if (!currentUser) return null;

    const fetchQuizDetails = async () => {
        const quiz = await quizzesClient.findQuizById(qid as string)
        setQuiz(quiz);
    }

    useEffect(() => {
        fetchQuizDetails();
    }, [qid]);

    if (!quiz) return <div>Loading...</div>;

    return (
        <div id="wd-quiz-details">
            <div className="d-flex gap-2 align-items-center">
                <h3 className="">{quiz.name}</h3>
                {currentUser.role === "FACULTY" && (
                    <div className="ms-auto d-flex gap-2">
                        <Button variant="secondary"
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Preview`)}>           
                            Preview
                        </Button>
                        <Button variant="danger" 
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Editor/DetailsEditor`)}>           
                            Edit
                        </Button>
                    </div>
                )}
            </div>
            <hr/>

            <div className="row">
                <div className="col-md-7 ">
                    {[
                        ["Quiz Type", quiz.type],
                        ["Points", quiz.points],
                        ["Assignment Group", quiz.group],
                        ["Shuffle Answers", quiz.shuffleAnswers],
                        ["Time Limit", `${quiz.timeLimit} Minutes`],
                        ["Multiple Attempts", quiz.multipleAttempts],      
                        ["Show Correct Answers", quiz.showCorrectAnswers],
                        ["One Question at a Time", quiz.oneQuestionAtATime],
                        ["Webcam Required", quiz.webcamRequired],
                        ["Lock Questions After Answering", quiz.lockQuestions],
                    ].map(([label, value]) => (
                        <div className="row mb-1" key={label}>
                            <div className="col-6 fw-semibold text-end">{label}</div>
                            <div className="col-6">{value}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <table className="table table-borderless text-center align-middle w-100">
                        <thead className="table-light">
                            <tr className="fw-semibold border-bottom">
                                <th>Due</th>
                                <th>For</th>
                                <th>Available from</th>
                                <th>Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-bottom">
                                <td>{new Date(quiz.due).toLocaleString()}</td>
                                <td>Everyone</td>
                                <td>{new Date(quiz.start).toLocaleString()}</td>
                                <td>{new Date(quiz.until).toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}