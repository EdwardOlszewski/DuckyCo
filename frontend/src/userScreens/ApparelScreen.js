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

const useStyles = makeStyles((theme) => ({
  productCont: {
    marginTop: '8rem',
    width: '95%',
    margin: 'auto',
  },
  divider: {
    backgroundColor: '#f7f7f7',
    width: '95%',
    margin: 'auto',
    marginTop: '8rem',
  },
}))

export default function ApparelScreen() {
  // Mui Style Sheet
  const classes = useStyles()
  // Init dispatch
  const dispatch = useDispatch()

  // Go to the productList in the state and pull out information
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pageNumber } = productList

  useEffect(() => {
    dispatch(listProducts('', pageNumber))
  }, [dispatch, pageNumber])

  return (
    <PageWrapper title={'Apparel'}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <>
          <Grid container className={classes.productCont}>
            <Grid item xs={12}>
              <Typography variant='h4'>Hats</Typography>
            </Grid>
            {products
              .filter((product) => product.category.includes('Hat'))
              .map((filteredProduct) => (
                <Grid key={filteredProduct._id} item xs={3}>
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
                <Grid key={filteredProduct._id} item xs={3}>
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
                <Grid key={filteredProduct._id} item xs={3}>
                  <Product
                    key={filteredProduct._id}
                    product={filteredProduct}
                  />
                </Grid>
              ))}
          </Grid>
        </>
      )}
    </PageWrapper>
  )
}
