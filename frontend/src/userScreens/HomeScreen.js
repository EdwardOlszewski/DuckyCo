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
  Hidden,
} from '@material-ui/core'
import Banner from '../components/Banner'
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
  topGrid: {
    height: '100%',
  },
  recentBox: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
    position: 'relative',
    paddingTop: '2rem',
    paddingBottom: '5rem',
  },
  imgBox: {
    zIndex: 0,
  },
  browseBox: {
    position: 'relative',
    zIndex: 1,
    float: 'left',
    color: 'white',
    [theme.breakpoints.up('xs')]: {
      marginTop: '-70%',
      marginLeft: '1rem',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '-20rem',
      marginLeft: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '-20rem',
      marginLeft: '5rem',
    },
  },

  shopBtn: {
    fontWeight: 0,
    fontSize: '1.5rem',
    margin: '.5rem',
    padding: '.8rem',
    color: 'white',
    backgroundColor: '#1e2a5a',
    '&:hover': {
      backgroundColor: '#425dcb',
    },
  },

  newProductsTitle: {
    padding: '3rem',
    textAlign: 'center',
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
          <Box className={classes.topGrid}>
            <Banner />
            <Grid container>
              <Grid item xs={12} lg={6}>
                <Box className={classes.imgBox}>
                  <img
                    style={{ zIndex: 0 }}
                    src='/images/toppicture1.png'
                    alt='Duckylogo'
                    width='100%'
                    height='90%'
                    layout='responsive'
                  />
                </Box>

                <Box className={classes.browseBox}>
                  <Hidden xsDown>
                    <Typography variant='h1'>
                      <Box fontWeight={800}>Browse Our Gear</Box>
                    </Typography>
                  </Hidden>
                  <Hidden smUp>
                    <Typography variant='h2'>
                      <Box fontWeight={800}>Browse Our Gear</Box>
                    </Typography>
                  </Hidden>

                  <Box className={classes.btnBox}>
                    <Button className={classes.shopBtn}>
                      <Box
                        fontWeight={1}
                        onClick={() => navigate('/gear', { replace: true })}
                      >
                        Shop Now
                      </Box>
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Hidden mdDown>
                <Grid item lg={6}>
                  <img
                    src='/images/toppicture2.png'
                    alt='Duckylogo'
                    width='100%'
                    height='99.5%'
                    layout='responsive'
                  />
                </Grid>
              </Hidden>
            </Grid>
            <Grid item style={{ marginTop: '-5px' }}>
              <img
                src='/images/toppicture3.jpg'
                alt='Duckylogo'
                width='100%'
                height='100%'
                layout='responsive'
              />
            </Grid>
          </Box>

          <Box className={classes.recentBox}>
            <Box>
              <Typography className={classes.newProductsTitle} variant='h2'>
                <Box fontWeight={800}>Most Recent</Box>
              </Typography>
            </Box>
            <Grid container spacing={5} style={{ padding: '.2rem' }}>
              {recentProducts &&
                recentProducts.map((product) => (
                  <Grid item xs={12} md={4}>
                    <Product key={product._id} product={product} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      )}
    </PageWrapper>
  )
}

export default HomeScreen
