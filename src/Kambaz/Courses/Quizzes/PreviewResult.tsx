import { useEffect, useState } from "react";
import { Button, Card, Col, FormCheck, FormControl, FormGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store";
import * as quizzesClient from "./client";
import { FaCheckCircle } from "react-icons/fa";
import { RiForbid2Line } from "react-icons/ri";

export default function PreviewResult() {
    const { cid, qid } = useParams();
    const { state } = useLocation();  
    const record = state?.record; // get fakeRecord
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    if (!currentUser || !record) return null;

    const fetchQuizDetails = async () => {
        const quiz = await quizzesClient.findQuizById(qid as string);
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuizDetails();
    }, [qid]);

    const answerMap: { [questionId: string]: { userAnswer: any; isCorrect: boolean } } = {};
    record?.answers.forEach((a: any) => {
        answerMap[a.questionId] = { userAnswer: a.userAnswer, isCorrect: a.isCorrect };
    });

    if (!quiz) return <div>Loading Preview...</div>;

    return (
        <div id="wd-quiz-preview">
            <div className="d-flex gap-2 align-items-center">
                <h3 className="">{quiz.name}</h3>
                    <Button variant="danger"  className="ms-auto"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Editor/QuestionsEditor`)}>
                        Edit
                    </Button>   
            </div>
            <hr/>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h4 className="mb-2 text-danger">Preview Result</h4>
                        <ul>
                            <li><h5><strong>Submission Date: </strong>{new Date(record.timestamp).toLocaleString()}</h5></li>
                            <li><h5><strong>Score: </strong>{record.score} out of {quiz.points}</h5></li>
                        </ul>
                        <br />

                        {quiz.questions.map((question: any, index: number) => {
                            const userEntry = answerMap[question._id];
                            const userAnswer = userEntry?.userAnswer;
                            const isCorrect = userEntry?.isCorrect;

                            return (
                                <Card key={index} className="p-3 mb-3">
                                    <Row>
                                        <Col sm={1}>
                                            {isCorrect === true && <FaCheckCircle className="text-success fs-4" />}
                                            {isCorrect === false && <RiForbid2Line className="text-danger fs-3" />}
                                        </Col>
                                        <Col sm={9}>
                                            <h4>Question {index + 1}</h4>
                                        </Col>
                                        <Col sm={2}>
                                            <h4>{question.points} pts</h4>
                                        </Col>
                                    </Row>
                                    <hr />

                                    {question.question}
                                    {question.type === "MULTIPLE_CHOICE" && (
                                        <FormGroup>
                                            {question.options.map((opt: string, i: number) => (
                                                <FormCheck
                                                    key={i}
                                                    type="radio"
                                                    name={`preview-${index}`}
                                                    checked={userAnswer === i}
                                                    label={opt}
                                                    disabled
                                                />
                                            ))}
                                        </FormGroup>
                                    )}

                                    {question.type === "TRUE_FALSE" && (
                                        <FormGroup>
                                            <FormCheck type="radio" label="True" disabled checked={userAnswer === true} />
                                            <FormCheck type="radio" label="False" disabled checked={userAnswer === false} />
                                        </FormGroup>
                                    )}

                                    {question.type === "FILL_BLANK" && (
                                        <FormGroup>
                                            {(Array.isArray(userAnswer) ? userAnswer : []).map((a: string, i: number) => (
                                                <FormControl
                                                    key={i}
                                                    type="text"
                                                    value={a}
                                                    className="mb-2"
                                                    disabled
                                                />
                                            ))}
                                        </FormGroup>
                                    )}
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}