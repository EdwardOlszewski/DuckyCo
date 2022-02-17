// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
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
import DateFormat from '../components/DateFormat'
import Loader from '../components/Loader'
// Actions
import { getOrderDetails, deliverOrder } from '../actions/orderActions'

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
    fontSize: '1.5rem',
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
  title: {
    textAlign: 'center',
    padding: '2rem',
    fontSize: '2rem',
  },
}))

const OrderScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orderId = useParams().id

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, success } = orderDetails

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { success: successDeliver } = orderDeliver

  // ----- changes delivery status for admin ----- //
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
    navigate(`/admin/orderlist`, { replace: true })
  }

  // ----- use effect hook ----- //
  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`, { replace: true })
    } else if (!order || order._id !== orderId || successDeliver) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, navigate, orderId, order, userInfo, successDeliver])

  return (
    <PageWrapper title={'Order Pay'}>
      {!success || loading ? (
        <Loader />
      ) : (
        <>
          <Typography variant='h2' className={classes.title}>
            Order Number: {order._id}
          </Typography>
          <Grid container className={classes.root}>
            <Grid item xs={12} md={7}>
              {order.orderItems.map((product) => (
                <Grid
                  key={product._id}
                  container
                  style={{ paddingBottom: '1rem' }}
                >
                  <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
                    <Box
                      style={{ padding: '1rem', backgroundColor: '#fafafa' }}
                    >
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
                      <Typography variant='h6'>Order Placed</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant='subtitle1'
                        style={{ marginTop: '-.5rem' }}
                      >
                        {DateFormat(order.createdAt)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} style={{ marginBottom: '1rem' }}>
                    <Grid item xs={12}>
                      <Typography variant='h6'>Order Shipped</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {order.isDelivered ? (
                        <Typography variant='subtitle1'>
                          {DateFormat(order.deliveredAt)}
                        </Typography>
                      ) : (
                        <Typography variant='subtitle1'>
                          Order not shipped yet
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
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
                        {order.shippingAddress.city},
                        {order.shippingAddress.state}
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
                  <Grid item xs={6}>
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
                    <Typography variant='h6'>${order.subTotal}</Typography>
                  </Grid>
                </Grid>

                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant='subtitle1'>Shipping</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant='h6'>${order.shippingPrice}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography variant='h5'>Total:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='h6'>${order.totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {userInfo.isAdmin && !order.isDelivered ? (
                  <Grid item xs={12} style={{ marginTop: '1rem' }}>
                    <Button
                      className={classes.checkoutBtn}
                      onClick={deliverHandler}
                    >
                      Ship Order
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </PageWrapper>
  )
}
export default OrderScreen
