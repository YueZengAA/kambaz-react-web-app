import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    return (
      <ListGroup.Item>
        <div className="d-flex align-items-center">
                <FormControl value={todo.title}
                onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
                <Button onClick={() => dispatch(updateTodo(todo))}
                        variant="warning" className="ms-2" id="wd-update-todo-click"> Update </Button>
                <Button onClick={() => dispatch(addTodo(todo))}
                        variant="success" className="ms-2" id="wd-add-todo-click"> Add </Button>
        </div>
        
        
      </ListGroup.Item>
  );}
  