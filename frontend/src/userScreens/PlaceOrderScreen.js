// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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

// Actions
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../types/orderTypes'
import { USER_DETAILS_RESET } from '../types/userTypes'

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
}))

export default function ApparelScreen() {
  // Mui Style Sheet
  const classes = useStyles()
  // Init dispatch
  const dispatch = useDispatch()
  // Init navigate for redirect
  const navigate = useNavigate()

  // Go to the cart in the state and select the cartItems
  const cart = useSelector((state) => state.cart)
  const { cartItems, shippingAddress } = cart

  const total =
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + 6

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.qty), 0)

  return (
    <PageWrapper title={'Apparel'}>
      <CheckoutSteps activeStep={1} />
      <Grid container className={classes.root}>
        <Grid container xs={12} md={7}>
          {cartItems.map((product) => (
            <Grid container style={{ paddingBottom: '1rem' }}>
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
                <Typography variant='h6' className={classes.subText}>
                  Size: {product.size}
                </Typography>
                <Typography variant='h6' className={classes.subText}>
                  Quantity: {product.qty}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Grid container xs={12} md={5}>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant='h4' style={{ marginBottom: '1rem' }}>
                Order Summary
              </Typography>
            </Grid>

            <Grid container>
              <Grid container xs={12} md={6}>
                <Grid item xs={12}>
                  <Typography variant='h5'>Shipping Address</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                  </Typography>
                  <Typography variant='subtitle1'>
                    {shippingAddress.address}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    style={{ marginTop: '-.5rem' }}
                  >
                    {shippingAddress.city},{shippingAddress.state}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    style={{ marginTop: '-.5rem' }}
                  >
                    {shippingAddress.postalCode}
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
                  Subtotal ({subtotal}) items
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={6}>
                <Typography variant='subtitle1'>Shipping</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>$6.00</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant='h5'>Total Due:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>${total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                className={classes.checkoutBtn}
                onClick={() => navigate(`/payment`, { replace: true })}
              >
                Proceed To Payment
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}
