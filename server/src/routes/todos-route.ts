import { Router } from 'express'
import TodosController from '../controller/todos-controller'

const baseRoute = '/todos'
const router: Router = Router()

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Retrieve a list of todos
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of todos
 */
router.get(baseRoute, TodosController.getTodos)

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - status
 *     responses:
 *       201:
 *         description: The created todo
 */
router.post(baseRoute, TodosController.createTodo)

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update an existing todo
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *             required:
 *               - title
 *               - description
 *               - status
 *     responses:
 *       200:
 *         description: The updated todo
 */
router.put(`${baseRoute}/:id`, TodosController.updateTodo)

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The deleted todo
 */
router.delete(`${baseRoute}/:id`, TodosController.deleteTodo)

export default router
