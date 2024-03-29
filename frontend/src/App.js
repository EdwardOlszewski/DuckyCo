import React from 'react'
import ReactGA from 'react-ga'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { useLayoutEffect } from 'react'
// User Screens
import HomeScreen from './userScreens/HomeScreen'
import LoginScreen from './userScreens/LoginScreen'
import RegisterScreen from './userScreens/RegisterScreen'
import ProfileScreen from './userScreens/ProfileScreen'
import AboutScreen from './userScreens/AboutScreen'
import ContactScreen from './userScreens/ContactScreen'

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
// Admin User Screen
import UserListScreen from './adminScreens/UserListScreen'
// Admin Question Screen
import QuestionListScreen from './adminScreens/QuestionListScreen'
import QuestionScreen from './adminScreens/QuestionScreen'

//Privacy
import PrivacyStatement from './privacyScreens/PrivacyStatement'
import TermsAndConditions from './privacyScreens/TermsAndConditions'

const Wrapper = ({ children }) => {
  const location = useLocation()
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])
  return children
}

const App = () => {
  ReactGA.initialize('UA-223751483-1', {
    titleCase: false,
  })

  ReactGA.pageview(window.location.pathname + window.location.search)

  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path='/gear' element={<ApparelScreen />} />
          <Route path='/' element={<HomeScreen />} />

          {/* User routes */}
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/about' element={<AboutScreen />} />
          <Route path='/contact' element={<ContactScreen />} />

          {/* User product routes*/}

          <Route path='/product/:id' element={<ProductScreen />} />

          {/* Admin Routes */}
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route
            path='/admin/productlist/:pageNumber'
            element={<ProductListScreen />}
          />
          <Route
            path='/admin/productlist/search/:keyword'
            element={<ProductListScreen />}
          />
          <Route
            path='/admin/product/:id/edit'
            element={<ProductEditScreen />}
          />
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/questionlist' element={<QuestionListScreen />} />
          <Route path='/admin/question/:id' element={<QuestionScreen />} />
          {/* Cart Routes */}
          <Route path='/cart' element={<CartScreen />} />

          {/* Order Routes */}
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment/:id' element={<PaymentScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />

          {/* Privacy */}
          <Route path='/privacystatement' element={<PrivacyStatement />} />
          <Route path='/termsandconditions' element={<TermsAndConditions />} />
        </Routes>
      </Wrapper>
    </Router>
  )
}

export default App
