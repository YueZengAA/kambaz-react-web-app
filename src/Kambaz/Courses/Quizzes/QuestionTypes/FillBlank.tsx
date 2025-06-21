import { Card, Col, FormControl, FormGroup, Row } from "react-bootstrap";

export default function FillBlank({ question, index }: { question: any; index: number }) {
    const blanks = Array.isArray(question.answer) ? question.answer : [];
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
                    {blanks.map((_: any, i: number) => (
                        <FormControl
                            key={i}
                            type="text"
                            className="mb-2"
                            value=""        
                            onChange={() => {}}  
                        />
                    ))}
            </Card>
        </div>
    );
}