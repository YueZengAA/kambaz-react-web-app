import CourseNavigation from "./Navigation";
import { Route, Routes, useParams, useLocation } from "react-router-dom";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useSelector } from "react-redux";
import type { RootState } from "../store";


export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const courses = useSelector((state: RootState) => state.courseReducer.courses);
    const course = courses.find((course) => course._id === cid);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2><hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                <Routes>
                    <Route path="Home" element={<Home/>} />
                    <Route path="Modules" element={<Modules/>} />
                    <Route path="Assignments" element={<Assignments/>} />
                    <Route path="Assignments/:aid" element={<AssignmentEditor/>} />
                    <Route path="People" element={<PeopleTable />} />
                </Routes>
                </div>
            </div>
        </div>
    )
}