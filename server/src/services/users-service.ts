import db from '../models'
import { User, UserResponse } from '../models/users'

export default class UsersService {
  async createUser(email: string, hashed_password: string): Promise<UserResponse> {
    const now = new Date(new Date().toUTCString())
    const user = await db.one(
      'INSERT INTO users (email, hashed_password, created_at, updated_at) VALUES (${email}, ${hashed_password}, ${created_at}, ${updated_at}) RETURNING id, email, created_at, updated_at',
      { email, hashed_password, created_at: now, updated_at: now },
    )
    return this.mapToUserResponse(user)
  }

  async getUserByEmail(email: string): Promise<User> {
    return db.one('SELECT * FROM users WHERE email = ${email}', { email })
  }

  private mapToUserResponse(user: any): UserResponse {
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }
  }
}
