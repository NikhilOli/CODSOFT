import { Router } from 'express'
import { createChat, findChat, userChats } from '../controllers/chat.controller.js'

const chatRoutes = Router()

chatRoutes.post("/", createChat)
chatRoutes.get("/:userId", userChats)
chatRoutes.get("/find/:firstId/:secondId", findChat)


export default chatRoutes;