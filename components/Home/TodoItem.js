import { useState, useCallback } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCircle, BsCheckCircle } from "react-icons/bs";

import { useUpdateTask, useDeleteTask } from "../../src/hooks/todoHooks";

const TodoItem = (props) => {
  const [edit, setEdit] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(props.name);

  const deleteMutation = useDeleteTask();
  const updateMutation = useUpdateTask();

  const updateTodoHandler = useCallback(
    (e) => {
      let obj = {
        description: updatedTodo,
        completed: props.isComplete,
        id: props.id,
      };
      if (e.key === "Enter") {
        updateMutation.mutate(obj);
        setEdit(false);
      }
    },
    [updatedTodo]
  );

  const toggleHandler = useCallback(() => {
    let data = {
      description: props.name,
      completed: props.isComplete ? false : true,
      id: props.id,
    };
    props.onToggle(data);
  }, [props]);

  return (
    <>
      <div className="flex flex-row ">
        <div className="h-10 flex justify-center w-10 items-center">
          {props.isComplete ? (
            <BsCheckCircle onClick={toggleHandler} />
          ) : (
            <BsCircle onClick={toggleHandler} />
          )}
        </div>
        <div
          className="w-5/6 flex text-l items-center"
          onDoubleClick={() => setEdit(true)}
        >
          {edit ? (
            <input
              className="w-5/6 h-10  focus:outline-none"
              placeholder={updatedTodo}
              value={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
              onKeyPress={updateTodoHandler}
              autoFocus
            />
          ) : (
            <div className={props.isComplete ? "line-through" : ""}>
              {props.name}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <AiOutlineDelete onClick={() => deleteMutation.mutate(props.id)} />
        </div>
      </div>
    </>
  );
};

export default TodoItem;
