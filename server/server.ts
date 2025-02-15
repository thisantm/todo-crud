import express, { Express } from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import router from './src/routes'
import routes from './src/routes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo CRUD API',
      version: '1.0.0',
      description: 'API documentation for the Todo CRUD application',
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/routes/*.ts'], // Adjust the path to your route files
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
routes('/api', app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`)
})
