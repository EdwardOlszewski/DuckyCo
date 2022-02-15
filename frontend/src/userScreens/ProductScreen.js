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
  Hidden,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Icons
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import { GiPlasticDuck } from 'react-icons/gi'
// Actions
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  imageCont: {
    backgroundColor: '#fafafa',
  },
  mainGrid: {
    textAlign: 'center',
    marginTop: '2rem',
    margin: 'auto',
    width: '95%',
  },
  btn: {
    padding: '1rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '100%',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },
}))

const ProductScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const productId = useParams().id
  const navigate = useNavigate()

  // ----- state variables ----- //
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('standard')

  // ----- get data from redux store ----- //
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // ----- function adds product to cart ----- //
  const addToCartHandler = () => {
    if (!userInfo) {
      navigate('/login', { replace: true })
    } else {
      dispatch(addToCart(productId, qty, size))
      navigate('/cart', { replace: true })
    }
  }

  // ----- useEffect hook ----- //
  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch, productId])

  return (
    <PageWrapper title={'Product'}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : product ? (
        <Grid container className={classes.mainGrid} spacing={5}>
          <Grid
            item
            xs={12}
            sm={2}
            md={1}
            lg={product.category === 'Hat' ? 2 : 2}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={product.category === 'Hat' ? 4 : 4}
            className={classes.imageCont}
          >
            <Box style={{ marginTop: '3rem' }}>
              <img
                src={product.image}
                alt={product.name}
                width='100%'
                height='100%'
              />
            </Box>
            {product.image2 && (
              <Hidden mdUp>
                <div
                  style={{
                    backgroundColor: 'white',
                    width: '115%',
                    height: '2rem',
                    marginTop: '2rem',
                    marginLeft: '-1.5rem',
                  }}
                ></div>
                <Box style={{ marginTop: '3rem' }}>
                  <img
                    src={product.image2}
                    alt={product.name}
                    width='100%'
                    height='100%'
                  />
                </Box>
              </Hidden>
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            style={{ textAlign: 'left', margin: 'auto' }}
          >
            <Typography variant='h4'>{product.name}</Typography>
            <Typography variant='h5'>${product.price}</Typography>

            {product.category !== 'Hat' && (
              <>
                <Typography variant='h6' style={{ marginTop: '2rem' }}>
                  Size
                </Typography>
                <Grid container>
                  <Grid item>
                    <IconButton
                      style={{
                        fontSize: '1rem',
                        color: size === 'small' && 'black',
                        padding: '.5rem 1rem .5rem 1rem',
                      }}
                      onClick={(e) => setSize('small')}
                    >
                      <Typography variant='h6'> S</Typography>
                    </IconButton>
                  </Grid>
                  {product._id !== '61f4ec3ebf1a4e50d4532db1' && (
                    <>
                      <Grid item>
                        <IconButton
                          style={{
                            color: size === 'medium' && 'black',
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
                            color: size === 'large' && 'black',
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
                            color: size === 'xlarge' && 'black',
                            padding: '.5rem .8rem .5rem .8rem',
                          }}
                          onClick={(e) => setSize('xlarge')}
                        >
                          <Typography variant='h6'> XL</Typography>
                        </IconButton>
                      </Grid>
                    </>
                  )}
                </Grid>
              </>
            )}

            <Typography variant='h5' style={{ marginTop: '2rem' }}>
              Quantity
            </Typography>
            <Grid container>
              <Grid item>
                <IconButton
                  style={{ padding: '1rem' }}
                  disabled={true && qty === 1}
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
                  style={{ color: qty === 4 ? 'gray' : 'black' }}
                  disabled={true && qty === 4}
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
                <ListItem key={desc} style={{ marginBottom: '-1rem' }}>
                  <Typography>
                    <GiPlasticDuck style={{ marginRight: '.5rem' }} />
                  </Typography>
                  <Typography>{desc}</Typography>
                </ListItem>
              ))}
            </List>

            <Box
              style={{
                width: '50%',
                marginTop: '2rem',
              }}
            >
              <Hidden xsDown>
                <Button
                  style={{
                    backgroundColor:
                      product.category == 'Hat'
                        ? '#007E33'
                        : size != 'standard'
                        ? '#007E33'
                        : '#bababa',
                  }}
                  className={classes.btn}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </Hidden>
            </Box>
          </Grid>

          {product.image2 && (
            <Hidden smDown>
              <Grid
                item
                xs={12}
                sm={8}
                md={1}
                lg={2}
                style={{ marginTop: '2rem' }}
              ></Grid>

              <Grid
                style={{ marginTop: '2rem' }}
                item
                xs={12}
                sm={12}
                md={6}
                lg={4}
                className={classes.imageCont}
              >
                {product.image2 && (
                  <Box style={{ marginTop: '3rem' }}>
                    <img
                      src={product.image2}
                      alt={product.name}
                      width='100%'
                      height='100%'
                    />
                  </Box>
                )}
              </Grid>
            </Hidden>
          )}
        </Grid>
      ) : null}
    </PageWrapper>
  )
}

export default ProductScreen
