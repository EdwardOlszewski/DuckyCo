// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// Components
import { makeStyles, Grid, Typography, Box, Divider } from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

// Actions
import { listProductDetails } from '../actions/productActions'

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

export default function ProductScreen() {
  // Mui Style Sheet
  const classes = useStyles()
  // Init dispatch
  const dispatch = useDispatch()
  // get productId from the URL
  const productId = useParams().id

  // go to productDetails in the state and pull out information
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, success, error, product } = productDetails

  useEffect(() => {
    dispatch(listProductDetails(productId))
  }, [dispatch, productId])

  return (
    <PageWrapper title={'Product'}>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error'>{error}</Message>
      ) : (
        <>
          <img
            src={product.image}
            alt={product.name}
            width='500'
            height='500'
          />
        </>
      )}
    </PageWrapper>
  )
}
