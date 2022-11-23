import { useMutation, useQuery, useQueryClient } from "react-query";

import requestMethod from "../services/requestMethods";
import methods from "../utils/constants";

const addTodo = async (data) => {
  return requestMethod("tasks", methods.POST, data);
};

const toggleCompletion = async (data) => {
  let obj = {
    description: data.description,
    completed: data.completed,
  };
  let url = "tasks/";
  url = url.concat(data.id);
  return requestMethod(url, methods.PATCH, obj);
};

const getTodos = async () => {
  return requestMethod("tasks", methods.GET, {});
};

const deleteTodo = async (id) => {
  let url = "tasks/".concat(id);
  return requestMethod(url, methods.DELETE, {});
};

const updateTodo = async (data) => {
  let url = "tasks/".concat(data.id);
  let obj = {
    description: data.description,
    completed: data.completed,
  };
  return requestMethod(url, methods.PATCH, obj);
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useToggleTask = () => {
  const queryClient = useQueryClient();
  return useMutation(toggleCompletion, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
};

export const useGetTasks = () => {
  const { data, isLoading } = useQuery("todos", getTodos);
  return { data, isLoading };
};
