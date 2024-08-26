import express from 'express';
import { getAllUsers, getProfile, getUserChats, getUserData, updateProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const userRoutes = express.Router();


userRoutes.get('/profile/:userId', getUserData);

userRoutes.use(authenticateToken);
userRoutes.get('/', getAllUsers)
userRoutes.get('/myChats', getUserChats)
userRoutes.get('/profile', getProfile);
userRoutes.put('/profile', updateProfile);

export default userRoutes;