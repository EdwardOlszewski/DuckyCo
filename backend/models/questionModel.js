import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const QuestionSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name.'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your last name.'],
    },
    email: {
      type: String,
      required: true,
      required: [true, 'Please enter your email.'],
    },
    message: {
      type: String,
      required: [true, 'Please enter your message.'],
    },
    answered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Question = mongoose.model('Question', QuestionSchema)

export default Question
