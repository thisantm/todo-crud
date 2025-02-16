import { useEffect, useState } from "react";
import { fetchTodos } from "@/utils/todo-api";
import { TodoResponse } from "@/models/todo";

export default function Todos() {
  const [todos, setTodos] = useState<TodoResponse[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    getTodos();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-black text-2xl">To-do List</h1>
      <ul className="list-disc">
        {todos.map((todo) => (
          <li key={todo.id} className="text-black">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
