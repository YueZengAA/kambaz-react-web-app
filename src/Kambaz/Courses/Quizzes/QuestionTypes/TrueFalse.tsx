export default function TrueFalse({ question, index }: { question: any; index: number }) {
    return (
        <div className="mb-4">
        <h5>Question {index + 1} ({question.points} pts)</h5>
        <p>{question.question}</p>
        <div>
            <input type="radio" name={`q${index}`} id={`q${index}-true`} />
            <label htmlFor={`q${index}-true`} className="ms-2">True</label>
        </div>
        <div>
            <input type="radio" name={`q${index}`} id={`q${index}-false`} />
            <label htmlFor={`q${index}-false`} className="ms-2">False</label>
        </div>
        </div>
    );
}
