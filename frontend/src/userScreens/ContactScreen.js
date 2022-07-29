// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Components
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
  Box,
} from '@material-ui/core'
import StyledInput from '../components/StyledInput'
import PageWrapper from '../components/PageWrapper'
import Loader from '../components/Loader'
import Message from '../components/Message'
// Actions
import { createQuestionAction } from '../actions/questionActions'
//Types
import { QUESTION_CREATE_RESET } from '../types/questionTypes'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '6rem',
  },
  text: {
    paddingTop: '5rem',
  },
  title: {
    paddingTop: '2rem',
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  contactText: {
    fontWeight: 300,
    marginTop: '3rem',
    paddingLeft: 3,
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  btn: {
    padding: '1rem',
    backgroundColor: '#1e2a5a',
    color: 'white',

    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },

    '&:hover': {
      backgroundColor: '#374da4',
    },
  },
}))

const HomeScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

  // ----- state variables ----- //
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [customError, setError] = useState('')
  const [customSuccess, setCustomSuccess] = useState('')

  // ----- get data from redux store ----- //
  const createQuestion = useSelector((state) => state.createQuestion)
  const { loading, success, error } = createQuestion

  const submitQuestionHandler = () => {
    if (!firstName || !lastName || !email || !message) {
      setError('Please fill out the whole form.')
      console.log('worked')
    } else {
      dispatch(createQuestionAction(firstName, lastName, email, message))
      setError('')
    }
  }

  // ----- useEffect hook ----- //
  useEffect(() => {
    if (success) {
      setCustomSuccess('Question Submitted')
      setFirstName('')
      setLastName('')
      setEmail('')
      setMessage('')
    }
  }, [success])

  return (
    <PageWrapper>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth='lg' className={classes.root}>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <Typography variant='h3' className={classes.title}>
                Contact Us
              </Typography>

              <Typography variant='h6' className={classes.contactText}>
                Need to get in touch with us? Fill out the form or
                <br />
                email us at{' '}
                <a
                  style={{
                    textDecoration: 'none',
                    color: '#f0491c',
                    fontWeight: 400,
                  }}
                  href='mailto:support@duckyandco.com'
                >
                  support@duckyandco.com
                </a>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} style={{ paddingTop: '4rem' }}>
              {success ? (
                <Box style={{ padding: '1rem' }}>
                  <Message severity='success'>{customSuccess}</Message>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <StyledInput
                      label='First Name'
                      type='firstName'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></StyledInput>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <StyledInput
                      label='Last Name'
                      type='lastName'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></StyledInput>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledInput
                      label='Email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></StyledInput>
                  </Grid>
                  <Grid item xs={12}>
                    <StyledInput
                      multiline
                      rows={6}
                      label='What can we help you with?'
                      type='message'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></StyledInput>
                  </Grid>
                  <Grid item xs={12}>
                    {customError && (
                      <Box style={{ paddingBottom: '1rem' }}>
                        <Message severity='error'>{customError}</Message>
                      </Box>
                    )}
                    <Button
                      className={classes.btn}
                      onClick={submitQuestionHandler}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Container>
      )}
    </PageWrapper>
  )
}

export default HomeScreen
