import { Router } from 'express';
import { login } from './userController.js';
import { loginValidation } from './userValidators.js';

const userRoute = Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 */

userRoute.route('/').post([loginValidation],login);

export default userRoute;
