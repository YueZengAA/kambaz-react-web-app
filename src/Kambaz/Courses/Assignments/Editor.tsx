import { Card, Col, FormCheck, FormControl, FormGroup, FormLabel, FormSelect, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { assignments } from "../../Database";

export default function AssignmentEditor() {
    const { aid } = useParams();
    const { cid } = useParams();

    return (
        <div id="wd-assignments-editor">
            <FormGroup className="mb-1" controlId="wd-textarea">
                <FormLabel>Assignment Name</FormLabel>
                {assignments.filter((assignment: any) => assignment._id === aid)
                    .map((assignment: any) => (
                        <FormControl type="text" defaultValue={`${assignment.title}`} />
                    ))}
            </FormGroup>

            <br /><br />
            <FormGroup className="mb-1">
                <Card className="p-3 border">
                    <p>
                        The assignment is <span className="text-danger">available online</span>
                    </p>
                    <p>
                        Submit a link to the landing page of your Web application running on Netlify.
                    </p>
                    <p>
                        The landing page should include the following:
                    </p>
                    <p>
                        <ul>
                            <li>Your full name and section</li>
                            <li>Links to each of the lab assignments</li>
                            <li>Link to the Kambaz application</li>
                            <li>Links to all relevant source code repositories</li>
                        </ul>
                    </p>
                    <p>
                        The Kambaz application should include a link to navigate back to the landing page.
                    </p>
                </Card>
            </FormGroup>
            <br /><br/>


            <FormGroup as={Row} className="mb-3" id="wd-points">
                <FormLabel column sm={2} className="text-end">
                    Points
                </FormLabel>
                <Col sm={10}>
                    <FormControl type="text" defaultValue="100"/>
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
                            <FormControl type="date" defaultValue="2024-05-06"/>
                        </FormGroup>

                        <FormGroup className="fw-bold mb-3">
                            <Row>
                                <Col md={6}>
                                    <FormLabel id="wd-available-from">Available from</FormLabel>
                                    <FormControl type="date" defaultValue="2024-05-06"/>
                                </Col>
                                <Col md={6}>
                                    <FormLabel id="wd-available-until">Until</FormLabel>
                                    <FormControl type="date" defaultValue="2024-05-20"/>
                                </Col>
                            </Row>
                            
                        </FormGroup>
                    
                    </Card>
                    
                </Col>
            </FormGroup>

            <Link
                to={`/Kambaz/Courses/${cid}/Assignments`}
                className="btn btn-danger me-2 float-end">
                Save
            </Link>

            <Link
                to={`/Kambaz/Courses/${cid}/Assignments`}
                className="btn btn-secondary me-1 float-end">
                Cancel
            </Link>
            
           
            
        </div>
);}

  