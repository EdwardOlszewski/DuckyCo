import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderTotals,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateShipping,
} from '../controllers/orderController.js'

import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/shipping').put(protect, updateShipping)
router.route('/totals').post(protect, getOrderTotals)

export default router
