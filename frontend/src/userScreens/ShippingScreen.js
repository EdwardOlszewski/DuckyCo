// React/Redux
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Components
import {
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import CheckoutSteps from '../components/CheckoutSteps'
import StyledInput from '../components/StyledInput'
// Icons
import useStyles from '../styles/MainStyleSheet'
// Actions
import { saveShippingAddress } from '../actions/cartActions'
import { createOrder, getTotals } from '../actions/orderActions'

const ShippingScreen = () => {
  // ----- init variables ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ----- get data from redux state ----- //
  const cart = useSelector((state) => state.cart)
  const { shippingAddress, cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderTotals = useSelector((state) => state.orderTotals)
  const { totals } = orderTotals

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate

  // ----- declare state variables ----- //
  const [firstName, setFirstName] = useState(userInfo.firstName)
  const [lastName, setLastName] = useState(userInfo.lastName)
  const [street, setStreet] = useState(shippingAddress.street)
  const [city, setCity] = useState(shippingAddress.city)
  const [state, setState] = useState(shippingAddress.state)
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
  const [billingFirstName, setBillingFirstName] = useState('')
  const [billingLastName, setBillingLastName] = useState('')
  const [billingStreet, setBillingStreet] = useState('')
  const [billingCity, setBillingCity] = useState('')
  const [billingState, setBillingState] = useState('')
  const [billingZipCode, setBillingZipCode] = useState('')
  const [billingInfo, setBillingInfo] = useState(false)

  // ----- function saves shipping info and creates order ----- //
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        street,
        city,
        state,
        zipCode,
      })
    )

    dispatch(
      createOrder({
        user: {
          _id: userInfo._id,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        },
        orderItems: cart.cartItems,
        shippingAddress: {
          firstName,
          lastName,
          street,
          city,
          state,
          zipCode,
        },
        paymentMethod: 'card',
        totalItems: Number(totals.totalItems),
        itemsPrice: Number(totals.subTotal),
        shippingPrice: Number(totals.shippingPrice),
        taxPrice: Number(totals.tax),
        totalPrice: Number(totals.totalPrice),
        subTotal: Number(totals.subTotal),
        billingDetails: {
          name: billingFirstName + ' ' + billingLastName,
          email: userInfo.email,
          address: {
            city: billingCity,
            line1: billingStreet,
            state: billingState,
            postal_code: billingZipCode,
          },
        },
      })
    )
  }

  // ----- use effect hook ----- //
  useEffect(() => {
    if (!totals) {
      dispatch(getTotals({ cartItems }))
    }
    if (success) {
      navigate(`/payment/${order._id}`, { replace: true })
    }
    if (billingInfo) {
      setBillingFirstName(firstName)
      setBillingLastName(lastName)
      setBillingStreet(street)
      setBillingCity(city)
      setBillingState(state)
      setBillingZipCode(zipCode)
    }
  }, [
    dispatch,
    navigate,

    totals,
    success,
    billingInfo,
    firstName,
    lastName,
    street,
    city,
    state,
    zipCode,
    cartItems,
  ])

  return (
    <PageWrapper title='Login'>
      <CheckoutSteps activeStep={1} />

      <Typography className={classes.formTitle} variant='h3'>
        Shipping
      </Typography>

      <Grid container className={classes.formCont} spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledInput
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledInput
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledInput
            label='City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledInput
            label='Address'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledInput
            label='State'
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledInput
            label='Zip Code'
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name='checked'
                color='primary'
                checked={Boolean(billingInfo)}
                onChange={(e) => setBillingInfo(e.target.checked)}
              />
            }
            label='Billing address is the same as shipping'
          />
        </Grid>
        {billingInfo && (
          <Grid item xs={12}>
            <Button className={classes.Btn} onClick={submitHandler}>
              Continue
            </Button>
          </Grid>
        )}
      </Grid>

      {/* -------------------- Billing --------------------*/}

      {!billingInfo && (
        <>
          <Typography variant='h3' className={classes.formTitle}>
            Billing
          </Typography>

          <Grid container className={classes.formCont} spacing={3}>
            <Grid item xs={12} md={6}>
              <StyledInput
                label='First Name'
                value={billingFirstName}
                onChange={(e) => setBillingFirstName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledInput
                label='Last Name'
                value={billingLastName}
                onChange={(e) => setBillingLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledInput
                label='City'
                value={billingCity}
                onChange={(e) => setBillingCity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledInput
                label='Street'
                value={billingStreet}
                onChange={(e) => setBillingStreet(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledInput
                label='State'
                value={billingState}
                onChange={(e) => setBillingState(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledInput
                label='Zip Code'
                value={billingZipCode}
                onChange={(e) => setBillingZipCode(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button className={classes.Btn} onClick={submitHandler}>
                Continue
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </PageWrapper>
  )
}

export default ShippingScreen
