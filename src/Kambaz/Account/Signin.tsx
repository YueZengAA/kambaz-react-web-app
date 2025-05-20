import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <Form.Control id="wd-username" className="mb-2" placeholder="username"/>
      <Form.Control id="wd-password" className="mb-2" placeholder="password" type="password"/>
      
      <Link to="/Kambaz/Account/Profile" id="wd-signin-btn" className="btn btn-primary w-100 mb-2"> 
        Sign in
      </Link>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
    </div>
  );}