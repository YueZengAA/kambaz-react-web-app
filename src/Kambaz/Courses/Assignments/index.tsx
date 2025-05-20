import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";

export default function Assignments() {
    return (
      <div id="wd-assignments">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <InputGroup size="lg" style={{ maxWidth: 300 }}>
                <InputGroup.Text>
                    <FaSearch className="text-muted" />
                </InputGroup.Text>
                <FormControl id="wd-search-assignment" placeholder="Search..." aria-label="Search"/>
            </InputGroup>

            <div className="d-flex gap-2">
                <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment">
                    <FaPlus className="position-relative me-2"/>
                    Assignment
                </Button>
                <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
                    <FaPlus className="position-relative me-2" />
                    Group
                </Button>
            </div>
        </div>

        <ListGroup className="rounded-0" id="wd-assignment-list">
            <ListGroup.Item className="p-0 mb-5 fs-5 border-gray ">
                <div className="p-3 ps-2 bg-secondary d-flex justify-content-between">
                    <div id="wd-assignments-title" className="d-flex align-items-center">
                        <BsGripVertical className="me-2 fs-3" />
                        <strong>ASSIGNMENTS</strong>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <div className="rounded-pill px-3 py-1 text-muted small bg-white">
                        40% of Total
                        </div>
                        <BsPlus className="fs-2" />
                        <IoEllipsisVertical className="fs-4" />
                    </div>
                </div>

                <ListGroup className="wd-lessons rounded-0">
                    <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-start gap-3">
                            <BsGripVertical className="me-2 fs-3" />
                            <LuNotebookPen className="me-2 fs-3 text-success" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <div>
                                <div className="fw-bold">
                                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                                        className="wd-assignment-link text-decoration-none text-dark">
                                            A1
                                    </a>
                                </div>
                                <div className="text-muted small">
                                    <span className="text-danger">Multiple Modules</span> |
                                    <strong className="ms-1">Not available until</strong> May 6 at 12:00am |
                                    <br />
                                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <LessonControlButtons />
                        </div>
                    </ListGroup.Item>
                        
                    <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-start gap-3">
                            <BsGripVertical className="me-2 fs-3" />
                            <LuNotebookPen className="me-2 fs-3 text-success" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <div>
                                <div className="fw-bold">
                                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                                        className="wd-assignment-link text-decoration-none text-dark">
                                            A2
                                    </a>
                                </div>
                                <div className="text-muted small">
                                    <span className="text-danger">Multiple Modules</span> |
                                    <strong className="ms-1">Not available until</strong> May 13 at 12:00am |
                                    <br />
                                    <strong >Due</strong> May 20 at 11:59pm | 100 pts
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <LessonControlButtons />
                        </div>
                    </ListGroup.Item>

                    <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-start gap-3">
                            <BsGripVertical className="me-2 fs-3" />
                            <LuNotebookPen className="me-2 fs-3 text-success" />
                        </div>
                        <div className="flex-grow-1 ms-3">
                            <div>
                                <div className="fw-bold">
                                    <a href="#/Kambaz/Courses/1234/Assignments/123"
                                        className="wd-assignment-link text-decoration-none text-dark">
                                            A3
                                    </a>
                                </div>
                                <div className="text-muted small">
                                    <span className="text-danger">Multiple Modules</span> |
                                    <strong className="ms-1">Not available until</strong> May 20 at 12:00am |
                                    <br />
                                    <strong>Due</strong> May 27 at 11:59pm | 100 pts
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <LessonControlButtons />
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </ListGroup.Item>
        </ListGroup>
      </div>
  );}
  