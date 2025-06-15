import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
// import * as courseClient from "./Courses/client";
// import { useEffect, useState } from "react";
// import * as userClient from "./Account/client";
// import * as enrollmentClient from "./client";
//import { useState } from "react";

export default function Dashboard({
    courses,
    setCourse,
    course,
    addNewCourse,
    updateCourse,
    deleteCourse,
    enrolling, 
    setEnrolling,
    updateEnrollment
  }: {
    courses: any[];
    setCourse: (course: any) => void;
    course: any;
    addNewCourse: () => void;
    updateCourse: () => void;
    deleteCourse: (courseId: string) => void;
    enrolling: boolean; 
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
  }) {
    
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const [showAllCourses, setShowAllCourses] = useState(false);
  // const [enrollments, setEnrollments] = useState<any[]>([]);

  // const fetchEnrollments = async () => {
  //   const data = await enrollmentClient.fetchEnrollments();
  //   setEnrollments(data);
  // };

  // useEffect(() => {
  //   fetchEnrollments();
  // }, []);

  // const handleEnroll = async (courseId: string) => {
  //   await enrollmentClient.enroll(currentUser._id, courseId);
  //   fetchEnrollments();
  // };

  // const handleUnenroll = async (courseId: string) => {
  //   const enrollment = enrollments.find(
  //     (e: any) => e.user === currentUser._id && e.course === courseId
  //   );
  //   if (enrollment) {
  //     await enrollmentClient.unenroll(enrollment._id);
  //     fetchEnrollments();
  //   }
  // };


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1> <hr />

      {currentUser.role === "FACULTY" && (
        <>
        <h5>
        New Course
        <button className="btn btn-primary float-end" onClick={addNewCourse}>
          Add
        </button>
        <Button
          variant="success"
          className="float-end me-2"
          onClick={updateCourse}
        >
          Update
        </Button>
        <br />
        <input
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          className="form-control mb-2"
        />
        <textarea
          value={course.description}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
          className="form-control"
        />
      </h5>
      <hr /></>)}
      
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title
                        className="wd-dashboard-course-title
                        text-nowrap overflow-hidden"
                      >
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description
                       overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </Card.Text>
                      
                      <Link to={`/Kambaz/Courses/${course._id}/Home`} className="btn btn-primary ms-2">
                          Go
                      </Link>

                      {enrolling && (
                        <button onClick={(event) => {
                            event.preventDefault();
                            updateEnrollment(course._id, !course.enrolled);
                          }}
                          className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                          {course.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      )}

                      {currentUser.role === "FACULTY" && (
                        <>
                          <Button
                            variant="danger"
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="float-end"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="me-2 float-end"
                          >
                            Edit
                          </Button>
                      </>)}
                      
                      
                    </Card.Body>
                  
                </Card>
              </Col>
            
            ))}
        </Row>
      </div>
    </div>
  );
}
