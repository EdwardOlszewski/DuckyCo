import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// User Screens
import HomeScreen from './userScreens/HomeScreen'
import LoginScreen from './userScreens/LoginScreen'
import RegisterScreen from './userScreens/RegisterScreen'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/' element={<HomeScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
      </Routes>
    </Router>
  )
}

export default App
