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
  FormControl,
  Select,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'

// Actions
import { addToCart, removeFromCart } from '../actions/cartActions'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '4rem',
    width: '70%',
  },
  divider: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    margin: 'auto',
    marginTop: '1rem',
    marginBottom: '1rem',
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
  removeBtn: {},
  checkoutBtn: {
    padding: '.5rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '100%',
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
  const { cartItems } = cart

  const total =
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) + 6

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.qty), 0)

  // Function to remove item from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  // useEffect hook to do something
  useEffect(() => {}, [addToCart])

  return (
    <PageWrapper title={'Apparel'}>
      <Grid container className={classes.root}>
        <Grid container xs={12} md={7}>
          {cartItems.map((product) => (
            <Grid container style={{ marginTop: '2rem' }}>
              <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  width={'100%'}
                  height={'85%'}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='h5' className={classes.text}>
                  {product.name}
                </Typography>
                <Typography className={classes.text}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant='h6' className={classes.subText}>
                  Size:
                  <FormControl className={classes.formControl}>
                    <Select
                      disableUnderline
                      className={classes.select}
                      native
                      value={product.size}
                      onChange={(e) =>
                        dispatch(
                          addToCart(
                            product.product,
                            product.qty,
                            e.target.value
                          )
                        )
                      }
                    >
                      <option value={'small'}>small</option>
                      <option value={'medium'}>medium</option>
                      <option value={'large'}>large</option>
                      <option value={'xlarge'}>xlarge</option>
                    </Select>
                  </FormControl>
                </Typography>

                <Typography variant='h6' className={classes.subText}>
                  Quantity:
                  <Select
                    disableUnderline
                    className={classes.select}
                    native
                    value={product.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(product.product, e.target.value, product.size)
                      )
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </Select>
                </Typography>

                <Box className={classes.removeBtnBox}>
                  <Button
                    className={classes.removeBtn}
                    onClick={() => dispatch(removeFromCart(product.product))}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid>
              <Divider className={classes.divider} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          xs={12}
          md={5}
          style={{
            marginTop: '1rem',
          }}
        >
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant='h4'>Order Summary</Typography>
            </Grid>

            <Grid container style={{ paddingTop: '1rem' }}>
              <Grid item xs={10}>
                <Typography variant='h5'>
                  Subtotal ({subtotal}) items
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='h6'>
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: '1rem' }}>
              <Grid item xs={10}>
                <Typography variant='h5'>Shipping</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='h6'>$6.00</Typography>
              </Grid>
            </Grid>

            <Divider style={{ marginTop: '2rem', marginBottom: '1rem' }} />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant='h5'>Total</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant='h6'>${total.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />

            <Grid item xs={12} style={{ padding: '2rem' }}>
              <Button
                className={classes.checkoutBtn}
                onClick={() => navigate('/shipping', { replace: true })}
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

/*
<Button
                    style={{ color: '#eb5202' }}
                    startIcon={<IoSettings />}
                    onClick={(e) => setAnchorEl2(e.currentTarget)}
                    className={classes.btn}
                    endIcon={anchorEl2 ? <MdExpandLess /> : <MdExpandMore />}
                  >
                    Admin
                  </Button>
*/
