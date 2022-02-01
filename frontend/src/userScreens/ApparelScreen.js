// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Components
import { makeStyles, Grid, Typography, Box, Divider } from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Actions
import { listProducts } from '../actions/productActions'
//Types
import { ORDER_DETAILS_RESET } from '../types/orderTypes'

const useStyles = makeStyles((theme) => ({
  productCont: {
    marginTop: '2rem',
    width: '95%',
    margin: 'auto',
    height: '100%',
  },
  divider: {
    backgroundColor: '#f7f7f7',
    width: '95%',
    margin: 'auto',
    marginTop: '2rem',
  },
}))

export default function ApparelScreen() {
  // ----- init variables ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

  // ----- get data from redux state ----- //
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails

  // ----- use effect hook ----- //
  useEffect(() => {
    if (order) {
      dispatch({ type: ORDER_DETAILS_RESET })
    }
    dispatch(listProducts())
  }, [dispatch])

  return (
    <PageWrapper title={'Apparel'}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <Box>
          <Grid container className={classes.productCont} spacing={10}>
            <Grid item xs={12}>
              <Typography variant='h4'>Hats</Typography>
            </Grid>
            {products
              .filter((product) => product.category.includes('Hat'))
              .map((filteredProduct) => (
                <Grid
                  key={filteredProduct._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Product
                    key={filteredProduct._id}
                    product={filteredProduct}
                  />
                </Grid>
              ))}
          </Grid>
          <Divider className={classes.divider} />

          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Shirts</Typography>
            </Grid>
            {products
              .filter((product) => product.category.includes('Shirt'))
              .map((filteredProduct) => (
                <Grid
                  key={filteredProduct._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Product
                    key={filteredProduct._id}
                    product={filteredProduct}
                  />
                </Grid>
              ))}
          </Grid>
          <Divider className={classes.divider} />
          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Hoodies</Typography>
            </Grid>
            {products
              .filter((product) => product.category.includes('Hoodie'))
              .map((filteredProduct) => (
                <Grid
                  key={filteredProduct._id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <Product
                    key={filteredProduct._id}
                    product={filteredProduct}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </PageWrapper>
  )
}
