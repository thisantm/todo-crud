import { Request, Response } from 'express'
import TodosService from '../services/todos-service'
import { TodoRequest, TodoResponse } from '../models/todos'
import { verifyToken } from '../auth'
import { InvalidAuthorizationHeaderError, InvalidTokenError } from '../auth/errors'

const todoService = new TodosService()

function isValidTodoRequest(body: any): body is TodoRequest {
  const validStatuses = ['pendente', 'em progresso', 'concluida']
  return (
    body &&
    typeof body.title === 'string' &&
    typeof body.description === 'string' &&
    typeof body.status === 'string' &&
    validStatuses.includes(body.status)
  )
}

export default class TodosController {
  static async createTodo(req: Request, res: Response): Promise<any> {
    try {
      if (!isValidTodoRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid request body' })
      }

      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).send()
      }

      const userId: number = verifyToken(authHeader)
      const todoRequest: TodoRequest = req.body
      const todo: TodoResponse = await todoService.createTodo(todoRequest, userId)

      res.status(201).json(todo)
    } catch (err) {
      if (err instanceof InvalidAuthorizationHeaderError || err instanceof InvalidTokenError) {
        console.log(err)
        return res.status(401).send()
      }
      console.log(err)
      res.status(400).json({ error: err.message })
    }
  }

  static async getTodos(req: Request, res: Response): Promise<any> {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).send()
      }

      const userId: number = verifyToken(authHeader)
      const todos: TodoResponse[] = await todoService.getTodos(userId)

      res.status(200).json(todos)
    } catch (err) {
      if (err instanceof InvalidAuthorizationHeaderError || err instanceof InvalidTokenError) {
        console.log(err)
        return res.status(401).send()
      }
      console.log(err)
      res.status(500).json({ error: err.message })
    }
  }

  static async updateTodo(req: Request, res: Response): Promise<any> {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).send()
      }

      const userId: number = verifyToken(authHeader)

      if (!isValidTodoRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid request body' })
      }

      const todoRequest: TodoRequest = req.body
      const id: number = parseInt(req.params.id, 10)
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' })
      }
      const todo: TodoResponse = await todoService.updateTodo(id, userId, todoRequest)

      res.status(200).json(todo)
    } catch (err) {
      if (err instanceof InvalidAuthorizationHeaderError || err instanceof InvalidTokenError) {
        console.log(err)
        return res.status(401).send()
      }
      res.status(500).json({ error: err.message })
    }
  }

  static async deleteTodo(req: Request, res: Response): Promise<any> {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        return res.status(401).send()
      }

      const userId: number = verifyToken(authHeader)
      const id: number = parseInt(req.params.id, 10)
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' })
      }
      await todoService.deleteTodo(id, userId)
      res.status(204).send()
    } catch (err) {
      if (err instanceof InvalidAuthorizationHeaderError || err instanceof InvalidTokenError) {
        console.log(err)
        return res.status(401).send()
      }
      res.status(500).json({ error: err.message })
    }
  }
}
