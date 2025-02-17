import { TodoRequest } from "@/models/todo";

const apiUrl = process.env.NEXT_PUBLIC_TODO_API;
if (!apiUrl) {
  throw new Error("Missing env var NEXT_PUBLIC_TODO_API");
}

const todoUrl = apiUrl + "/todos";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const fetchTodos = async () => {
  const token = getAuthToken();
  const response = await fetch(todoUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const createTodo = async (todoRequest: TodoRequest) => {
  const token = getAuthToken();
  const response = await fetch(todoUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todoRequest),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

export const updateTodo = async (id: number, todoRequest: TodoRequest) => {
  const token = getAuthToken();
  const response = await fetch(`${todoUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todoRequest),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const token = getAuthToken();
  const response = await fetch(`${todoUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
};
