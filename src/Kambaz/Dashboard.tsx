import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { addCourse, deleteCourse, setCourse, updateCourse } from "./Courses/reducer";
import { useState } from "react";
import { toggleEnrollment } from "./Account/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.courseReducer.courses);
  const course = useSelector((state: RootState) => state.courseReducer.course);
  const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
  if (!currentUser) return null;
  const enrollments = useSelector((state: RootState) => state.accountReducer.enrollments);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleSetCourse = (c: any) => dispatch(setCourse(c));
  const handleAddCourse = () => dispatch(addCourse({ ...course, creator: currentUser._id }));
  const handleDeleteCourse = (id: string) => dispatch(deleteCourse(id));
  const handleUpdateCourse = () => dispatch(updateCourse(course));
  const handleToggleEnrollment = (courseId: string) =>
    dispatch(toggleEnrollment({ userId: currentUser._id, courseId }));
  const isEnrolled = (courseId: string) =>
    enrollments.some(e => e.user === currentUser._id && e.course === courseId);
  const visibleCourses = showAllCourses
    ? courses
    : courses.filter(
        c => c.creator === currentUser._id || isEnrolled(c._id)
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          className="mt-2 float-end"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "My Courses" : "Enrollments"}
        </Button>
      </h1> <hr />

      {currentUser.role === "FACULTY" && (
        <>
          <h5>New Course
          <button className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={handleAddCourse} > Add </button>
          <button className="btn btn-warning float-end me-2"
                  onClick={handleUpdateCourse} id="wd-update-course-click"> Update </button>
        </h5><br />

        <FormControl value={course.name} className="mb-2" 
          onChange={(e) => handleSetCourse({ ...course, name: e.target.value }) } />
        <FormControl value={course.description} as="textarea" rows={3}
          onChange={(e) => handleSetCourse({ ...course, description: e.target.value }) }/><hr />
        </>
        )}

      <h2 id="wd-dashboard-published">Published Courses ({visibleCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map(c => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={c._id}>
            <Card> 
                <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                  {c.name} </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                  {c.description} </Card.Text>

                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-2">
                    {isEnrolled(c._id) ? (
                      <Button variant="danger" onClick={() => handleToggleEnrollment(c._id)}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button variant="success" onClick={() => handleToggleEnrollment(c._id)}>
                        Enroll
                      </Button>
                    )}

                    {isEnrolled(c._id) && (
                      <Link to={`/Kambaz/Courses/${c._id}/Home`} className="btn btn-primary ms-2">
                        Go
                      </Link>
                    )}

                    {currentUser.role === "FACULTY" && (
                      <><button onClick={(event) => {
                          event.preventDefault();
                          handleDeleteCourse(c._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                      </button>

                      <button id="wd-edit-course-click"
                          onClick={(event) => {
                              event.preventDefault();
                              handleSetCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                      </button></>
                    )}
                  </div>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
      </div>
    </div>
);}
