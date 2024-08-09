import express from 'express';
import { getAllUsers, getProfile, updateProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const userRoutes = express.Router();


userRoutes.use(authenticateToken);
userRoutes.get('/', getAllUsers)
userRoutes.get('/profile', getProfile);
userRoutes.put('/profile', updateProfile);

export default userRoutes;