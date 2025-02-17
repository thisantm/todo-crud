"use client"

import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "@/utils/todo-api";
import { TodoResponse } from "@/models/todo";
import TodoCard from "./TodoCard";
import TodoDialog from "./TodoDialog";

export default function Todos() {
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogInitialValues, setDialogInitialValues] = useState<Partial<TodoResponse>>({});

  const getTodos = async () => {
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const handleEdit = (todo: TodoResponse) => {
    setDialogInitialValues(todo);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      getTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleCreate = () => {
    setDialogInitialValues({ title: "", description: "", status: "pendente" });
    setIsDialogOpen(true);
  };

  const handleDialogClose = (success: boolean) => {
    setIsDialogOpen(false);
    if (success) {
      getTodos();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl">To-do List</h1>
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={() => handleEdit(todo)}
              onDelete={handleDelete}
            />
          ))}
        </ul>
        <button
          className="bg-white text-black py-2 px-4 rounded mt-4"
          onClick={handleCreate}
        >
          Create Todo
        </button>
        {isDialogOpen && (
          <TodoDialog initialValues={dialogInitialValues} onClose={handleDialogClose} />
        )}
      </div>
    </div>
  );
}
