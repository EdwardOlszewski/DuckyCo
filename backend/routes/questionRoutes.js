import express from 'express'
const router = express.Router()
import {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestionToAnswered,
} from '../controllers/questionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(createQuestion).get(protect, admin, getQuestions)
router.route('/:id').get(protect, admin, getQuestionById)
router.route('/:id/answered').put(protect, admin, updateQuestionToAnswered)

export default router
