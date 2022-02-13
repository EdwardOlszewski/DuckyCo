// React/Redux
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Components
import {
  Container,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Grid,
} from '@material-ui/core'
import useStyles from '../styles/MainStyleSheet'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import StyledInput from '../components/StyledInput'
// Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
// Actions
import { register } from '../actions/userActions'

export default function Register() {
  // Mui Style Sheet
  const classes = useStyles()
  const dispatch = useDispatch()
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
  const { loading, error, userInfo } = userRegister
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
  }, [history, userInfo, userLoggedIn, error])

  return (
    <>
      <Meta title='Register' />

      {loading && <Loader />}

      <Grid
        style={{ maxWidth: '30rem' }}
        container
        className={classes.formCont}
        spacing={3}
      >
        <Grid item xs={12}>
          <Container maxWidth='sm' className={classes.imgCont}>
            <img
              src='/images/DuckyLogin.png'
              alt='logo'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Container>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledInput
            label='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledInput
            label='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledInput
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledInput
            label='Password'
            type={passVis}
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
        </Grid>

        <Grid item xs={12}>
          <StyledInput
            label='Confirm Password'
            type={passVis}
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
