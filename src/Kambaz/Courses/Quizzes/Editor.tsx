import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as quizzesClient from "./client";

export default function QuizEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>();

    const isNew = qid === "new";

    const fetchQuizDetails = async () => {
        if (isNew) {
            setQuiz({
                name: "",
                course: cid as string,
                status: "UNPUBLISH",
                description: "",
                type: "Graded Quiz",
                points: 0,
                group: "Quizzes",
                shuffleAnswers: "YES",
                timeLimit: 20,
                multipleAttempts: "NO",
                howManyAttempts: 1,
                showCorrectAnswers: "YES",
                showCorrectAnswersAfter: "2025-06-25",
                accessCode: "",
                oneQuestionAtATime: "YES",
                webcamRequired: "NO",
                lockQuestions: "NO",
                start: "2025-06-10",
                until: "2025-06-25",
                due: "2025-06-25",
                questions: []
            });
        } else {
            const quiz = await quizzesClient.findQuizById(qid as string)
            setQuiz(quiz);
        }      
    }
    
    useEffect(() => {
        fetchQuizDetails();
    }, [qid]);
        
    if (!quiz) return <div>Loading...</div>;

    return (
        <div>
            <h5 className="mt-3 float-end">Points: {quiz.points}</h5>
            <Nav variant="pills">
                <Nav.Item> <Nav.Link as={Link} to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/DetailsEditor`}
                    className={
                        pathname.includes("DetailsEditor")
                            ? "fw-bold text-danger fs-5"
                            : "text-dark fs-5"
                        }> 
                    Details 
                </Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link as={Link} to={`/Kambaz/Courses/${cid}/Quizzes/${qid}/Editor/QuestionsEditor`}
                    className={
                        pathname.includes("QuestionsEditor")
                            ? "fw-bold text-danger fs-5"
                            : "text-dark fs-5"
                        }> 
                    Questions 
                </Nav.Link> </Nav.Item>
            </Nav>

            <hr/>
            <Outlet context={{ quiz, setQuiz }}/>
            
        </div>
        
    )
}