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
// User Cart Screen
import CartScreen from './userScreens/CartScreen'

// Admin Screens
import ProductListScreen from './adminScreens/ProductListScreen'
// Admin Product Screens
import ProductEditScreen from './adminScreens/ProductEditScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />

        {/* User routes */}
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />

        {/* User product routes*/}
        <Route path='/apparel' element={<ApparelScreen />} />
        <Route path='/product/:id' element={<ProductScreen />} />

        {/* Admin Routes */}
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        <Route
          path='/admin/productlist/:pageNumber'
          element={<ProductListScreen />}
        />
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />

        {/* Cart Routes */}
        <Route path='/cart' element={<CartScreen />} />

        {/* Order Routes */}
      </Routes>
    </Router>
  )
}

export default App
