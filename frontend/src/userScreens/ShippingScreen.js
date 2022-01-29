// React/Redux
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
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import CheckoutSteps from '../components/CheckoutSteps'

// Icons
import useStyles from '../styles/MainStyleSheet'

// Actions
import { saveShippingAddress } from '../actions/cartActions'

export default function ShippingScreen() {
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
        <CheckoutSteps activeStep={0} />

        <Typography
          variant='h4'
          style={{ textAlign: 'center', marginTop: '1rem' }}
        >
          Shipping
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
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.form}>
              <TextField
                id='outlined-basic'
                label='Address'
                type='string'
                variant='outlined'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
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

          <Grid item xs={6}>
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

          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <Button className={classes.Btn} onClick={submitHandler}>
              Continue
            </Button>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  )
}
