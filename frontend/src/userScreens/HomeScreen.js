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

export default function Home() {
  // Mui Style Sheet
  const classes = useStyles()

  return (
    <PageWrapper title={'Home'}>
      <Grid className={classes.productCont} container spacing={5}></Grid>
    </PageWrapper>
  )
}
