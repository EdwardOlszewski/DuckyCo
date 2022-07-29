import asyncHandler from 'express-async-handler'
import Question from '../models/questionModel.js'

// @desc    Register a new user
// @route   POST /api/question
// @access  Public
const createQuestion = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, message } = req.body

  const question = await Question.create({
    firstName,
    lastName,
    email,
    message,
  })

  if (question) {
    res.status(201).json({
      _id: question._id,
      firstName: question.firstName,
      lastName: question.lastName,
      email: question.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid question data')
  }
})

// @desc    Get all question
// @route   GET /api/question
// @access  Private/Admin
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
  res.json(questions)
})

// @desc    Get question by id
// @route   GET /api/question/:id
// @access  Private/Admin
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)

  if (question) {
    res.json(question)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

// @desc    Update question to answered
// @route   GET /api/question/:id/answered
// @access  Private/Admin
const updateQuestionToAnswered = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)

  if (question) {
    question.answered = true
    const updatedQuestion = await question.save()
    res.json(updatedQuestion)
  } else {
    res.status(404)
    throw new Error('Question not found')
  }
})

export {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestionToAnswered,
}
