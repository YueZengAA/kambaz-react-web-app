import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <Form.Control id="wd-username" className="mb-2" placeholder="username"/>
      <Form.Control id="wd-password" className="mb-2" placeholder="password" type="password"/>
      
      <Link to="/Kambaz/Account/Profile" id="wd-signin-btn" className="btn btn-primary w-100 mb-2"> 
        Sign up
      </Link>
      <Link  to="/Kambaz/Account/Signin" >Sign in</Link>
    </div>
);}
