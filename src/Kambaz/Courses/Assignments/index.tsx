import { Button, FormControl, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { LuNotebookPen } from "react-icons/lu";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useEffect, useState } from "react";
import type { RootState } from "../../store";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { deleteAssignment, setAssignments } from "./reducer";


export default function Assignments() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const currentUser = useSelector((state: RootState) => state.accountReducer.currentUser);
    if (!currentUser) return null;
    
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    const handleDeleteClick = (assignmentId: string) => {
        setSelectedAssignmentId(assignmentId);
        setShowConfirm(true);
    };


    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedAssignmentId(null);
    };

    const confirmDelete = async () => {
        if (selectedAssignmentId) {
            await removeAssignment(selectedAssignmentId); 
        }
        setShowConfirm(false);
        setSelectedAssignmentId(null);
    };

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
    };

    const fetchAssignments = async () => {
        if (!cid) return;
        const assignments = await coursesClient.findAssignments(cid as string);
        dispatch(setAssignments(assignments));
    };


    useEffect(() => {
        fetchAssignments();
    }, [cid]);
    

    return (
      <div id="wd-assignments">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <InputGroup size="lg" style={{ maxWidth: 300 }}>
                <InputGroup.Text>
                    <FaSearch className="text-muted" />
                </InputGroup.Text>
                <FormControl id="wd-search-assignment" placeholder="Search..." aria-label="Search"/>
            </InputGroup>

            {currentUser.role === "FACULTY" && (
                <><div className="d-flex gap-2">
                    <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment"
                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}>
                        <FaPlus className="position-relative me-2"/>
                        Assignment
                    </Button>
                    <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
                        <FaPlus className="position-relative me-2" />
                        Group
                    </Button>
                </div></>)}
            
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
                    {assignments.map((assignment: any) => (
                        <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
                            key={assignment._id}>
                            <div className="d-flex align-items-start gap-3">
                                <BsGripVertical className="me-2 fs-3" />
                                {currentUser.role === "FACULTY" && (
                                    <LuNotebookPen className="me-2 fs-3 text-success" 
                                        role="button"
                                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`)}/>)}
                            </div>
                            <div className="flex-grow-1 ms-3">                                    
                                <div className="fw-bold">
                                    {assignment.title}
                                </div>
                                <div className="text-muted small">
                                    <span className="text-danger">Multiple Modules</span> |
                                    <strong className="ms-1">Not available until</strong> May 6 at 12:00am |
                                    <br />
                                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                                </div>
                            </div>

                            {currentUser.role === "FACULTY" && ( 
                                <>
                                <div className="d-flex align-items-center gap-3">
                                <div className="float-end">
                                      <GreenCheckmark />
                                      <FaTrash className="text-danger me-2 mb-1" role="button"
                                            onClick={() => handleDeleteClick(assignment._id)}/>
                                      <IoEllipsisVertical className="fs-4" />
                                    </div>
                                </div></>)}
                            
                        </ListGroup.Item>       
                    ))}      
                </ListGroup>
            </ListGroup.Item>
         </ListGroup>

        <Modal show={showConfirm} onHide={cancelDelete} centered>
            <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
      </div>
  );}
  