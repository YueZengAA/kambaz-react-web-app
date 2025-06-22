import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import type { RootState } from "../../store";
import { Button, Dropdown, DropdownItem, ListGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
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
    const [records, setRecords] = useState<{ [quizId: string]: any }>({});
    if (!currentUser) return null;

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

    const handleClickQuiz = async (quiz: any) => {
        if (currentUser.role === "FACULTY") {
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`);
            return;
        }
        const record = await quizzesClient.findLatestRecord(quiz._id);
        const isFirstAttempt = !record;
        const now = new Date();
        const due = new Date(quiz.until);
        const available = new Date(quiz.start);
        if (now > available) {
            if (isFirstAttempt && now < due) {
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Instruction`);
            } else {
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Result`);
            }
        }
    }

    const fetchAllRecords = async (quizzes: any[]) => {
        const recordMap: { [quizId: string]: any } = {};
        for (const quiz of quizzes) {
            try {
                const record = await quizzesClient.findLatestRecord(quiz._id);
                recordMap[quiz._id] = record;
            } catch (err: any) {
                if (err.response?.status === 404) {
                    recordMap[quiz._id] = null;
                } else {
                    console.error(`Error fetching record for quiz ${quiz._id}:`, err);
                }
            }
        }
        setRecords(recordMap);
    };

    const fetchQuizzes = async () => {
        if (!cid) return;
        const quizzes = await coursesClient.findQuizzes(cid as string);
        quizzes.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());
        dispatch(setQuizzes(quizzes));
        await fetchAllRecords(quizzes);
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
                        {quizzes.length === 0 && currentUser.role === "FACULTY" && (
                            <div className="p-3 text-muted">
                                No quizzes yet. Click <strong>"+ Quiz"</strong> button to create one.
                            </div>
                        )}

                        {quizzes.map((quiz: any) => {
                            const record = records[quiz._id];
                            return (
                                <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                                    key={quiz._id}>
                                    <div className="d-flex align-items-start gap-3">
                                        <BsGripVertical className="me-2 fs-3" />
                                    </div>
                                    <div className="flex-grow-1 ms-3">   
                                        <Button variant="link" className="fw-bold text-decoration-none text-dark p-0 fs-5" 
                                            onClick={() => handleClickQuiz(quiz)}
                                        >
                                            {quiz.name}
                                        </Button>
                                    
                                        <div className="text-muted small">
                                            <strong>{getAvailability(quiz)}</strong> |
                                            <strong> Due</strong> {formatDateTime(quiz.until)} | {quiz.points} pts 
                                            | {quiz.questions?.length || 0} Questions
                                            {currentUser.role === "STUDENT" && record && (
                                                <> | <span className="text-danger"> {record.score} pts</span></>
                                            )}
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
                            )           
                        })}      
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>

        </div>  
    )
}