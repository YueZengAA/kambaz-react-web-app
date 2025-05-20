import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
            <Row xs={1} md={5} className="g-4">
                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Full Stack software developer</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>
                
                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/5001.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                    CS5001 Foundation of Computer Sciences
                                </Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Fall 2024</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/Action.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                AI in Action
                                </Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                AI in the Workplace</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/Math.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                Align Math
                                </Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Align Math Foundations</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/5004.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                Object-Oriented Design
                                </Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Spring 2025</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/5002.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                Discrete Structures
                                </Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Fall 2024</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>

                <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                        <Link to="/Kambaz/Courses/1234/Home"
                            className="wd-dashboard-course-link text-decoration-none text-dark">
                            <Card.Img variant="top" src="/images/5008.jpg" width="100%" height={160}/>
                            <Card.Body>
                                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                                Data Structure and Algorithms
                                </Card.Title>
                                <Card.Text  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                                Spring 2025</Card.Text>
                                <Button variant="primary">Go</Button>
                            </Card.Body>
                        </Link>
                    </Card>
                </Col>


            </Row>

        </div>
      </div>
    </div>
);}
