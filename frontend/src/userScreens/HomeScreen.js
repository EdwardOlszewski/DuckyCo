// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Components
import { Box, Grid, makeStyles, Typography, Button } from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Loader from '../components/Loader'
// Actions
import { listMostRecentProducts } from '../actions/productActions'

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
}))

const HomeScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

  // ----- get data from redux store ----- //
  const productMostRecent = useSelector((state) => state.productMostRecent)
  const { loading, products } = productMostRecent

  // ----- useEffect hook ----- //
  useEffect(() => {
    dispatch(listMostRecentProducts())
  }, [dispatch])

  return (
    <PageWrapper title={'Home'}>
      {loading ? (
        <Loader />
      ) : (
        <Grid container className={classes.root}>
          <Grid
            item
            style={{
              width: '100%',
              backgroundColor: '#f5f5f5',
              minHeight: '10rem',
              marginTop: '10rem',
            }}
          ></Grid>

          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h3' className={classes.title}>
                New Additions
              </Typography>
            </Grid>

            <Grid item md={1} />
            {products.map((product) => (
              <Grid item xs={12} md={3}>
                <Product key={product._id} product={product} />
              </Grid>
            ))}
            <Grid item md={1} />

            <Grid item xs={12}>
              <Box style={{ textAlign: 'center' }}>
                <Link to='/apparel' style={{ textDecoration: 'none' }}>
                  <Button className={classes.gearBtn}>Browse Our Gear</Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </PageWrapper>
  )
}

export default HomeScreen
