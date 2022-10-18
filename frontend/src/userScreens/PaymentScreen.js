// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// Stripe
import { Elements } from '@stripe/react-stripe-js'
// Components
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import CheckoutSteps from '../components/CheckoutSteps'
import PaymentForm from '../components/PaymentForm'
import Loader from '../components/Loader'
import StyledInput from '../components/StyledInput'
import Message from '../components/Message'
// Types
import {
  ORDER_CREATE_RESET,
  ORDER_CHARGE_RESET,
  ORDER_PAY_RESET,
  ORDER_TOTALS_RESET,
} from '../types/orderTypes'
import { stripePromise } from '../types/paymentTypes'
// Actions
import { getOrderDetails, updateShipping } from '../actions/orderActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '4rem',
    width: '80%',
  },
  divider: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    marginTop: '1rem',
    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
  },
  text: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2rem',
    },
  },
  subText: {
    fontWeight: 1,
    fontSize: '1rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2rem',
    },
  },
  select: { marginTop: -3, marginLeft: 5, border: 'none' },
  orderSum: {
    textAlign: 'center',
    margin: 'auto',
  },
  removeBtnBox: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2rem',
      marginTop: '2rem',
    },
  },
  checkoutBtn: {
    marginTop: '1rem',
    padding: '.5rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '80%',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },
  submitPaymentBtn: {
    marginTop: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    backgroundColor: '#1e2a5a',
    color: 'white',
    boxShadow:
      ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    '&:hover': {
      backgroundColor: '#374da4',
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '97%',
      marginLeft: 10,
    },
  },
}))

const PaymentScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderId = useParams().id

  // ----- state variables ----- //
  const [promoCode, setPromoCode] = useState('')
  const [hasCup, setHasCup] = useState(false)

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, success } = orderDetails

  const orderCharge = useSelector((state) => state.orderCharge)
  const { loading: chargeLoading, success: chargeSuccess } = orderCharge

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: payLoading, success: paySuccesss } = orderPay

  const shippingUpdate = useSelector((state) => state.shippingUpdate)
  const {
    loading: shippingLoading,
    success: shippingSuccess,
    error: shippingError,
  } = shippingUpdate

  // ----- function called for promo codes ----- //
  const promoCodeSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < order.orderItems.length; i++) {
      if (order.orderItems[i].product == '634c58a1260c1a516ab928fd') {
        setHasCup(true)
      } else if (order.orderItems[i].product == '634c6d993804522bac7c8eda') {
        setHasCup(true)
      } else if (order.orderItems[i].product == '634c6d9b3804522bac7c8edb') {
        setHasCup(true)
      } else {
        dispatch(updateShipping(orderId, promoCode))
      }
    }
  }

  // ----- useEffect hook ----- //
  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`, { replace: true })
    } else if (paySuccesss && chargeSuccess) {
      navigate(`/order/${orderId}`, { replace: true })
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch({ type: ORDER_CHARGE_RESET })
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_TOTALS_RESET })
    } else {
      dispatch(getOrderDetails(orderId))
    }
  }, [
    dispatch,
    navigate,
    orderId,
    userInfo,
    chargeSuccess,
    paySuccesss,
    shippingSuccess,
  ])

  return (
    <PageWrapper title={'Order Pay'}>
      <CheckoutSteps activeStep={2} />
      {!success || chargeLoading || payLoading || shippingLoading ? (
        <Loader />
      ) : (
        <Grid container className={classes.root}>
          <Grid item xs={12} md={7}>
            {order.orderItems.map((product) => (
              <Grid
                key={product._id}
                container
                style={{ paddingBottom: '1rem' }}
              >
                <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
                  <Box style={{ padding: '1rem', backgroundColor: '#fafafa' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      width={'100%'}
                      height={'85%'}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant='h5' className={classes.text}>
                    {product.name}
                  </Typography>
                  <Typography className={classes.text}>
                    ${product.price.toFixed(2)}
                  </Typography>

                  {product.size && (
                    <Typography variant='h6' className={classes.subText}>
                      Size: {product.size}
                    </Typography>
                  )}
                  {product.color && (
                    <Typography variant='h6' className={classes.subText}>
                      Color: {product.color}
                    </Typography>
                  )}

                  <Typography variant='h6' className={classes.subText}>
                    Quantity: {product.qty}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} md={5}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant='h4' style={{ marginBottom: '1rem' }}>
                  Order Summary
                </Typography>
              </Grid>

              <Grid container>
                <Grid item xs={6} md={6}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Shipping Address</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      {order.shippingAddress.street}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      style={{ marginTop: '-.5rem' }}
                    >
                      {order.shippingAddress.city},{order.shippingAddress.state}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      style={{ marginTop: '-.5rem' }}
                    >
                      {order.shippingAddress.zipCode}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      style={{ marginTop: '-.5rem' }}
                    >
                      United States
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Grid item xs={12}>
                    <Typography variant='h6'>Billing Address</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                      {order.billingDetails.address.line1}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      style={{ marginTop: '-.5rem' }}
                    >
                      {order.billingDetails.address.city},
                      {order.billingDetails.address.state}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      style={{ marginTop: '-.5rem' }}
                    >
                      {order.billingDetails.address.postal_code}
                    </Typography>
                    <Typography
                      variant='subtitle1'
                      style={{ marginTop: '-.5rem' }}
                    >
                      United States
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Divider className={classes.divider} />

              <Grid container style={{ paddingTop: '1rem' }}>
                <Grid item xs={6}>
                  <Typography variant='subtitle1'>
                    Subtotal ({order.totalItems}) items
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>
                    ${order.subTotal.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  <Typography variant='subtitle1'>Shipping</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>
                    ${order.shippingPrice.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                  <Typography variant='subtitle1'>Promo Code</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>{order.promoCode}</Typography>
                </Grid>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <>
                    {order.promoCode === 'WELCOME15' ||
                    order.promoCode === 'LUCKYDUCK' ||
                    order.promoCode === 'COMEBACK15' ? (
                      <Typography variant='subtitle1'>
                        15% off with {order.promoCode}
                      </Typography>
                    ) : null}
                    {order.promoCode === 'WILSON10' ? (
                      <Typography variant='subtitle1'>
                        10% off with {order.promoCode}
                      </Typography>
                    ) : null}

                    {hasCup && (
                      <Typography variant='subtitle1'>
                        PROMO CODE EXCLUDES ICE SHAKERS
                      </Typography>
                    )}
                  </>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='h5'>Total Due:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h6'>
                      ${order.totalPrice.toFixed(2)}
                    </Typography>
                  </Grid>

                  <Grid container style={{ marginTop: '1rem' }}>
                    {shippingError && (
                      <Box style={{ width: '100%', marginBottom: '1rem' }}>
                        <Message severity='error'>{shippingError}</Message>
                      </Box>
                    )}

                    {!order.promoCode ? (
                      <>
                        <Grid item xs={12} md={7}>
                          <StyledInput
                            label='Promo Code'
                            value={promoCode}
                            style={{ width: '99%', marginTop: '1rem' }}
                            onChange={(e) => setPromoCode(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <Button
                            onClick={promoCodeSubmit}
                            className={classes.submitPaymentBtn}
                          >
                            Apply
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <Box style={{ width: '100%', marginBottom: '1rem' }}>
                        <Message severity='success'>
                          Promo Code '{order.promoCode}' Applied
                        </Message>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Elements stripe={stripePromise}>
                      <PaymentForm
                        amount={order.totalPrice}
                        orderId={order._id}
                        billingDetails={order.billingDetails}
                        shippingDetails={order.shippingAddress}
                      />
                    </Elements>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  )
}

export default PaymentScreen
