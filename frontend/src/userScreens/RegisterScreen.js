import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import useStyles from '../styles/MainStyleSheet'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'

// Components
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'

// Actions
import { register } from '../actions/userActions'

export default function Register() {
  // Mui Style Sheet
  const classes = useStyles()
  // Assign useDispatch hook to dispatch actions
  const dispatch = useDispatch()
  // Init history for redirect
  const history = useNavigate()

  // Declare new state variables using useState hook
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [message, setMessage] = useState('')
  const [passVis, setPassVis] = useState('password')

  // Go to userRegister in the state and pull out information
  const userRegister = useSelector((state) => state.userRegister)
  const { success, loading, error, userInfo } = userRegister

  // Go to the state and pull out information from userLogin
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo: userLoggedIn } = userLogin

  // Function to be called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(firstName, lastName, email, password))
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
    if (userInfo || userLoggedIn) {
      history('/')
    }
    if (error) {
      setMessage(error)
    }
  }, [history, userInfo, error])

  return (
    <>
      <Meta title='Register' />

      {loading && <Loader />}

      <Grid container className={classes.formCont} spacing={3}>
        <Grid item xs={12}>
          <Container maxWidth='sm' className={classes.imgCont}>
            <img
              src='/images/DuckyLogo.png'
              alt='logo'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.form}>
            <TextField
              inputProps={{
                className: classes.input,
              }}
              id='outlined-basic'
              label='First Name'
              variant='outlined'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={classes.form}>
            <TextField
              inputProps={{
                className: classes.input,
              }}
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl className={classes.form}>
            <TextField
              inputProps={{
                className: classes.input,
              }}
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
              inputProps={{
                className: classes.input,
              }}
              id='outlined-basic'
              label='Password'
              type={passVis}
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <FormControl className={classes.form}>
            <TextField
              inputProps={{
                className: classes.input,
              }}
              id='outlined-basic'
              label='Confirm Password'
              type={passVis}
              variant='outlined'
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
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
            Register
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.newUse}>
            Already Have An Account?
          </Typography>
          <Link to='/login'>
            <Typography className={classes.signUp}> Log In </Typography>
          </Link>
        </Grid>
      </Grid>
    </>
  )
}
