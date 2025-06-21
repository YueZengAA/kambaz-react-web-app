import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState } from "../../store";
import * as quizzesClient from "./client";
import { Button, Card } from "react-bootstrap";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import TrueFalse from "./QuestionTypes/TrueFalse";
import FillBlank from "./QuestionTypes/FillBlank";

export default function QuizPreview() {
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
                        <h4>Quiz Instructions</h4>
                        <Card className="p-3">{quiz.description}</Card>
                        <br/><br/>
                        
                        {quiz.questions.map((question: any, index: number) => {
                            const key = `${question._id}-${index}`;

                            switch (question.type) {
                                case "MULTIPLE_CHOICE":
                                    return <MultipleChoice key={key} question={question} index={index} />;
                                case "TRUE_FALSE":
                                    return <TrueFalse key={key} question={question} index={index} />;
                                case "FILL_BLANK":
                                    return <FillBlank key={key} question={question} index={index} />;
                                default:
                                    return <div key={key}>Unsupported question type</div>;
                            }
                        })}
                    </div>
                </div>
            </div>
            
        </div>
    )
}