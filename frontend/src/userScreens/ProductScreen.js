// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
  Divider,
} from '@material-ui/core'
import DateFormat from '../components/DateFormat'
import Rating from '@mui/material/Rating'
import StyledInput from '../components/StyledInput'
import PageWrapper from '../components/PageWrapper'
import Message from '../components/Message'
import Sizing from '../components/Sizing'
import Loader from '../components/Loader'
// Icons
import { HiMinusSm, HiPlusSm } from 'react-icons/hi'
import { GiPlasticDuck } from 'react-icons/gi'
import { FaTrashAlt } from 'react-icons/fa'
// Types
import { PRODUCT_CREATE_REVIEW_RESET } from '../types/productTypes'
// Actions
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
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

  // Reviews
  reviewGrid: {
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '65%',
    },
  },
  reviewBtn: {
    padding: '1rem',
    backgroundColor: '#007E33',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
  trashIcon: {
    fontSize: '1.5rem',
    color: '#CC0000',
    '&:hover': {
      cursor: 'pointer',
      color: '#ff0404',
    },
  },

  bigSizing: {
    padding: 6,
    fontStyle: 'italic',
    fontSize: 13,
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
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  // ----- get data from redux store ----- //
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  // ----- function adds product to cart ----- //
  const addToCartHandler = () => {
    if (!userInfo) {
      navigate('/login', { replace: true })
    } else {
      dispatch(addToCart(productId, qty, size))
      navigate('/cart', { replace: true })
    }
  }

  // ----- function adds review ----- //
  const reviewSubmit = (e) => {
    e.preventDefault()
    if (!userInfo) {
      navigate(`/login`, { replace: true })
    } else {
      dispatch(
        createProductReview(productId, {
          rating,
          comment,
        })
      )
    }
  }

  // ----- useEffect hook ----- //
  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch(listProductDetails(productId))
    }
    if (!product || product._id !== productId) {
      dispatch(listProductDetails(productId))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, productId, successProductReview, loadingProductReview])

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
            <Typography variant='h5'>
              $
              {size === '3XL' || size === '2XL'
                ? product.price + 7
                : product.price}
            </Typography>
            {product.category === 'Hat' ||
              (product.category === 'MISC' ? null : (
                <Sizing
                  category={product.category}
                  setSize={setSize}
                  size={size}
                />
              ))}

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
                      product.category === 'Hat' || product.category === 'MISC'
                        ? '#007E33'
                        : size !== 'standard'
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
            <Hidden smUp>
              <Button
                style={{
                  width: '100%',
                  backgroundColor:
                    product.category === 'Hat' || product.category === 'MISC'
                      ? '#007E33'
                      : size !== 'standard'
                      ? '#007E33'
                      : '#bababa',
                }}
                className={classes.btn}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </Hidden>
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

          <Grid
            spacing={5}
            container
            style={{ marginTop: 20, textAlign: 'left' }}
            className={classes.reviewGrid}
          >
            {product.reviews.map((review) => (
              <Grid item xs={12} key={review._id}>
                <Rating
                  style={{ marginTop: 2 }}
                  name='read-only'
                  value={review.rating}
                  readOnly
                />
                <Typography style={{ marginTop: 2 }} variant='h6'>
                  {review.comment}
                </Typography>
                <Typography
                  variant='subtitle1'
                  style={{ marginTop: 2, color: '#aaaaaa' }}
                >
                  written by {review.name}, {DateFormat(review.createdAt)}{' '}
                </Typography>

                <Divider
                  style={{ marginTop: 20, backgroundColor: '#f8f8f8' }}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              {successProductReview ||
                (!errorProductReview && (
                  <>
                    <Typography variant='h4' style={{ marginTop: 50 }}>
                      Write A Review
                    </Typography>

                    <Rating
                      style={{ marginTop: 10 }}
                      name='simple-controlled'
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue)
                      }}
                    />

                    <StyledInput
                      style={{ marginTop: 10 }}
                      label='Review'
                      value={comment}
                      multiline
                      rows={5}
                      onChange={(e) => setComment(e.target.value)}
                    ></StyledInput>
                  </>
                ))}

              {successProductReview ? (
                <Box style={{ marginTop: 15, marginLeft: -12 }}>
                  <Message severity='success'>
                    Product Reviewed Thank you!
                  </Message>
                </Box>
              ) : errorProductReview ? (
                <Box style={{ marginTop: 15, marginLeft: -12 }}>
                  <Message severity='error'>
                    You Already Reviewed This Product.
                  </Message>
                </Box>
              ) : (
                <>
                  {!userInfo && (
                    <Box style={{ marginLeft: -12, marginTop: 10 }}>
                      <Message severity='info'>
                        <Link
                          to='/login'
                          style={{
                            color: 'darkblue',
                            textDecoration: 'none',
                          }}
                        >
                          Log in
                        </Link>{' '}
                        to leave a review
                      </Message>
                    </Box>
                  )}

                  {userInfo && (
                    <Button
                      style={{
                        marginTop: 10,
                        color: 'white',
                        backgroundColor: !rating || !comment ? '#bababa' : null,
                      }}
                      className={classes.reviewBtn}
                      onClick={reviewSubmit}
                      disabled={!rating || !comment}
                    >
                      Submit Review
                    </Button>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </PageWrapper>
  )
}

export default ProductScreen
