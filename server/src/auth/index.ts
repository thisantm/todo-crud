import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import { User } from '../models/users'
import dotenv from 'dotenv'
import { InvalidAuthorizationHeaderError, InvalidTokenError } from './errors'

dotenv.config()

const timeToExpireJwt = '1h'
const secret = process.env.JWT_SECRET as string
if (!secret) {
  throw new Error('JWT_SECRET is not defined')
}

async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

async function comparePasswordAndHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

function generateToken(user: User): string {
  const payload = {
    issuer: 'todo-crud',
    user_id: user.id,
  }
  return jsonwebtoken.sign(payload, secret, { algorithm: 'HS256', expiresIn: timeToExpireJwt })
}

function verifyToken(authHeader: string): number {
  const token = getBearerToken(authHeader)
  const decodedjwt = jsonwebtoken.verify(token, secret, { algorithms: ['HS256'] })
  if (typeof decodedjwt === 'string') {
    throw new InvalidTokenError('Invalid token')
  }

  return decodedjwt.user_id
}

function getBearerToken(authorization: string): string {
  const parts = authorization.split(' ')
  if (parts.length !== 2) {
    throw new InvalidAuthorizationHeaderError('Invalid Authorization header')
  }
  if (parts[0] !== 'Bearer') {
    throw new InvalidAuthorizationHeaderError('Invalid Authorization header')
  }
  return parts[1]
}

export { hashPassword, comparePasswordAndHash, generateToken, verifyToken }
