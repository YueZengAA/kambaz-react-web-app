import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

export default function ArrayStateVariable() {
 const [array, setArray] = useState([1, 2, 3, 4, 5]);
 const addElement = () => {
   setArray([...array, Math.floor(Math.random() * 100)]);
 };
 const deleteElement = (index: number) => {
   setArray(array.filter((item, i) => {
       return i !== index;
   }));
 };
 return (
  <div id="wd-array-state-variables">
   <h2>Array State Variable</h2>
   <Button onClick={addElement} variant="success" className="mb-2">Add Element</Button>
   <ListGroup>
        {array.map((item, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center"> {item}
            <Button onClick={() => deleteElement(index)} variant="danger">
            Delete</Button>
            </ListGroup.Item>))}
   </ListGroup>
   <ul>
    
   </ul><hr/></div>);}

