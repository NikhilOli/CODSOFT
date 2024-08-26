import { Router } from 'express'
import { addMessage, getMessages } from '../controllers/message.controller.js';

const messageRoutes = Router()

messageRoutes.post("/", addMessage)
messageRoutes.get("/:chatId", getMessages)


export default messageRoutes;