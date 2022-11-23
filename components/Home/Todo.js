import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import TodoItem from "./TodoItem";
import {
  useToggleTask,
  useAddTask,
  useGetTasks,
} from "../../src/hooks/todoHooks";
import { clearCookie } from "../../src/utils/tokenhelpers";

const Todo = () => {
  const router = useRouter();
  const [newTodo, setNewTodo] = useState("");

  const { isLoading: loadingTasks, data: tasks } = useGetTasks();
  const toggleMutation = useToggleTask();
  const addMutation = useAddTask();

  const addTodoHandler = useCallback(
    (e) => {
      if (e.key === "Enter") {
        let data = {
          description: newTodo,
          completed: false,
        };
        addMutation.mutate(data);
        setNewTodo("");
        e.preventDefault();
        e.target.blur();
      }
    },
    [newTodo]
  );

  const logoutHandler = () => {
    clearCookie();
    router.push("/");
  };

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
      <div className="flex items-center flex-col">
        <div className="w-1/3  mt-1 rounded-xl">
          {loadingTasks === true ? (
            <div className="flex justify-center">Loading Todos.....</div>
          ) : tasks.length === 0 ? (
            <div className="flex justify-center">No todos Found!!</div>
          ) : (
            tasks.map((todo) => {
              return (
                <div key={todo._id} className="bg-white">
                  <TodoItem
                    id={todo._id}
                    name={todo.description}
                    isComplete={todo.completed}
                    onToggle={(data) => toggleMutation.mutate(data)}
                  />
                  <hr />
                </div>
              );
            })
          )}
        </div>
        <div>
          <button
            className="w-40 rounded-xl h-8 mt-5 bg-blue-500 text-white"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
