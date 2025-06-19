import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import type { RootState } from "../../store";
import { Button, Dropdown, DropdownItem, ListGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { useEffect } from "react";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { IoEllipsisVertical } from "react-icons/io5";
import "../../style.css"
import StatusCheckmark from "./StatusCheckMark";

export default function Quizzes() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    if (!currentUser) return null;

    const fetchQuizzes = async () => {
            if (!cid) return;
            const quizzes = await coursesClient.findQuizzes(cid as string);
            dispatch(setQuizzes(quizzes));
        };

    const removeQuiz = async (quizId: string) => {
        await quizzesClient.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
      };

    const saveQuiz = async (quiz: any) => {
        await quizzesClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
      };

    const formatDateTime = (isoStr: string | Date) => {
        const date = new Date(isoStr);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString(
            [], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const getAvailability = (quiz: { start: Date | string; until: Date | string }) => {
        const now = new Date();
        const start = new Date(quiz.start);
        const until = new Date(quiz.until);

        if (now < start) {
            return `Not available until ${formatDateTime(start)}`;
        } else if (now >= start && now <= until) {
            return "Available";
        } else {
            return "Closed";
        }
    };
    
    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    return (
        <div id="wd-quizzes">
            {currentUser.role === "FACULTY" && (
                <div className="d-flex gap-2 mb-3">
                    <Button variant="danger" size="lg" className="ms-auto" id="wd-add-assignment"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/new/Editor/DetailsEditor`)}>
                        <FaPlus className="position-relative me-2"/>
                        Quiz
                    </Button>
                </div>
            )}

            <ListGroup className="rounded-0" id="wd-quiz-list">
                <ListGroup.Item className="p-0 mb-5 fs-5 border-gray ">
                    <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
                        <div id="wd-quizzes-title" className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <strong>QUIZZES</strong>
                        </div>
                    </div>

                    <ListGroup className="wd-lessons rounded-0">
                        {quizzes.map((quiz: any) => (
                            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                                key={quiz._id}>
                                <div className="d-flex align-items-start gap-3">
                                    <BsGripVertical className="me-2 fs-3" />
                                </div>
                                <div className="flex-grow-1 ms-3">   
                                    <Link
                                        to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                                        className="fw-bold text-decoration-none text-dark"
                                    >
                                        {quiz.name}
                                    </Link>                                 
                                    <div className="text-muted small">
                                        <strong>{getAvailability(quiz)}</strong> |
                                        <strong> Due</strong> {formatDateTime(quiz.until)} | {quiz.points} pts
                                    </div>
                                </div>

                                {currentUser.role === "FACULTY" && ( 
                                    <div className="d-flex align-items-center gap-3">
                                        <StatusCheckmark status={quiz.status} />                                       
                                        <Dropdown >
                                            <Dropdown.Toggle
                                                as="div"
                                                id="wd-quiz-menu-btn"
                                                className="no-caret"
                                                style={{ cursor: "pointer" }}
                                            >
                                                <IoEllipsisVertical className="fs-4" />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Editor/DetailsEditor`)}>
                                                    Edit
                                                </Dropdown.Item>
                                                <DropdownItem onClick={() => {removeQuiz(quiz._id)}}>
                                                    Delete
                                                </DropdownItem>
                                                <DropdownItem 
                                                    onClick={() => {
                                                        const newStatus = quiz.status === "PUBLISH" ? "UNPUBLISH" : "PUBLISH";
                                                        const updatedQuiz = { ...quiz, status: newStatus };
                                                        saveQuiz(updatedQuiz);
                                                    }}>
                                                    {quiz.status === "PUBLISH" ? "Unpublish" : "Publish"}
                                                </DropdownItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )}   
                            </ListGroup.Item>       
                        ))}      
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>

        </div>  
    )
}