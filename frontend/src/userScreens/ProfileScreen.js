// React/Redux
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
// Components
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@material-ui/core'
import useStyles from '../styles/MainStyleSheet'
import PageWrapper from '../components/PageWrapper'
import Loader from '../components/Loader'
import Message from '../components/Message'
import StyledInput from '../components/StyledInput'
import { StyledTableCell, StyledTableRow } from '../components/StyledTable'
import DateFormat from '../components/DateFormat'
// Icons
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { ImCross, ImCheckmark } from 'react-icons/im'
// Types
import { USER_UPDATE_RESET } from '../types/userTypes'
// Actions
import { updateUserProfile, getUserDetails } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useNavigate()

  // ----- state variables ----- //
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('error')
  const [passVis, setPassVis] = useState('password')

  // ----- get data from redux store ----- //
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loading: userUpdateLoading, success: updateSuccess } = userUpdate

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, orders } = orderListMy

  // ----- function changes users password ----- //
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

  // ----- function sets password visibility ----- //
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
    if (!userInfo) {
      history.push('/login')
    } else if (!user) {
      dispatch(listMyOrders())
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
  }, [history, dispatch, userInfo, user, updateSuccess])

  return (
    <PageWrapper title={'profile'}>
      {(loading || userUpdateLoading || loadingOrders) && <Loader />}

      <Grid container className={classes.profileCont} spacing={5}>
        <Grid container xs={12} lg={2} spacing={3}>
          <Typography
            variant='h4'
            style={{ margin: 'auto', textAlign: 'center', padding: '1rem' }}
          >
            User Profile
          </Typography>
          <Grid item xs={12}>
            <StyledInput
              label='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledInput
              label='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <StyledInput
              label='Email'
              type='email'
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
            {message && <Message severity={severity}>{message}</Message>}
            <Button className={classes.Btn} onClick={submitHandler}>
              Update Profile
            </Button>
          </Grid>
        </Grid>

        {/* ---------- Order Table ---------- */}

        <Grid item xs={12} md={10}>
          <Typography
            variant='h4'
            style={{ textAlign: 'center', marginBottom: '.8rem' }}
          >
            My Orders
          </Typography>
          <TableContainer className={classes.root}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Id</StyledTableCell>
                  <StyledTableCell align='center'>Date</StyledTableCell>
                  <StyledTableCell align='center'>Total</StyledTableCell>
                  <StyledTableCell align='center'>Shipped</StyledTableCell>
                  <StyledTableCell align='center'>options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order) => (
                    <StyledTableRow hover key={order._id}>
                      <StyledTableCell align='center'>
                        {order._id}
                      </StyledTableCell>

                      <StyledTableCell align='center'>
                        {DateFormat(order.createdAt)}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        ${order.totalPrice}
                      </StyledTableCell>

                      <StyledTableCell align='center'>
                        {order.isDelivered ? (
                          <ImCheckmark style={{ color: '#007E33' }} />
                        ) : (
                          <ImCross style={{ color: '#CC0000' }} />
                        )}
                      </StyledTableCell>
                      <StyledTableCell align='center'>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/order/${order._id}`}
                        >
                          <Button className={classes.btn}>Details</Button>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>

            <Box className={classes.btnBox}>
              <Box
                style={{
                  display: 'inline-block',
                  marginRight: '3rem',
                }}
              ></Box>
            </Box>
          </TableContainer>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default ProfileScreen
