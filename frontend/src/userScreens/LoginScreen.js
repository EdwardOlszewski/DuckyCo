import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  FormControl,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
} from '@material-ui/core'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import useStyles from '../styles/MainStyleSheet'

// Actions
import { login } from '../actions/userActions'

// Components
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'

export default function Signin() {
  // Mui Style Sheet
  const classes = useStyles()
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()
  // Init history for redirect
  const history = useNavigate()

  // Declare new state variables using useState hook
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [passVis, setPassVis] = useState('password')

  // Go to the state and pull out information from userLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // Function to be called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (!email && !password) {
      setMessage('Please enter email and password')
    } else {
      setMessage('')
      dispatch(login(email, password))
    }
  }

  // Function to show password
  const showPassHandler = (e) => {
    e.preventDefault()
    if (passVis === 'password') {
      setPassVis('text')
    } else {
      setPassVis('password')
    }
  }

  // useEffect hook called after render
  useEffect(() => {
    if (userInfo) {
      history('/')
    }
    if (error) {
      setMessage(error)
    }
  }, [history, userInfo, error])

  return (
    <>
      <Meta title='Login' />
      {loading && <Loader />}
      <Grid container className={classes.formCont} spacing={3}>
        <Grid item xs={12}>
          <Container maxWidth='sm' className={classes.imgCont}>
            <img
              src='/images/DuckyLogo.png'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Container>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.form}>
            <TextField
              id='outlined-basic'
              label='Email'
              type='email'
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.form}>
            <TextField
              className={classes.txtField}
              id='outlined-multiline-flexible'
              label='Password'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={passVis}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={showPassHandler}
                      edge='end'
                    >
                      {passVis === 'password' ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          {message && <Message severity='error'>{message}</Message>}

          <Button className={classes.Btn} onClick={submitHandler}>
            Login
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.newUse}>
            Dont Have An Account?
          </Typography>
          <Link to='/register'>
            <Typography className={classes.signUp}> Register </Typography>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}
