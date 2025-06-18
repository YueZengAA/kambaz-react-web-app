import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Link, Outlet, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as quizzesClient from "./client";

export default function QuizEditor() {
    const { pathname } = useLocation();
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>(null);

    const fetchQuizDetails = async () => {
            const quiz = await quizzesClient.findQuizById(qid as string)
            setQuiz(quiz);
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
            <Outlet />
            

        </div>
        
    )
}