import { Button, Card, Col, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as quizzesClient from "./client";
import { useState } from "react";

type QuizContextType = {
    quiz: any;
    setQuiz: React.Dispatch<React.SetStateAction<any>>;
};

export default function QuestionsEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const {quiz, setQuiz} = useOutletContext<QuizContextType>();
    const [editingQuestions, setEditingQuestions] = useState<Record<string, any>>({});
    const [editingStates, setEditingStates] = useState<Record<string, boolean>>({});
    const [deletedQuestionIds, setDeletedQuestionIds] = useState<string[]>([]);
    
    const handleAddQuestion = async() => {
        const newQuestion = {
            _id: uuidv4(), 
            type: "MULTIPLE_CHOICE",
            question: "[Question here]",
            options: ["Possible Answer 1", "Possible Answer 2"],
            answer: undefined,
            points: 0,
        };

        const updatedQuestions = [...quiz.questions, newQuestion];
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleQuestionChange = async (index: number, field: string, value: any, optIndex?: number) => {
        const qid = quiz.questions[index]._id;
        const question = { ...editingQuestions[qid] || quiz.questions[index] };

        if (field === "type") {
            question.type = value;
            if (value === "MULTIPLE_CHOICE") {
                question.options = ["Possible Answer 1", "Possible Answer 2"];
                question.answer = 0;
            } else if (value === "TRUE_FALSE") {
                question.options = undefined;
                question.answer = true;
            } else if (value === "FILL_BLANK") {
                question.options = undefined;
                question.answer = ["Possible Answer"];
            }
        } else if (question.type === "FILL_BLANK" && field === "answer" && typeof optIndex === "number") {
            const newAnswers = Array.isArray(question.answer) ? [...question.answer] : [];
            newAnswers[optIndex] = value;
            question.answer = newAnswers;
        } else if (field === "options" && typeof optIndex === "number") {
            const newOptions = [...question.options];
            newOptions[optIndex] = value;  
            question.options = newOptions;
        } else {
            question[field] = value;
        }

        setEditingQuestions((prev) => ({...prev, [qid]: question}));
    };

    const handleQuestionUpdate = async (index: number) => {
        const qid = quiz.questions[index]._id;
        const rawQuestion = { ...editingQuestions[qid] || quiz.questions[index] };

        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = rawQuestion;

        const updatedTotalPoints = updatedQuestions.reduce(
            (sum, q) => sum + (q.points || 0), 0
        );

        await quizzesClient.updateQuiz({ ...quiz, questions: updatedQuestions, points: updatedTotalPoints, });

        const latestQuiz = await quizzesClient.findQuizById(quiz._id);
        setQuiz(latestQuiz);

        setEditingQuestions((prev) => {
            const copy = { ...prev };
            delete copy[qid];
            return copy;
        });
        setEditingStates((prev) => {
            const copy = { ...prev };
            delete copy[qid];
            return copy;
        });
    }

    const addOption = async (questionIndex: number) => {
        const qid = quiz.questions[questionIndex]._id;
        const current = editingQuestions[qid] || quiz.questions[questionIndex];
        const newOptions = [...current.options, ""];
        const updated = { ...current, options: newOptions };
        setEditingQuestions((prev) => ({ ...prev, [qid]: updated }));
    };

    const deleteOption = async (questionIndex: number, optionIndex: number) => {
        const qid = quiz.questions[questionIndex]._id;
        const question = { ...editingQuestions[qid] || quiz.questions[questionIndex] };

        question.options = question.options.filter((_option: string, i: number) => i !== optionIndex);

        if (question.answer === optionIndex) {
            question.answer = null;
        } else if (typeof question.answer === "number" && question.answer > optionIndex) {
            question.answer -= 1;
        }

        setEditingQuestions((prev) => ({
            ...prev,
            [qid]: question
        }));
    };

    const addBlank = async (questionIndex: number) => {
        const qid = quiz.questions[questionIndex]._id;
        const current = editingQuestions[qid] || quiz.questions[questionIndex];
        const currentAnswers = Array.isArray(current.answer) ? [...current.answer] : [];
        currentAnswers.push("");
        const updated = { ...current, answer: currentAnswers };
        setEditingQuestions((prev) => ({ ...prev, [qid]: updated }));
    };

    const deleteBlank = async (questionIndex: number, blankIndex: number) => {
        const qid = quiz.questions[questionIndex]._id;
        const question = { ...editingQuestions[qid] || quiz.questions[questionIndex] };

        question.answer = question.answer.filter((_: string, i: number) => i !== blankIndex);

        setEditingQuestions((prev) => ({
            ...prev,
            [qid]: question
        }));
    };

    const toggleEdit = (index: number, isEditing: boolean) => {
        const updated = [...quiz.questions];
        const qid = updated[index]._id;

        if (isEditing) {
            setEditingQuestions((prev) => ({
                ...prev,
                [qid]: JSON.parse(JSON.stringify(updated[index]))
            }));
        } else {
            setEditingQuestions((prev) => {
                const copy = { ...prev };
                delete copy[qid];
                return copy;
            });
        }
        setEditingStates((prev) => ({
            ...prev,
            [qid]: isEditing,
        }));
    };

    const deleteQuestion = (index: number) => {
        const question = quiz.questions[index];
        const updatedQuestions = quiz.questions.filter((_: any, i: number) => i !== index);
        setQuiz((prev: any) => ({ ...prev, questions: updatedQuestions }));

        if (question._id) {
            setDeletedQuestionIds((prev) => [...prev, question._id]);
        }

        setEditingQuestions((prev) => {
            const copy = { ...prev };
            delete copy[question._id];
            return copy;
        });
        setEditingStates((prev) => {
            const copy = { ...prev };
            delete copy[question._id];
            return copy;
        });
    };

    const handleCancel = () => {
        setDeletedQuestionIds([]);
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    const handleSave = async () => {   
        for (const qid of deletedQuestionIds) {
            await quizzesClient.deleteQuestion(quiz._id, qid);
        }

        const updatedTotalPoints = quiz.questions.reduce(
            (sum: Number, q: any) => sum + (q.points || 0), 0
        );
        await quizzesClient.updateQuiz({ ...quiz, points: updatedTotalPoints });

        setDeletedQuestionIds([]);
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`);
    };

    const handleSaveAndPublish = async () => {
        for (const qid of deletedQuestionIds) {
            await quizzesClient.deleteQuestion(quiz._id, qid);
        }

        const updatedTotalPoints = quiz.questions.reduce(
            (sum: number, q: any) => sum + (q.points || 0), 0
        );

        await quizzesClient.updateQuiz({
            ...quiz,
            points: updatedTotalPoints,
            status: "PUBLISH"
        });

        setDeletedQuestionIds([]);
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div id="wd-quiz-editor-questions">
                            <Button variant="secondary" size="lg" className="d-block mx-auto my-4 " id="wd-add-questions"
                                onClick={handleAddQuestion}
                                >
                                <FaPlus className="position-relative me-2"/>
                                New Question
                            </Button>

                            {quiz.questions.map((q: any, index: number) => {
                                const editing = editingQuestions[q._id] || q;
                                return (
                                    <Card key={index} className="p-3 mb-3"> 
                                    {!editingStates[q._id] ? (
                                        <>
                                            <Row>
                                                <Col sm={10}>
                                                    <h4>Question {index + 1}</h4>
                                                </Col>
                                                <Col sm={2}>
                                                    <h4>{editing.points} pts</h4>
                                                </Col>
                                            </Row> 
                                            <hr/>
                                            <p>{editing.question}</p>

                                            {editing.type === "MULTIPLE_CHOICE" && (
                                                <FormGroup>
                                                    {editing.options.map((opt: string, i: number) => ( 
                                                        <FormCheck
                                                            key={i}
                                                            type="radio"
                                                            name={`preview-${index}`}
                                                            checked={editing.answer === i}
                                                            label={opt}
                                                            disabled
                                                        />
                                                    ))}
                                                </FormGroup>  
                                            )}

                                            {editing.type === "TRUE_FALSE" && (
                                                <FormGroup>
                                                    <FormCheck type="radio" label="True" disabled checked={editing.answer === true}/>
                                                    <FormCheck type="radio" label="False" disabled checked={editing.answer === false}/>
                                                </FormGroup>
                                            )}

                                            {editing.type === "FILL_BLANK" && (
                                                <FormGroup>
                                                    {(Array.isArray(editing.answer) ? editing.answer : [])
                                                        .map((a: string, i: number) => ( 
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

                                            <div className="d-flex justify-content-end mt-3">
                                                <Button variant="secondary" className="me-2" onClick={() => deleteQuestion(index)}>
                                                    Delete
                                                </Button>
                                                <Button variant="danger" onClick={() => toggleEdit(index, true)}>
                                                    Edit
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Row>
                                                <Col sm={3}>
                                                    <FormSelect value={editing.type} onChange={(e) => handleQuestionChange(index, "type", e.target.value)}>
                                                        <option value="TRUE_FALSE">True/False</option>
                                                        <option value="MULTIPLE_CHOICE">Multiple choice</option>
                                                        <option value="FILL_BLANK">Fill Blank</option>
                                                    </FormSelect>
                                                </Col>
                                                <Col sm={3}>
                                                    <FormGroup as={Row} className="mb-1">
                                                        <FormLabel column sm="auto">Points:</FormLabel>
                                                        <Col>
                                                            <FormControl type="text" value={editing.points}
                                                                onChange={(e) => handleQuestionChange(index, "points", Number(e.target.value))}/>
                                                        </Col>
                                                    </FormGroup>
                                                </Col>
                                            </Row> 
                                            <hr/>

                                            <FormGroup className="mb-3">
                                                <FormLabel className="fs-4">Question:</FormLabel>
                                                <FormControl as="textarea" rows={3} value={editing.question}
                                                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                                                />
                                            </FormGroup>

                                            <FormGroup className="mb-3">
                                                <FormLabel className="fs-4">Answer:</FormLabel>
                                                {editing.type === "MULTIPLE_CHOICE" && Array.isArray(q.options) &&
                                                    editing.options.map((option: any, optIndex: number) => (
                                                        <FormGroup as={Row} className="mb-3" key={optIndex}>
                                                            <Col sm={1} className="d-flex align-items-center justify-content-end">
                                                                <FormCheck
                                                                    type="radio"
                                                                    name={`correctAnswer-${index}`} 
                                                                    checked={editing.answer === optIndex}
                                                                    onChange={() => handleQuestionChange(index, "answer", optIndex)}
                                                                />
                                                            </Col>
                                                            <FormLabel column sm={3} className="text-end">
                                                                Possible Answer:
                                                            </FormLabel>
                                                            <Col sm={4}>  
                                                                <FormControl type="text" value={option}
                                                                    onChange={(e) => handleQuestionChange(index, "options", e.target.value, optIndex)}/>
                                                            </Col>
                                                            <Col>
                                                                <FaTrash className="text-danger me-2" role="button" 
                                                                    onClick={() => deleteOption(index, optIndex)}/>
                                                            </Col>
                                                        </FormGroup>
                                                ))}

                                                {editing.type === "TRUE_FALSE" && (
                                                    <Row className="mb-2">
                                                        <Col sm={2} className="d-flex align-items-center justify-content-end">
                                                            <FormCheck
                                                            type="radio"
                                                            name={`trueFalseAnswer-${index}`}
                                                            checked={editing.answer === true}
                                                            onChange={() => handleQuestionChange(index, "answer", true)}
                                                            label="True"
                                                            />
                                                        </Col>
                                                        
                                                        <Col sm={2} className="d-flex align-items-center justify-content-end">
                                                            <FormCheck
                                                            type="radio"
                                                            name={`trueFalseAnswer-${index}`}
                                                            checked={editing.answer === false}
                                                            onChange={() => handleQuestionChange(index, "answer", false)}
                                                            label="False"
                                                            />
                                                        </Col>
                                                    </Row>
                                                )}

                                                {editing.type === "FILL_BLANK" && (
                                                    <div>
                                                        {(Array.isArray(editing.answer) ? editing.answer : [""]).map((ans: string, i: number) => (
                                                            <FormGroup as={Row} className="mb-2" key={i}>
                                                                <FormLabel column sm="3" className="text-end">Blank {i + 1}:</FormLabel>
                                                                <Col sm="6">
                                                                    <FormControl
                                                                        type="text"
                                                                        value={ans}
                                                                        onChange={(e) =>
                                                                        handleQuestionChange(index, "answer", e.target.value, i)
                                                                        }
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <FaTrash className="text-danger me-2" role="button" 
                                                                        onClick={() => deleteBlank(index, i)}/>
                                                                </Col>
                                                            </FormGroup>
                                                        ))}
                                                        
                                                    </div>
                                                )}
                                            </FormGroup>

                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div style={{ flex: 1 }}>
                                                    {editing.type === "MULTIPLE_CHOICE" && (
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => addOption(index)}
                                                            >
                                                            <FaPlus className="position-relative me-2"/>
                                                            Add Another Answer
                                                        </Button>
                                                    )}
                                                    {editing.type === "FILL_BLANK" && (
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() => addBlank(index)}
                                                            >
                                                            <FaPlus className="position-relative me-2"/>
                                                            Add Another Answer
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="d-flex gap-2">
                                                    <Button variant="secondary"  
                                                        onClick={() => toggleEdit(index, false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button variant="danger"  
                                                        onClick={async () => {
                                                            await handleQuestionUpdate(index);
                                                            toggleEdit(index, false);      
                                                        }}>
                                                        Update
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Card>
                                )
                            })}

                            
                        </div>
                    </div>
                </div>
            </div>

            <hr/>
            <button className="btn btn-danger me-2 float-end" onClick={handleSave}>Save</button>
            <button className="btn btn-danger me-2 float-end" onClick={handleSaveAndPublish}>Save and Publish</button>
            <button className="btn btn-secondary float-end me-2" onClick={handleCancel}>Cancel</button>
        </div>
    )
}