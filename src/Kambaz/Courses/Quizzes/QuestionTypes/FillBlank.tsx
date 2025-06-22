import { useState } from "react";
import { Card, Col, FormControl, Row } from "react-bootstrap";

export default function FillBlank(
    { question, index, onAnswer }: { question: any; index: number; onAnswer: any }
) {
    const blanks = Array.isArray(question.answer) ? question.answer : [];
    
    const [selected, setSelected] = useState<string[]>(Array(blanks.length).fill(""));

    const handleChange = (value: string, i: number) => {
        const updated = [...selected];
        updated[i] = value;
        setSelected(updated);
        onAnswer(question._id, updated); 
    };

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
                            name={`preview-${i}`}
                            value={selected[i] || ""}
                            onChange={(e) => handleChange(e.target.value, i)}  
                        />
                    ))}
            </Card>
        </div>
    );
}