import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function QuestionsEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    
    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    const handleSave = async () => {   
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Details`);
    };
    return (
        <div id="wd-quiz-editor-questions">
            <Button variant="secondary" size="lg" className="d-block mx-auto my-4 " id="wd-add-questions"
                >
                <FaPlus className="position-relative me-2"/>
                New Question
            </Button>


            <hr/>
            <button className="btn btn-danger me-2 float-end" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary float-end me-2" onClick={handleCancel}>Cancel</button>
        </div>
    )
}