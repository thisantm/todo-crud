"use client"

import React from "react";
import { TodoResponse } from "@/models/todo";

interface TodoCardProps {
  todo: TodoResponse;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-blue-500";
      case "em progresso":
        return "bg-yellow-500";
      case "concluida":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <li className={`p-4 rounded ${getStatusColor(todo.status)}`}>
      <div className="flex flex-col gap-2">
        <h3 className="text-white text-center">{todo.title}</h3>
        <span className="text-white">Description: {todo.description}</span>
        <span className="text-white">Status: {todo.status}</span>
        <div className="flex gap-2">
          <button
            className="bg-white text-black py-1 px-2 rounded"
            onClick={() => onEdit(todo.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white py-1 px-2 rounded"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoCard;
