// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Message from '../components/Message'
import Loader from '../components/Loader'

// Actions
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

// Icons
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import { GiPlasticDuck } from 'react-icons/gi'

const useStyles = makeStyles((theme) => ({
  // Containers
  imageCont: {
    textAlign: 'center',
    backgroundColor: '#fafafa',
  },
  mainGrid: {
    margin: 'auto',
    width: '95%',
  },
  btn: {
    padding: '.5rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '100%',
  },
}))

export default function ProductScreen() {
  // Mui Style Sheet
  const classes = useStyles()
  // Init dispatch
  const dispatch = useDispatch()
  // get productId from the URL
  const productId = useParams().id
  // Init navigate for redirect
  const navigate = useNavigate()

  // go to productDetails in the state and pull out information
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, success, error, product } = productDetails

  // Declare new state variables using useState hook
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')

  // Function to be called on add to cart
  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty, size))
    navigate('/cart', { replace: true })
  }

  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch, productId])

  return (
    <PageWrapper title={'Product'}>
      {!success ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Grid container className={classes.mainGrid}>
          <Grid item xs={12} md={7} className={classes.imageCont}>
            <img
              src={product.image}
              alt={product.name}
              width='70%'
              height='80%'
            />
          </Grid>

          <Grid item xs={12} md={5} style={{ padding: '1rem' }}>
            <Typography variant='h4'>{product.name}</Typography>
            <Typography variant='h5'>${product.price}</Typography>

            {product.category != 'Hat' && (
              <>
                <Typography variant='h6' style={{ marginTop: '2rem' }}>
                  Size
                </Typography>
                <Grid container>
                  <Grid item>
                    <IconButton
                      style={{
                        fontSize: '1rem',
                        color: size == 'small' && 'black',
                        padding: '.5rem 1rem .5rem 1rem',
                      }}
                      onClick={(e) => setSize('small')}
                    >
                      <Typography variant='h6'> S</Typography>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      style={{
                        color: size == 'medium' && 'black',
                        padding: '.5rem 1rem .5rem 1rem',
                      }}
                      onClick={(e) => setSize('medium')}
                    >
                      <Typography variant='h6'> M</Typography>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      style={{
                        color: size == 'large' && 'black',
                        padding: '.5rem 1rem .5rem 1rem',
                      }}
                      onClick={(e) => setSize('large')}
                    >
                      <Typography variant='h6'> L</Typography>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      style={{
                        color: size == 'xlarge' && 'black',
                        padding: '.5rem .8rem .5rem .8rem',
                      }}
                      onClick={(e) => setSize('xlarge')}
                    >
                      <Typography variant='h6'> XL</Typography>
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            )}

            <Typography variant='h5' style={{ marginTop: '4rem' }}>
              Quantity
            </Typography>
            <Grid container>
              <Grid item>
                <IconButton
                  style={{ padding: '1rem' }}
                  disabled={true && qty == 1}
                  onClick={(e) => setQty(qty - 1)}
                >
                  <HiMinusSm />
                </IconButton>
              </Grid>
              <Grid item>
                <Typography
                  style={{ marginTop: 0, padding: '.5rem' }}
                  variant='h6'
                >
                  {qty}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  style={{ color: qty == 4 ? 'gray' : 'black' }}
                  disabled={true && qty == 4}
                  onClick={(e) => setQty(qty + 1)}
                >
                  <HiPlusSm />
                </IconButton>
              </Grid>
            </Grid>

            <Typography variant='h5' style={{ marginTop: '2rem' }}>
              Description:
            </Typography>
            <List style={{ marginTop: '-1rem' }}>
              {product.description.map((desc) => (
                <ListItem style={{ marginBottom: '-1rem' }}>
                  <GiPlasticDuck style={{ marginRight: '.5rem' }} />
                  <ListItemText primary={desc} />
                </ListItem>
              ))}
            </List>
            <Tooltip title={!size && 'Please Pick A Size'} disabled>
              <Box
                style={{
                  width: '50%',
                  marginTop: '2rem',
                }}
              >
                <Button
                  disabled={true && !size}
                  style={{ backgroundColor: size ? '#007E33' : '#bababa' }}
                  className={classes.btn}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  )
}
