import { useQuery, useQueryClient, useMutation } from "react-query";
import { useState } from "react";

import { todoApi } from "../../utils/api";
import TodoItem from "./TodoItem";

export default function Todo() {
  const queryClient = useQueryClient();
  
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async () => {
    const auth = localStorage.getItem("token");
    const url = todoApi.concat("tasks");
    const data = {
      description: newTodo,
      completed: false,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const toggleCompletion = async (data) => {
    let obj = {
      description: data.description,
      completed: data.completed,
    };
    let todoId = data.id;
    const auth = localStorage.getItem("token");
    let url = todoApi.concat("tasks/");
    url = url.concat(todoId);
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify(obj),
    });
  };

  const toggleMutation = useMutation(toggleCompletion, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: () => {
      console.log("error");
    },
  });

  const getTodos = async () => {
    const url = todoApi.concat("tasks");
    const auth = localStorage.getItem("token");
    if (auth !== "") {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      return response.json();
    }
  };

  const { isLoading, error, data } = useQuery("todos", getTodos);

  const addMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
    onError: () => {
      console.log("error");
    },
    onMutate: () => {
    },
  });


  const addTodoHandler = (e) => {
    if (e.key === "Enter") {
      addMutation.mutate();
      setNewTodo("");
      e.preventDefault();
      e.target.blur();
    }
  };

  const toggleTodo = (data) => {
    toggleMutation.mutate(data);
  };

  if (error) return "error occurred: " + error.message;

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center">
        <h1 className="text-8xl text-red-400">todos</h1>
      </div>
      <div className=" flex justify-center">
        <input
          className="w-1/3 h-10 mt-5 rounded-xl pl-2 focus:outline-none"
          placeholder="Enter task.."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={addTodoHandler}
        />
      </div>
      <div className="flex justify-center">
        <div className="w-1/3 bg-white mt-1 rounded-xl">
          {isLoading === true ? (
            <div className="flex justify-center">Loading Todos.....</div>
          ) : data.length === 0 ? (
            <div className="flex justify-center">No todos Found!!</div>
          ) : (
            data.map((todo) => {
              return (
                <div key={todo._id}>
                  <TodoItem
                    id={todo._id}
                    name={todo.description}
                    isComplete={todo.completed}
                    onToggle={toggleTodo}
                  />
                  <hr />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
