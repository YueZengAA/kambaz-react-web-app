import { Card, Col, FormCheck, Row } from "react-bootstrap";

export default function MultipleChoice({ question, index }: { question: any; index: number }) {
    return (
        <div className="mb-4">
            <Card className="p-3 mb-3">  
                <Row>
                    <Col sm={10}>
                        <h4>Question {index + 1}</h4>
                    </Col>
                    <Col sm={2}>
                        <h4>{question.points} pts</h4>
                    </Col>
                </Row> 
                <hr/>
                <p>{question.question}</p>
                {question.options.map((opt: string, i: number) => (
                    <FormCheck
                        key={i}
                        type="radio"
                        name={`preview-${index}`}
                        label={opt}
                    />
                ))}
            </Card>
        </div>
    );
}