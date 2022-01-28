import React from 'react'
import { Box, Grid, makeStyles, Container } from '@material-ui/core'

// Components
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Marquee from 'react-fast-marquee'

const useStyles = makeStyles((theme) => ({
  productCont: {
    marginTop: '40rem',
    width: '100%',
    marginBottom: '-10rem',
  },
}))

export default function Home() {
  // Mui Style Sheet
  const classes = useStyles()

  return (
    <Container style={{ textAlign: 'center' }}>
      <img
        src='/images/construction.png'
        alt='construction'
        height='100%'
        width='100%'
      />
    </Container>
  )
}

/*

       <Marquee
          className={classes.marquee}
          play={true}
          speed={50}
          gradient={false}
          pauseOnHover={true}
        >
          <Box style={{ backgroundColor: '#f4f4f4' }}>
            <img
              src='/images/duckHat.png'
              alt='whatever'
              width='400'
              height='400'
            />
          </Box>
          <Box style={{ backgroundColor: '#fff3f6' }}>
            <img
              src='/images/duckHat.png'
              alt='whatever'
              width='400'
              height='400'
            />
          </Box>
          <Box style={{ backgroundColor: '#edfaff' }}>
            <img
              src='/images/duckHat.png'
              alt='whatever'
              width='400'
              height='400'
            />
          </Box>
          <Box style={{ backgroundColor: '#fffeef' }}>
            <img
              src='/images/duckHat.png'
              alt='whatever'
              width='400'
              height='400'
            />
          </Box>
          <Box style={{ backgroundColor: '#edfaff' }}>
            <img
              src='/images/duckHat.png'
              alt='whatever'
              width='400'
              height='400'
            />
          </Box>
        </Marquee>

*/
