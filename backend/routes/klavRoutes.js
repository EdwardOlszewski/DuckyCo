import express from 'express'

import { addToList } from '../services/Klavio.js'
const router = express.Router()

router.route('/list').post(addToList)

export default router
