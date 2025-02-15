import { Request, Response } from 'express'
import UsersService from '../services/users-service'
import { User, UserResponse } from '../models/users'
import { comparePasswordAndHash, generateToken, hashPassword } from '../auth'

const usersService = new UsersService()

function isValidUserRequest(body: any): body is { email: string; password: string } {
  return body && typeof body.email === 'string' && typeof body.password === 'string'
}

export default class AuthController {
  static async register(req: Request, res: Response): Promise<any> {
    try {
      if (!isValidUserRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid request body' })
      }

      const { email, password } = req.body
      const hashed_password: string = await hashPassword(password)
      const user: UserResponse = await usersService.createUser(email, hashed_password)

      res.status(201).json(user)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  static async login(req: Request, res: Response): Promise<any> {
    try {
      if (!isValidUserRequest(req.body)) {
        return res.status(400).json({ error: 'Invalid request body' })
      }

      const { email, password } = req.body
      const user: User = await usersService.getUserByEmail(email)
      const isPasswordValid: boolean = await comparePasswordAndHash(password, user.hashed_password)
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' })
      }

      const token: string = generateToken(user)

      res.status(200).json({ token })
    } catch (err) {
      console.log(err)
      res.status(400).json({ error: err.message })
    }
  }
}
