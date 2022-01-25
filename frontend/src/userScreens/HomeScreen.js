import React from 'react'
import { Box, Grid, makeStyles } from '@material-ui/core'

// Components
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'

const useStyles = makeStyles((theme) => ({
  productCont: {
    marginTop: '8rem',
    width: '80%',
    margin: 'auto',
  },
}))

const products = [
  {
    imgURL: '/images/duckShirt.png',
    zoomImgURL: '/images/duckShirtZoom.png',
    itemName: 'Ducky Shirt',
    itemPrice: '30',
  },
  {
    imgURL: '/images/shirtBlue.png',
    zoomImgURL: '/images/shirtBlueZoom.png',
    itemName: 'Ducky Shirt',
    itemPrice: '30',
  },
  {
    imgURL: '/images/duckHat.png',
    zoomImgURL: '/images/duckHatZoom.png',
    itemName: 'Ducky Hat',
    itemPrice: '30',
  },
]

export default function Home() {
  // Mui Style Sheet
  const classes = useStyles()

  return (
    <PageWrapper title={'Home'}>
      <Grid className={classes.productCont} container spacing={5}>
        {products.map((product) => (
          <Grid key={product.imgURL} item xs={4}>
            <Box key={product.imgURL} className={classes.product}>
              <Product
                imgURL={product.imgURL}
                zoomImgURL={product.zoomImgURL}
                itemName={product.itemName}
                itemPrice={product.itemPrice}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </PageWrapper>
  )
}
