// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Components
import { makeStyles, Grid, Typography, Box, Divider } from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
//Types
import { ORDER_DETAILS_RESET } from '../types/orderTypes'
// Actions
import { listProducts } from '../actions/productActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  productCont: {
    marginTop: '1rem',
    width: '95%',
    margin: 'auto',
    height: '100%',
  },
  divider: {
    backgroundColor: '#f3f3f3',
    width: '95%',
    margin: 'auto',
    marginTop: '2rem',
  },
}))

const ApparelScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

  const [priceCutAmountCrew, setPriceCutAmountCrew] = useState(45)
  const [priceCutAmountHoodie, setPriceCutAmountHoodie] = useState(55)

  // ----- get data from redux store ----- //
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  // ----- useEffect hook ----- //
  useEffect(() => {
    dispatch({ type: ORDER_DETAILS_RESET })
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
          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>MISC</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('MISC'))
                .map(
                  (filteredProduct) =>
                    filteredProduct.isPublished && (
                      <Grid
                        key={filteredProduct._id}
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={4}
                      >
                        <Product
                          key={filteredProduct._id}
                          product={filteredProduct}
                        />
                      </Grid>
                    )
                )}
          </Grid>

          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Hats</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('Hat'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Product
                      key={filteredProduct._id}
                      product={filteredProduct}
                    />
                  </Grid>
                ))}
          </Grid>

          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Shirts</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('Shirt'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Product
                      key={filteredProduct._id}
                      product={filteredProduct}
                    />
                  </Grid>
                ))}
          </Grid>

          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Tanktops</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('Tanktop'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Product
                      key={filteredProduct._id}
                      product={filteredProduct}
                    />
                  </Grid>
                ))}
          </Grid>

          <Grid container className={classes.productCont} spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Shorts</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('Shorts'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Product
                      key={filteredProduct._id}
                      product={filteredProduct}
                    />
                  </Grid>
                ))}
          </Grid>

          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Crewnecks</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('Crewneck'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Product
                      key={filteredProduct._id}
                      product={filteredProduct}
                      priceCut={priceCutAmountCrew}
                    />
                  </Grid>
                ))}
          </Grid>

          <Grid className={classes.productCont} container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Hoodies</Typography>
            </Grid>
            {products &&
              products
                .filter((product) => product.category.includes('Hoodie'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Product
                      key={filteredProduct._id}
                      product={filteredProduct}
                      priceCut={priceCutAmountHoodie}
                    />
                  </Grid>
                ))}
          </Grid>
        </Box>
      )}
    </PageWrapper>
  )
}

export default ApparelScreen

/*
      <Grid container className={classes.productCont} spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h4'>Hats</Typography>
            </Grid>

            {products &&
              products
                .filter((product) => product.category.includes('Hat'))
                .map((filteredProduct) => (
                  <Grid
                    key={filteredProduct._id}
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <Box>
                      <img
                        className={classes.imgHat}
                        src={filteredProduct.image}
                        alt={filteredProduct.name}
                        height='100%'
                        width='100%'
                        layout={'responsive'}
                      />
                    </Box>
                  </Grid>
                ))}
          </Grid>
          <Divider className={classes.divider} />



*/
