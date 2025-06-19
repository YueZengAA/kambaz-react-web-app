import { Button, Card, FormControl, FormGroup, FormLabel, FormSelect } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as quizzesClient from "./client";

type QuizContextType = {
    quiz: any;
    setQuiz: React.Dispatch<React.SetStateAction<any>>;
};

export default function QuestionsEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const {quiz, setQuiz} = useOutletContext<QuizContextType>();

    const handleAddQuestion = async() => {
        const newQuestion = {
            _id: uuidv4(), 
            type: "MULTIPLE_CHOICE",
            question: "",
            options: ["", "", "", ""],
            answer: "",
            points: 0,
        };
        const updatedQuiz = { ...quiz, questions: [...quiz.questions, newQuestion] }
        //setQuiz(updatedQuiz);

        const saved = await quizzesClient.updateQuiz(updatedQuiz); 
        setQuiz(saved);
    };

    const handleQuestionChange = async (index: number, field: string, value: any) => {
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
        };
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleQuestionUpdate = async (index: number) => {
        const question = quiz.questions[index];
        const savedQuestion = await quizzesClient.updateQuestion(
            quiz._id,
            question._id,
            question
        );
        const updatedQuestions = [...quiz.questions];
        updatedQuestions[index] = savedQuestion;
        setQuiz({ ...quiz, questions: updatedQuestions });
    }


    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    const handleSave = async () => {   
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`);
    };

    const handleQuizChange = (field: string, value: any) => {
        setQuiz({ ...quiz, [field]: value });
    };

    return (
        <div id="wd-quiz-editor-questions">
            <Button variant="secondary" size="lg" className="d-block mx-auto my-4 " id="wd-add-questions"
                onClick={handleAddQuestion}
                >
                <FaPlus className="position-relative me-2"/>
                New Question
            </Button>

            {quiz.questions.map((q: any, index: number) => (
                <Card>
                    <FormSelect value={q.type} onChange={(e) => handleQuestionChange(index, "type", e.target.value)}>
                        <option value="TRUE_FALSE">True/False</option>
                        <option value="MULTIPLE_CHOICE">Multiple choice</option>
                        <option value="FILL_BLANK">Fill Blank</option>
                    </FormSelect>
                    <hr/>
                    <FormGroup className="mb-1">
                        <FormLabel>Question {index}</FormLabel>
                        <FormControl as="textarea" rows={5} value={q.question}
                            onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                        />
                    </FormGroup>

                    <Button variant="danger"  className="ms-auto"
                        onClick={() => handleQuestionUpdate(index)}>
                        Update
                    </Button>
                
    
                </Card>
            )
                 
            )}

            


            <hr/>
            <button className="btn btn-danger me-2 float-end" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary float-end me-2" onClick={handleCancel}>Cancel</button>
        </div>
    )
}