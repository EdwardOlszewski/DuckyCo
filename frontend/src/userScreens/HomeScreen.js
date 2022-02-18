// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Components
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
} from '@material-ui/core'
import HomeNav from '../components/HomeNav'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Loader from '../components/Loader'
// Actions
import {
  listSpecialProducts,
  listMostRecentProducts,
} from '../actions/productActions'
// Icons
import { FaFacebookF } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
import background from '../components/background.png'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  specialGrid: {
    paddingBottom: '15rem',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  recentBox: {
    position: 'relative',
    zIndex: 1,
    paddingTop: '2rem',
    paddingBottom: '5rem',
    backgroundColor: '#f6f6f6',
  },
  newProductsTitle: {
    padding: '3rem',
    textAlign: 'center',
  },
  btnBox: {
    padding: '5rem',
    textAlign: 'center',
  },
  btn: {
    width: '100%',
    fontSize: '1rem',
    padding: '1.5rem',
    color: 'white',
    backgroundColor: '#1e2a5a',
    '&:hover': {
      backgroundColor: '#425dcb',
    },
  },
}))

const HomeScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = () => setOffsetY(window.pageYOffset)

  // ----- get data from redux store ----- //
  const productMostRecent = useSelector((state) => state.productMostRecent)
  const { loading, recentProducts } = productMostRecent

  // ----- get data from redux store ----- //
  const productSpecial = useSelector((state) => state.productSpecial)
  const { loading: specialLoading, specialProducts } = productSpecial

  // ----- useEffect hook ----- //
  useEffect(() => {
    dispatch(listSpecialProducts())
    dispatch(listMostRecentProducts())
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [dispatch])

  return (
    <PageWrapper>
      {loading || specialLoading ? (
        <Loader />
      ) : (
        <>
          <Box className={classes.specialGrid}>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  style={{
                    zIndex: 0,
                    transform: `translateY(${offsetY * 0.2}px)`,
                  }}
                >
                  <Typography
                    className={classes.newProductsTitle}
                    variant='h3'
                    style={{ color: '#272829' }}
                  >
                    St. Patricks Day Gear
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={3} />

              {specialProducts &&
                specialProducts.map((product) => (
                  <Grid
                    item
                    xs={12}
                    md={3}
                    style={{
                      zIndex: 0,
                      transform: `translateY(${offsetY * 0.3}px)`,
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product._id}
                      width='100%'
                      height='100%'
                      layout='responsive'
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>

          <Box className={classes.recentBox}>
            <Box>
              <Typography className={classes.newProductsTitle} variant='h3'>
                New Products
              </Typography>
            </Box>
            <Grid container spacing={5} style={{ padding: '.1rem' }}>
              <Grid item xs={12} md={2} style={{ marginLeft: '-5rem' }} />
              {recentProducts &&
                recentProducts.map((product) => (
                  <Grid item xs={12} md={3}>
                    <Product key={product._id} product={product} />
                  </Grid>
                ))}
            </Grid>
            <Box className={classes.btnBox}>
              <Button
                className={classes.btn}
                onClick={() => navigate('/gear', { replace: true })}
              >
                Browse Our Gear
              </Button>
            </Box>
          </Box>
        </>
      )}
    </PageWrapper>
  )
}

export default HomeScreen
