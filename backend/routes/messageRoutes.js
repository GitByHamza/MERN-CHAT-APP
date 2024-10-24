import express from 'express'
import { sendMessage , getMessages } from '../controllers/message.controller.js'
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router()

router.post("/send/:id",protectRoute,sendMessage)//Check if user in signed in or not
router.get("/:id",protectRoute,getMessages)//Check if user in signed in or not

export default router