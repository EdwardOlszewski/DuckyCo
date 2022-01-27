import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
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
import PageWrapper from '../components/PageWrapper'
import Loader from '../components/Loader'
import Message from '../components/Message'

// Types
import { USER_UPDATE_RESET } from '../types/userTypes'
// Actions
import { updateUserProfile, getUserDetails } from '../actions/userActions'

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
  const [severity, setSeverity] = useState('error')
  const [passVis, setPassVis] = useState('password')

  // Go to userDetails in state and pull out information
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails

  // Go to userLogin in state and pull out userInfo
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Go to userUpdateProfile in state and pull out success
  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: userUpdateLoading, success: updateSuccess } = userUpdate

  // Function to be called on submit
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPass) {
      setSeverity('error')
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          email,
          password,
        })
      )
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
    if (!userInfo) {
      history.push('/login')
    } else if (!user) {
      dispatch(getUserDetails('profile'))
    } else if (updateSuccess) {
      dispatch({ type: USER_UPDATE_RESET })
      dispatch(getUserDetails('profile'))
      setSeverity('success')
      setMessage('Profile Updated')
      setTimeout(() => {
        setMessage('')
      }, 1000)
    } else {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setEmail(user.email)
    }
  }, [history, dispatch, userInfo, user, updateSuccess, password, confirmPass])

  return (
    <PageWrapper title={'profile'}>
      {loading || (userUpdateLoading && <Loader />)}

      <Grid container className={classes.formCont} spacing={3}>
        <Grid item xs={12}>
          <Typography variant='h4'> User Profile</Typography>
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
          {message && <Message severity={severity}>{message}</Message>}
          <Button className={classes.Btn} onClick={submitHandler}>
            Update Profile
          </Button>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}
