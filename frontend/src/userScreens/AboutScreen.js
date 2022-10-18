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
const useStyles = makeStyles((theme) => ({
  textContainer: {
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '55%',
    },
  },
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
      <Container maxWidth='lg' style={{ paddingBottom: '3rem' }}>
        <Grid container spacing={10} className={classes.root}>
          <Grid item xs={12}>
            <Container
              maxWidth='sm'
              style={{ textAlign: 'center', marginTop: '3rem' }}
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

          <Container className={classes.textContainer} maxWidth='false'>
            <Typography
              variant='h5'
              className={classes.text}
              style={{ textAlign: 'center', fontWeight: 500 }}
            >
              Ducky {'&'} Co. was founded in 2022.
            </Typography>

            <Typography
              variant='h6'
              className={classes.text}
              style={{ marginTop: '2rem', fontWeight: 400 }}
            >
              Ducky & Co. provides unique products that reflect embracing hard
              work and never giving up. We strive to pass those messages along
              with all those who join The Flock.
            </Typography>

            <Typography
              variant='h6'
              className={classes.text}
              style={{ marginTop: '2rem', fontWeight: 400 }}
            >
              The Ducky & Co. crew understands the mindset that is needed for
              hard work and not to give up based on our personal experiences. We
              are more than happy to help others achieve that mindset to better
              themselves. All of our products directly reflect what working hard
              and never giving up will lead you to in your lifetime. Grow with
              us.
            </Typography>
          </Container>
        </Grid>
      </Container>
    </PageWrapper>
  )
}

export default HomeScreen
