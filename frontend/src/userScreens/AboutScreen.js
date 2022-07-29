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
import HomeNav from '../components/HomeNav'
import StyledInput from '../components/StyledInput'
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
const useStyles = makeStyles(() => ({
  root: {},
}))

const HomeScreen = () => {
  // ----- init ----- //
  const classes = useStyles()

  // ----- state variables ----- //
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <PageWrapper>
      <Container maxWidth='lg'>
        <Grid container spacing={10} className={classes.root}>
          <Grid item xs={12}>
            <Container
              maxWidth='sm'
              style={{ textAlign: 'center', marginTop: '2rem' }}
            >
              <img
                src='/images/DuckyLogin.png'
                alt='loginLogo'
                width='70%'
                height='100%'
                layout='responsive'
              />
            </Container>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h6' className={classes.text}>
              Ducky {'&'} Co. was founded by Devin Whitty and Ed Olszewski in
              2022. It started with Devin{"'"}s collection and liking of rubber
              ducks and real ducks since he was a child. Rubber ducks to Devin
              meant happiness, not to worry, and to do what you love to do no
              matter what other people think. Devin wanted to share that meaning
              with other people and talked to Eddie about how that could be
              possible.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant='h6' className={classes.text}>
              Eddie brought up the idea of a clothing brand along with the
              design of our logo. Ducky {'&'} Co. was born. We started with two
              iterations of shirt designs and planned to add more over time with
              limited time drops for holidays. We want to make Ducky {'&'} Co.
              clothing memorable and what better way to do that than to use the
              highest and most comfortable clothing materials available.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

export default HomeScreen
