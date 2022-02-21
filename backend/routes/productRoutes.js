import express from 'express'
const router = express.Router()
import {
  createProduct,
  getProductById,
  updateProduct,
  getProducts,
  deleteProduct,
  getMostRecentProducts,
  getSpecialProducts,
  createProductReview,
  deleteProductReview,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id/reviews')
  .post(protect, createProductReview)
  .delete(protect, admin, deleteProductReview)
router.route('/mostrecent').get(getMostRecentProducts)
router.route('/special').get(getSpecialProducts)

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

export default router
