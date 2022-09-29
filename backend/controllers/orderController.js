import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

dotenv.config()

// @desc    Get Order Totals
// @route   GET /api/orders/totals
// @access  Private
const getOrderTotals = asyncHandler(async (req, res) => {
  const products = req.body.cartItems

  let totalPrice = 0
  let subTotal = 0
  let shippingPrice = 0
  let taxPrice = 0
  let totalItems = 0

  if (products) {
    for (let i = 0; i <= products.length; i++) {
      if (products[i]) {
        const foundProduct = await Product.findById(products[i].product)
        subTotal += foundProduct.price * products[i].qty
        totalItems += products[i].qty
      }
    }

    totalPrice = subTotal + taxPrice

    if (totalPrice < 50) {
      shippingPrice = 6
      totalPrice += shippingPrice
    }
  }

  res.status(201).json({
    totalItems: totalItems,
    subTotal: subTotal.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    tax: taxPrice.toFixed(2),
  })
})

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    promoCode,
    totalItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    subTotal,
    billingDetails,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      promoCode,
      totalItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      subTotal,
      billingDetails,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  //const orders = await Order.find({ user: { _id: String(req.user._id) } })
  const orders = await Order.find({ 'user._id': req.user.id })

  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc    Update order shipping cost
// @route   PUT /api/:id/shipping
// @access  Private
const updateShipping = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const { promoCode } = req.body

  if (order) {
    if (
      process.env.PROMO_CODE == promoCode ||
      process.env.PROMO_CODE3 == promoCode ||
      process.env.PROMO_CODE4 == promoCode
    ) {
      order.promoCode = promoCode
      order.subTotal = order.subTotal * 0.85
      order.subTotal = order.subTotal.toFixed(2)

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else if (process.env.PROMO_CODE2 == promoCode) {
      order.promoCode = promoCode
      order.subTotal = order.subTotal * 0.9
      order.totalPrice = order.subTotal + order.shippingPrice

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else if (process.env.PROMO_CODE5 == promoCode) {
      order.promoCode = promoCode
      order.subTotal = order.subTotal * 0.8
      order.subTotal = order.subTotal.toFixed(2)

      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Promo Code ' + promoCode + ' Not Found')
    }
  } else {
    res.status(404)
    throw new Error('Order billing info not updated')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getOrderTotals,
  updateShipping,
}
