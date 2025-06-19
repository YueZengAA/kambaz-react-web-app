export default function FillBlank({ question, index }: { question: any; index: number }) {
    return (
        <div className="mb-4">
            <h5>Question {index + 1} ({question.points} pts)</h5>
            <p>{question.question}</p>
            <input type="text" className="form-control" placeholder="Your answer..." />
        </div>
    );
}