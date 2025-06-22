import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";
import { Card, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateQuiz, addQuiz } from "./reducer";

type QuizContextType = {
    quiz: any;
    setQuiz: React.Dispatch<React.SetStateAction<any>>;
};

export default function DetailsEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {quiz, setQuiz} = useOutletContext<QuizContextType>();
    const isNew = qid === "new";
    
    const handleChange = (field: string, value: any) => {
        setQuiz({ ...quiz, [field]: value });
      };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    const handleSave = async () => {   
        if (isNew) {
            const created = await coursesClient.createQuiz(cid as string, quiz); 
            dispatch(addQuiz(created));
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}/Details`)
        } else {
            const updated = await quizzesClient.updateQuiz(quiz);
            dispatch(updateQuiz(updated));
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`);
        }
        
    };

    const handleSaveAndPublish = async () => {
        const quizToPublish = { ...quiz, status: "PUBLISH" };
        if (isNew) {
            const created = await coursesClient.createQuiz(cid as string, quizToPublish); 
            dispatch(addQuiz(created));
        } else {
            const updated = await quizzesClient.updateQuiz(quizToPublish);
            dispatch(updateQuiz(updated));  
        }
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    useEffect(() => {}, [qid]);

    if (!quiz) return <div>Loading details ...</div>;
        
    return (
        <div id="wd-quiz-editor-details">
            <FormGroup className="mb-1" controlId="wd-textarea">
                <FormLabel>Quiz Name</FormLabel>
                <FormControl type="text" value={quiz.name}
                    onChange={(e) => handleChange("name", e.target.value)}/>
            </FormGroup>
            <br /><br />
            <FormGroup className="mb-1">
                <FormLabel>Description</FormLabel>
                <FormControl
                    as="textarea"
                    rows={5}
                    value={quiz.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </FormGroup>
            <br /><br/>

            <FormGroup as={Row} className="mb-3" id="wd-quiz-type">
                <FormLabel column sm={3} className="text-end">
                    Quiz Type
                </FormLabel>
                <Col sm={5}>
                    <FormSelect value={quiz.type} onChange={(e) => handleChange("type", e.target.value)}>
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-points">
                <FormLabel column sm={3} className="text-end">
                    Points
                </FormLabel>
                <Col sm={5}>
                    <FormControl type="text" value={quiz.points} disabled/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Assignment Group
                </FormLabel>
                <Col sm={5}>
                    <FormSelect value={quiz.group} onChange={(e) => handleChange("group", e.target.value)}>
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Shuffle Answers
                </FormLabel>
                <Col sm={5}>
                    <FormSelect value={quiz.shuffleAnswers} 
                        onChange={(e) => handleChange("shuffleAnswers", e.target.value)}>
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-time-limits">
                <FormLabel column sm={3} className="text-end">
                    Time Limit (min)
                </FormLabel>
                <Col sm={5}>
                    <FormControl type="text" value={quiz.timeLimit}
                        onChange={(e) => handleChange("timeLimit", e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Allow Multiple Attempts
                </FormLabel>
                <Col sm={5}>
                    <Card className="p-3">
                        <FormSelect className="mb-3" value={quiz.multipleAttempts}
                            onChange={(e) => handleChange("multipleAttempts", e.target.value)}>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </FormSelect>
                        <FormGroup className="mb-3" id="wd-due-date">
                            <FormLabel>How Many Attempts</FormLabel>
                            <FormControl type="text" defaultValue={quiz.howManyAttempts}
                                onChange={(e) => handleChange("howManyAttempts", e.target.value)}/>
                        </FormGroup>
                    </Card>
                    
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
                <FormLabel column sm={3} className="text-end">
                    Show Correct Answers 
                </FormLabel>
                <Col sm={5}>
                    <Card className="p-3">
                        <FormSelect className="mb-3" value={quiz.showCorrectAnswers}
                            onChange={(e) => handleChange("showCorrectAnswers", e.target.value)}>
                            <option value="YES">Yes</option>
                            <option value="NO">No</option>
                        </FormSelect>
                        <FormGroup className="mb-3" id="wd-due-date">
                            <FormLabel>After</FormLabel>
                            <FormControl type="date" defaultValue={quiz.showCorrectAnswersAfter}
                                onChange={(e) => handleChange("showCorrectAnswersAfter", e.target.value)}/>
                        </FormGroup>
                    </Card>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
                <FormLabel column sm={3} className="text-end">
                    Access Code
                </FormLabel>
                <Col sm={5}>
                    <FormControl type="text" value={quiz.accessCode}
                        onChange={(e) => handleChange("accessCode", e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    One Question at a Time
                </FormLabel>
                <Col sm={5}>
                    <FormSelect value={quiz.oneQuestionAtATime}
                        onChange={(e) => handleChange("oneQuestionAtATime", e.target.value)}>
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Webcam Required
                </FormLabel>
                <Col sm={5}>
                    <FormSelect value={quiz.webcamRequired}
                        onChange={(e) => handleChange("webcamRequired", e.target.value)}>
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Lock Questions After Answering
                </FormLabel>
                <Col sm={5}>
                    <FormSelect value={quiz.lockQuestions}
                        onChange={(e) => handleChange("lockQuestions", e.target.value)}>
                        <option value="YES">Yes</option>
                        <option value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-assign-to">
                <FormLabel column sm={3} className="text-end">
                    Assign
                </FormLabel>
                <Col sm={5}>
                    <Card className="p-3">
                        <FormGroup className="fw-bold mb-3" id="wd-assign-to">
                            <FormLabel>Assign to</FormLabel>
                            <FormControl type="text" defaultValue="Everyone"/>
                        </FormGroup>

                        <FormGroup className="fw-bold mb-3" id="wd-due-date">
                            <FormLabel>Due</FormLabel>
                            <FormControl type="date" value={quiz.due?.slice(0, 10)|| ""}
                                onChange={(e) => handleChange("due", e.target.value)}/>
                        </FormGroup>

                        <FormGroup className="fw-bold mb-3">
                            <Row>
                                <Col md={6}>
                                    <FormLabel id="wd-available-from">Available from</FormLabel>
                                    <FormControl type="date" value={quiz.start?.slice(0, 10)|| ""}
                                        onChange={(e) => handleChange("start", e.target.value)}/>
                                </Col>
                                <Col md={6}>
                                    <FormLabel id="wd-available-until">Until</FormLabel>
                                    <FormControl type="date" value={quiz.until?.slice(0, 10)|| ""}
                                        onChange={(e) => handleChange("until", e.target.value)}/>
                                </Col>
                            </Row> 
                        </FormGroup>
                    </Card>  
                </Col>
            </FormGroup>
            <hr/>

            <button className="btn btn-danger me-2 float-end" onClick={handleSave}>Save</button>
            <button className="btn btn-danger me-2 float-end" onClick={handleSaveAndPublish}>Save and Publish</button>
            <button className="btn btn-secondary float-end me-2" onClick={handleCancel}>Cancel</button>
        </div>
        
    )
}