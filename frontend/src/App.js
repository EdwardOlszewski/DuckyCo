import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// User Screens
import HomeScreen from './userScreens/HomeScreen'
import LoginScreen from './userScreens/LoginScreen'
import RegisterScreen from './userScreens/RegisterScreen'
import ProfileScreen from './userScreens/ProfileScreen'
// User Poduct Screens
import ApparelScreen from './userScreens/ApparelScreen'
import ProductScreen from './userScreens/ProductScreen'
// User Cart Screens
import CartScreen from './userScreens/CartScreen'
// User Order Screens
import ShippingScreen from './userScreens/ShippingScreen'
import PaymentScreen from './userScreens/PaymentScreen'
import OrderScreen from './userScreens/OrderScreen'

// Admin Screens
import ProductListScreen from './adminScreens/ProductListScreen'
// Admin Product Screens
import ProductEditScreen from './adminScreens/ProductEditScreen'
// Admin Order Screens
import OrderListScreen from './adminScreens/OrderListScreen'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ApparelScreen />} />
        <Route path='/home' element={<HomeScreen />} />

        {/* User routes */}
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />

        {/* User product routes*/}

        <Route path='/product/:id' element={<ProductScreen />} />

        {/* Admin Routes */}
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route path='/admin/orderlist' element={<OrderListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />

        {/* Cart Routes */}
        <Route path='/cart' element={<CartScreen />} />

        {/* Order Routes */}
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment/:id' element={<PaymentScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
      </Routes>
    </Router>
  )
}
