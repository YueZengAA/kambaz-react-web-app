export default function MultipleChoice({ question, index }: { question: any; index: number }) {
    return (
        <div className="mb-4">
            <h5>Question {index + 1} ({question.points} pts)</h5>
            <p>{question.question}</p>
            {question.options.map((opt: string, i: number) => (
                <div key={i}>
                    <input type="radio" name={`q${index}`} id={`q${index}-opt${i}`} />
                    <label htmlFor={`q${index}-opt${i}`} className="ms-2">{opt}</label>
                </div>
            ))}
        </div>
    );
}