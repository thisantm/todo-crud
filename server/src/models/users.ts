export interface User {
  id: number
  email: string
  hashed_password: string
  created_at: Date
  updated_at: Date
}

export interface UserResponse {
  id: number
  email: string
  created_at: Date
  updated_at: Date
}
