import { Card, Col, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { useEffect, useState } from "react";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
    const { aid, cid } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const isNew = aid === "new";

    const [assignment, setAssignment] = useState<any>({
        _id: Date.now().toString(),
        title: "",
        description: "",
        points: "100",
        dueDate: "2024-05-13",
        availableFrom: "2024-05-06",
        availableUntil: "2024-05-20",
        course: cid,
      });
    
    useEffect(() => {
        if (!isNew) {
          const found = assignments.find((a: any) => a._id === aid);
          if (found) {
            setAssignment(found);
          }
        }
      }, [aid]);
    
    const handleChange = (field: string, value: any) => {
        setAssignment({ ...assignment, [field]: value });
      };

    const handleSave = async () => {
        if (isNew) {
            const created = await assignmentsClient.createAssignment(cid as string, assignment); 
            dispatch(addAssignment(created));
        } else {
            const updated = await assignmentsClient.updateAssignment(assignment);
            dispatch(updateAssignment(updated));
        }
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };
    
    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
      };

    return (
        <div id="wd-assignments-editor">
            <FormGroup className="mb-1" controlId="wd-textarea">
                <FormLabel>Assignment Name</FormLabel>
                <FormControl type="text" value={assignment.title}
                    onChange={(e) => handleChange("title", e.target.value)}/>
            </FormGroup>

            <br /><br />
            <FormGroup className="mb-1">
                <FormLabel>Description</FormLabel>
                <FormControl
                    as="textarea"
                    rows={10}
                    value={assignment.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                />
                
            </FormGroup>
            <br /><br/>


            <FormGroup as={Row} className="mb-3" id="wd-points">
                <FormLabel column sm={2} className="text-end">
                    Points
                </FormLabel>
                <Col sm={10}>
                    <FormControl type="text" value={assignment.points}
                        onChange={(e) => handleChange("points", e.target.value)}/>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-group">
                <FormLabel column sm={2} className="text-end">
                    Assignment Group
                </FormLabel>
                <Col sm={10}>
                    <FormSelect>
                        <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </FormSelect>
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-display-grade-as">
                <FormLabel column sm={2} className="text-end">
                    Display Grade as
                </FormLabel>
                <Col sm={10}>
                    <FormSelect>
                        <option selected value="Percentage">Percentage</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </FormSelect>
                </Col>
            </FormGroup>
                
            <FormGroup as={Row} className="mb-3" id="wd-submission-type">
                <FormLabel column sm={2} className="text-end">
                    Submission Type
                </FormLabel>
                <Col sm={10}>
                    <Card className="p-3">
                        <FormSelect>
                            <option selected value="Online">Online</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </FormSelect>

                        <div className="fw-bold mb-3 mt-3">Online Entry Options</div>
                        <FormCheck className="mb-2" label="Text Entry" />
                        <FormCheck className="mb-2" label="Website URL" />
                        <FormCheck className="mb-2" label="Media Recordings" />
                        <FormCheck className="mb-2" label="Student Annotation" />
                        <FormCheck className="mb-2" label="File Uploads" />

                    </Card>
                    
                </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-3" id="wd-assign-to">
                <FormLabel column sm={2} className="text-end">
                    Assign
                </FormLabel>
                <Col sm={10}>
                    <Card className="p-3">
                        <FormGroup className="fw-bold mb-3" id="wd-assign-to">
                            <FormLabel>Assign to</FormLabel>
                            <FormControl type="text" defaultValue="Everyone"/>
                        </FormGroup>

                        <FormGroup className="fw-bold mb-3" id="wd-due-date">
                            <FormLabel>Due</FormLabel>
                            <FormControl type="date" value={assignment.dueDate}
                                onChange={(e) => handleChange("dueDate", e.target.value)}/>
                        </FormGroup>

                        <FormGroup className="fw-bold mb-3">
                            <Row>
                                <Col md={6}>
                                    <FormLabel id="wd-available-from">Available from</FormLabel>
                                    <FormControl type="date" value={assignment.availableFrom}
                                        onChange={(e) => handleChange("availableFrom", e.target.value)}/>
                                </Col>
                                <Col md={6}>
                                    <FormLabel id="wd-available-until">Until</FormLabel>
                                    <FormControl type="date" value={assignment.availableUntil}
                                        onChange={(e) => handleChange("availableUntil", e.target.value)}/>
                                </Col>
                            </Row>
                            
                        </FormGroup>
                    
                    </Card>
                    
                </Col>
            </FormGroup>


            <button className="btn btn-danger me-2 float-end" onClick={handleSave}>Save</button>

            <button className="btn btn-secondary float-end me-2" onClick={handleCancel}>Cancel</button>
            
           
            
        </div>
);}

  