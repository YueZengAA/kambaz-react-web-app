import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const active = (path: string) => (pathname.includes(path) ? "active" : "text-danger");
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <ListGroup id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
          <ListGroup.Item key={link} as={Link} to={`/Kambaz/Account/${link}`} 
            className={`list-group-item border border-0 ${active(link)}`}>
              {link}
          </ListGroup.Item>
      ))}

      {currentUser && currentUser.role === "ADMIN" && (
       <ListGroup.Item as={Link} to={`/Kambaz/Account/Users`} 
        className={`list-group-item border border-0 ${active("Users")}`}> 
        Users 
        </ListGroup.Item> )}
    </ListGroup>
    
);}
