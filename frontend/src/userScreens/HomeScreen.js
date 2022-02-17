// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Components
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Loader from '../components/Loader'
// Actions
import {
  listSpecialProducts,
  listMostRecentProducts,
} from '../actions/productActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '3rem',
  },
  gearBtn: {
    padding: '1rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '20%',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },
  specialGrid: {
    marginTop: '1rem',

    padding: '1rem',
    marginBottom: '2rem',
  },
}))

const HomeScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

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
  }, [dispatch])

  return (
    <PageWrapper title={'Home'}>
      {specialLoading || loading ? (
        <Loader />
      ) : (
        <Grid container>
          <Grid container spacing={10} className={classes.specialGrid}>
            <Grid item md={3} />
            {specialProducts &&
              specialProducts.map((product) => (
                <Grid item xs={12} md={3}>
                  <Product key={product._id} product={product} />
                </Grid>
              ))}
          </Grid>

          <Grid container spacing={10}>
            <Grid item md={1} />
            {recentProducts &&
              recentProducts.map((product) => (
                <Grid item xs={12} md={3}>
                  <Product key={product._id} product={product} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  )
}

export default HomeScreen

/*
     <Grid container>
                <Grid item md={2} />
                {recentProducts.map((product) => (
                  <Grid item xs={12} md={3}>
                    <Product key={product._id} product={product} />
                  </Grid>
                ))}
              </Grid>





 <Grid container spacing={5}>
                {specialProducts.map((product) => (
                  <Grid item xs={12} md={4}>
                    <Product key={product._id} product={product} />
                  </Grid>
                ))}
              </Grid>


  <Grid container spacing={5}>
              <Grid item xs={12}>
                <Box style={{ textAlign: 'center' }}>
                  <Link to='/apparel' style={{ textDecoration: 'none' }}>
                    <Button className={classes.gearBtn}>Browse Our Gear</Button>
                  </Link>
                </Box>
              </Grid>
            </Grid>




*/
