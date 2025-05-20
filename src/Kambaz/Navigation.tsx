import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { ImLab } from "react-icons/im";

import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
    const location = useLocation();  
    const currentPath = location.pathname;

    const getClass = (path: string) =>
    currentPath === path
      ? "text-center border-0 bg-white text-danger"
      : "text-white bg-black text-center border-0";

    return(
        <ListGroup id="wd-kambaz-navigation" style={{ width: 100 }} 
        className="rounded-0 position-fixed
        bottom-0 top-0 d-none d-md-block bg-black z-2">
            <ListGroup.Item id="wd-neu-link" target="_blank" action
                href="https://www.northeastern.edu/"
                className="bg-black border-0 text-center">
                <img src="/images/NEU.png" width="70px" /></ListGroup.Item><br />
            <ListGroup.Item to="/Kambaz/Account" as={Link}
                className={getClass("/Kambaz/Account")}>
                <FaRegCircleUser className="fs-1 text text-white" /><br />
                Account </ListGroup.Item><br />
            <ListGroup.Item to="/Kambaz/Dashboard" as={Link}
                className={getClass("/Kambaz/Dashboard")}>
                <AiOutlineDashboard className="fs-1 text-danger" /><br />
                Dashboard </ListGroup.Item><br />
            <ListGroup.Item to="/Kambaz/Courses/1234/Home" as={Link}
                className={getClass("/Kambaz/Courses")}>
                <LiaBookSolid className="fs-1 text-danger" /><br />
                Courses </ListGroup.Item><br />
            {/* complete styling the rest of the links */}
            <ListGroup.Item to="/Kambaz/Calendar" as={Link}
                className={getClass("/Kambaz/Calendar")}>
                <IoCalendarOutline className="fs-1 text-danger" /><br />
                Calendar </ListGroup.Item><br />
            <ListGroup.Item to="/Kambaz/Inbox" as={Link}
                className={getClass("/Kambaz/Inbox")}>
                <HiOutlineInboxArrowDown className="fs-1 text-danger" /><br />
                Inbox </ListGroup.Item><br />
            <ListGroup.Item to="/Labs" as={Link}
                className={getClass("/Labs")}>
                <ImLab className="fs-1 text-danger" /><br />
                Labs </ListGroup.Item><br />
        </ListGroup>
    );
}