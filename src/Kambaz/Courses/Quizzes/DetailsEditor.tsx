import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as quizzesClient from "./client";
import { Card, Col, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";

export default function DetailsEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<any>(null);
    
    const handleChange = (field: string, value: any) => {
        setQuiz({ ...quiz, [field]: value });
      };

    const fetchQuizDetails = async () => {
        const quiz = await quizzesClient.findQuizById(qid as string)
        setQuiz(quiz);
    }

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    const handleSave = async () => {   
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`);
    };

    const handleSaveAndPublish = async () => {   
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };
    
    useEffect(() => {
        fetchQuizDetails();
    }, [qid]);

    if (!quiz) return <div>Loading...</div>;
        
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
                    <FormSelect>
                        <option selected value="GQ">Graded Quiz</option>
                        <option value="PQ">Practice Quiz</option>
                        <option value="GS">Graded Survey</option>
                        <option value="US">Ungraded Survey</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-points">
                <FormLabel column sm={3} className="text-end">
                    Points
                </FormLabel>
                <Col sm={5}>
                    <FormControl type="text" value={quiz.points}
                        onChange={(e) => handleChange("points", e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Assignment Group
                </FormLabel>
                <Col sm={5}>
                    <FormSelect>
                        <option selected value="QUIZZES">Quizzes</option>
                        <option value="EXAMS">Exams</option>
                        <option value="ASSIGNMENTS">Assignments</option>
                        <option value="PROJECT">Project</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Shuffle Answers
                </FormLabel>
                <Col sm={5}>
                    <FormSelect>
                        <option selected value="YES">Yes</option>
                        <option value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-time-limits">
                <FormLabel column sm={3} className="text-end">
                    Time Limit (min)
                </FormLabel>
                <Col sm={5}>
                    <FormControl type="text" value="20"
                        onChange={(e) => handleChange("", e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Allow Multiple Attempts
                </FormLabel>
                <Col sm={5}>
                    <FormSelect>
                        <option value="YES">Yes</option>
                        <option selected value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
                <FormLabel column sm={3} className="text-end">
                    Show Correct Answers 
                </FormLabel>
                <Col sm={5}>
                    <Card className="p-3">
                        <FormSelect className="mb-3">
                            <option selected value="YES">Yes</option>
                            <option value="NO">No</option>
                        </FormSelect>
                        <FormGroup className="fw-bold mb-3" id="wd-due-date">
                            <FormLabel>After</FormLabel>
                            <FormControl type="date" value="2025-06-15"
                                onChange={(e) => handleChange("dueDate", e.target.value)}/>
                        </FormGroup>
                    </Card>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3">
                <FormLabel column sm={3} className="text-end">
                    Access Code
                </FormLabel>
                <Col sm={5}>
                    <FormControl type="text" value=""
                        onChange={(e) => handleChange("", e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    One Question at a Time
                </FormLabel>
                <Col sm={5}>
                    <FormSelect>
                        <option selected value="YES">Yes</option>
                        <option value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Webcam Required
                </FormLabel>
                <Col sm={5}>
                    <FormSelect>
                        <option value="YES">Yes</option>
                        <option selected value="NO">No</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={3} className="text-end">
                    Lock Questions After Answering
                </FormLabel>
                <Col sm={5}>
                    <FormSelect>
                        <option value="YES">Yes</option>
                        <option selected value="NO">No</option>
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
                            <FormControl type="date" value="2025-06-25"
                                onChange={(e) => handleChange("dueDate", e.target.value)}/>
                        </FormGroup>

                        <FormGroup className="fw-bold mb-3">
                            <Row>
                                <Col md={6}>
                                    <FormLabel id="wd-available-from">Available from</FormLabel>
                                    <FormControl type="date" value="2025-06-10"
                                        onChange={(e) => handleChange("availableFrom", e.target.value)}/>
                                </Col>
                                <Col md={6}>
                                    <FormLabel id="wd-available-until">Until</FormLabel>
                                    <FormControl type="date" value="2025-06-25"
                                        onChange={(e) => handleChange("availableUntil", e.target.value)}/>
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