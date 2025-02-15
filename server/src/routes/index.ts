import { Express } from 'express'
import todosRouter from './todos-route'
import authRouter from './auth-route'

export default (route: string, app: Express) => {
  app.use(route, todosRouter)
  app.use(route, authRouter)
}
