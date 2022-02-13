// React/Redux
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// Components
import {
  Container,
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Grid,
  Box,
} from '@material-ui/core'
import Meta from '../components/Meta'
import Message from '../components/Message'
import Loader from '../components/Loader'
import StyledInput from '../components/StyledInput'
// Icons
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import useStyles from '../styles/MainStyleSheet'
// Actions
import { login } from '../actions/userActions'

const LoginScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ----- state variables ----- //
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [passVis, setPassVis] = useState('password')

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  // ----- function logs in user ----- //
  const submitHandler = (e) => {
    e.preventDefault()
    if (!email && !password) {
      setMessage('Please enter email and password')
    } else {
      setMessage('')
      dispatch(login(email, password))
    }
  }

  // ----- function makes password visible ----- //
  const showPassHandler = (e) => {
    e.preventDefault()
    if (passVis === 'password') {
      setPassVis('text')
    } else {
      setPassVis('password')
    }
  }

  // ----- useEffect hook ----- //
  useEffect(() => {
    if (userInfo) {
      navigate(`/`, { replace: true })
    }
    if (error) {
      setMessage(error)
    }
  }, [navigate, userInfo, error])

  return (
    <Box>
      <Meta title='Login' />
      {loading && <Loader />}

      <Grid
        container
        style={{ maxWidth: '30rem' }}
        className={classes.formCont}
        spacing={3}
      >
        <Grid item xs={12}>
          <Container maxWidth='sm' className={classes.imgCont}>
            <img
              src='/images/DuckyLogin.png'
              alt='loginLogo'
              width='100%'
              height='100%'
              layout='responsive'
            />
          </Container>
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
          ></StyledInput>
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
    </Box>
  )
}

export default LoginScreen
