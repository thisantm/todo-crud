import db from '../models'
import { Todo, TodoRequest, TodoResponse } from '../models/todos'

export default class TodosService {
  async createTodo(todoRequest: TodoRequest, user_id: number): Promise<TodoResponse> {
    const now = new Date(new Date().toUTCString())
    const todo = await db.one(
      'INSERT INTO todos (title, status, description, created_at, updated_at, user_id) VALUES (${title}, ${status}, ${description}, ${created_at}, ${updated_at}, ${user_id}) RETURNING *',
      { ...todoRequest, created_at: now, updated_at: now, user_id },
    )
    return this.mapToTodoResponse(todo)
  }

  async getTodos(user_id: number): Promise<TodoResponse[]> {
    const todos = await db.any('SELECT * FROM todos where user_id = ${user_id}', { user_id })
    return todos.map(this.mapToTodoResponse)
  }

  async updateTodo(id: number, user_id: number, todoRequest: TodoRequest): Promise<TodoResponse> {
    const now = new Date(new Date().toUTCString())
    const todo = await db.one(
      'UPDATE todos SET title = ${title}, status = ${status}, description = ${description}, updated_at = ${updated_at} WHERE id = ${id} AND user_id = ${user_id} RETURNING *',
      {
        id,
        ...todoRequest,
        updated_at: now,
        user_id,
      },
    )
    return this.mapToTodoResponse(todo)
  }

  async deleteTodo(id: number, user_id: number): Promise<TodoResponse> {
    const todo = await db.one('DELETE FROM todos WHERE id = ${id} AND user_id = ${user_id} RETURNING *', {
      id,
      user_id,
    })
    return this.mapToTodoResponse(todo)
  }

  private mapToTodoResponse(todo: Todo): TodoResponse {
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      created_at: todo.created_at,
      updated_at: todo.updated_at,
    }
  }
}
