import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Profile() {
    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            <Form.Control type="text" defaultValue="alice" className="mb-2" />
            <Form.Control type="password" defaultValue="123" className="mb-2" />
            <Form.Control type="text" defaultValue="Alice" className="mb-2" />
            <Form.Control type="text" defaultValue="Wonderland" className="mb-2" />
            <Form.Control type="date" defaultValue="2024-06-22" className="mb-2" />
            <Form.Control type="email" defaultValue="alice@wonderland.com" className="mb-2" />
            <Form.Control type="text" defaultValue="User" className="mb-2" />

            <Link to="/Kambaz/Account/Signin" id="wd-signout-btn" className="btn btn-danger w-100 mb-2 "> 
                Sign out
            </Link>
        </div>
    );
}