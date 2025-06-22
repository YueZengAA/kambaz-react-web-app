import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store";
import * as quizzesClient from "./client";

export default function QuizInstruction() {
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

    if (!quiz) return <div>Loading Quiz...</div>;

    return (
        <div id="wd-quiz-instruction">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h4>Quiz Instructions</h4>
                            <Card className="p-3">{quiz.description}</Card>
                        <br/><br/>

                        <div className="row mt-4">
                            <div className="col">
                                <table className="table table-borderless text-center align-middle w-100">
                                    <thead className="table-light">
                                        <tr className="fw-semibold border-bottom">
                                            <th>Due</th>
                                            <th>Points</th>
                                            <th>Time Limit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-bottom">
                                            <td>{new Date(quiz.due).toLocaleString()}</td>
                                            <td>{quiz.points}</td>
                                            <td>{quiz.timeLimit} mins</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Button variant="danger" className="d-block mx-auto my-4" size='lg'
                            onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/TakeQuiz`)}>
                            Take the Quiz
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}