"use client"

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TodoResponse } from "@/models/todo";
import { createTodo, updateTodo } from "@/utils/todo-api";

interface TodoDialogProps {
  initialValues: Partial<TodoResponse>;
  onClose: (success: boolean) => void;
}

const TodoDialog: React.FC<TodoDialogProps> = ({ initialValues, onClose }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    status: Yup.string().oneOf(["pendente", "em progresso", "concluida"]).required("Status is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (initialValues.id) {
        await updateTodo(initialValues.id, values as TodoResponse);
      } else {
        await createTodo(values as TodoResponse);
      }
      onClose(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      onClose(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded">
        <h2 className="text-2xl mb-4 text-black">{initialValues.id ? "Edit Todo" : "Create Todo"}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label htmlFor="title" className="text-black">Title</label>
                <Field name="title" type="text" className="border p-2 rounded w-full text-black" />
                <ErrorMessage name="title" component="div" className="text-red-500" />
              </div>
              <div>
                <label htmlFor="description" className="text-black">Description</label>
                <Field name="description" type="text" className="border p-2 rounded w-full text-black" />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>
              <div>
                <label htmlFor="status" className="text-black">Status</label>
                <Field as="select" name="status" className="border p-2 rounded w-full text-black">
                  <option value="pendente">Pendente</option>
                  <option value="em progresso">Em Progresso</option>
                  <option value="concluida">Concluida</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500" />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : initialValues.id ? "Update" : "Create"}
                </button>
                <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded" onClick={() => onClose(false)} disabled={isSubmitting}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TodoDialog;
