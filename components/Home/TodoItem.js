import { useQueryClient, useMutation } from "react-query";
import { BsCircle, BsCheckCircle } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { useRef } from "react";

import { useState } from "react";

import { todoApi } from "../../utils/api";

export default function TodoItem(props) {
  const url = todoApi.concat("tasks/");

  const deleteTaskHandler = () => {
    deleteMutation.mutate();
  };

  const deleteTodo = async (data) => {
    const auth = localStorage.getItem("token");
    const newurl = url.concat(props.id);
    const response = await fetch(newurl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    return response.json();
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      console.log("DELETE SUCCESS\n");
      queryClient.invalidateQueries("todos");
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
      console.log("deleting todo");
    },
  });

  const toggleHandler = () => {
    let data = {
      description: props.name,
      completed: props.isComplete ? false : true,
      id: props.id,
    };
    props.onToggle(data);
  };

  const updateTodo = async (data) => {
    const auth = localStorage.getItem("token");
    let url = todoApi.concat("tasks/");
    url = url.concat(props.id);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(data),
    });
  };

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      console.log("update completion");
      queryClient.invalidateQueries("todos");
      setTimeout(() => setUpdating(false), 1000);
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
      setUpdating(true);
      console.log("Updating todo....");
    },
  });

  const [edit, setEdit] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(props.name);
  const [updating, setUpdating] = useState(false);

  const updateTodoHandler = (e) => {
    if (e.key !== "Enter") return;
    let obj = {
      description: updatedTodo,
      completed: props.isComplete,
    };
    updateMutation.mutate(obj);
    setEdit(false);
  };

  const ref = useRef(null);

  const editHandler = () => {
    setEdit(true);
    // ref.current.focus();
  };

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
          onDoubleClick={editHandler}
        >
          {edit ? (
            <input
              ref={ref}
              className="w-5/6 h-10  focus:outline-none"
              placeholder={updatedTodo}
              value={updatedTodo}
              onChange={(e) => setUpdatedTodo(e.target.value)}
              onKeyPress={updateTodoHandler}
              autoFocus
            />
          ) : updating ? (
            "updating..."
          ) : (
            <div className={props.isComplete ? "line-through" : ""}>
              {props.name}
            </div>
          )}
        </div>
        <div className="flex items-center">
          <AiOutlineDelete onClick={deleteTaskHandler} />
        </div>
      </div>
    </>
  );
}
