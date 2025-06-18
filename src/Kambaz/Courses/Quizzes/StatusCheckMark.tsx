import { FaCheckCircle, FaCircle } from "react-icons/fa";

export default function StatusCheckmark({status} : {status: string}) {
    const isPublished = status === "PUBLISH";
    const checkColor = isPublished ? "#198754" : "#8FBC8F";

    return (
        <span className="me-1 position-relative">
        <FaCheckCircle style={{ color: checkColor, top: "2px" }} 
            className="me-1 position-absolute fs-5" />
        <FaCircle className="text-white me-1 fs-6" />
        </span>);}