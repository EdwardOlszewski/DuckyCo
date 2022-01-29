// React/Redux
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Components
import {
  Container,
  FormControl,
  Button,
  TextField,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import CheckoutSteps from '../components/CheckoutSteps'
import PaymentForm from '../components/PaymentForm'

// Icons
import useStyles from '../styles/MainStyleSheet'

// Actions
import { saveShippingAddress } from '../actions/cartActions'

const StyledTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      background: '#f7f7f9',

      fontSize: '1rem',
      '& fieldset': {
        borderRadius: 0,
        borderColor: '#f7f7f9',
      },
      '&:hover fieldset': {
        borderColor: '#ececec',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ececec',
      },
    },
  },
})(TextField)

const stripePromise = loadStripe(
  'pk_test_51KN8YZGmnGBraIyuUWpw2JQzLc7n2HwaU05uhuvdfCERUnfaTzrqPXMUR7U9IwryMYOX9EjVB0IQz38CQAP1WrlT00mwO6ZH9H'
)

const PaymentScreen = () => {
  // Mui Style Sheet
  const classes = useStyles()
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()
  // Init navigate for redirect
  const navigate = useNavigate()

  // Go to the cart in the state and select the cartItems
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  // Go to userLogin in state and pull out userInfo
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Declare new state variables using useState hook
  const [firstName, setFirstName] = useState(userInfo.firstName)
  const [lastName, setLastName] = useState(userInfo.lastName)
  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [state, setState] = useState(shippingAddress.state)
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode)

  // Billing Details for Stripe
  const billingDetails = {
    name: firstName + ' ' + lastName,
    email: userInfo.email,
    address: {
      city: city,
      line1: address,
      state: state,
      postal_code: zipCode,
    },
  }

  // Function called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
      })
    )
    navigate('/placeorder', { replace: true })
  }

  // useEffect hook called after render
  useEffect(() => {}, [])

  return (
    <PageWrapper title='Login'>
      <Container>
        <CheckoutSteps activeStep={2} />

        <Typography
          variant='h4'
          style={{ textAlign: 'center', marginTop: '1rem' }}
        >
          Payment
        </Typography>

        <Grid container className={classes.formCont} spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='First Name'
                type='string'
                variant='outlined'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='Last Name'
                type='string'
                variant='outlined'
                value={lastName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='City'
                type='string'
                variant='outlined'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='Street'
                type='string'
                variant='outlined'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='State'
                type='string'
                variant='outlined'
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='Zip Code'
                type='string'
                variant='outlined'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <Elements stripe={stripePromise}>
              <PaymentForm billingDetails={billingDetails} />
            </Elements>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

export default PaymentScreen

/*

 <Grid item xs={12}>
            <Button className={classes.Btn} onClick={submitHandler}>
              Continue
            </Button>
          </Grid>

*/
