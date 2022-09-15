// React/Redux
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  makeStyles,
  Typography,
  Button,
  Box,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import DateFormat from '../components/DateFormat'
import Loader from '../components/Loader'
import Pagination from '@mui/material/Pagination'
// Icons
import { ImCross, ImCheckmark } from 'react-icons/im'
// Types
import { ORDER_DELIVER_RESET } from '../types/orderTypes'
// Actions
import { listOrders } from '../actions/orderActions'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1e2a5a',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#fcfcfc',
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  // Container
  root: {
    margin: 'auto',
    width: '90%',
  },

  // Title
  title: {
    textAlign: 'center',
    padding: '2rem',
  },

  // Table
  table: {
    minWidth: 700,
  },

  // Buttons
  btnBox: {
    marginTop: '1rem',
    textAlign: 'right',
    margin: 'auto',
  },
  btn: {
    borderRadius: 0,
    padding: '1rem',
    backgroundColor: '#007E33',
    color: 'white',
    boxShadow:
      ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },
  editBtn: {
    paddingRight: 10,
    fontSize: '1.5rem',
    color: '#343a40',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  trashBtn: {
    fontSize: '1.5rem',
    color: '#CC0000',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const OrderListScreen = () => {
  // ----- init variables ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pageNumber = useParams().pageNumber || 1

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector((state) => state.orderList)
  const { loading, success, error, orders } = orderList

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  // ----- useEffect hook ----- //
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate(`/`, { replace: true })
    } else if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET })
    } else {
      dispatch(listOrders())
    }
  }, [navigate, userInfo, pageNumber, successDeliver])

  return (
    <PageWrapper title={'ADMIN order list'}>
      <Typography variant='h3' className={classes.title}>
        Orders Not Shipped
      </Typography>

      {loading ? (
        <Loader />
      ) : (
        <>
          <TableContainer className={classes.root}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Id</StyledTableCell>
                  <StyledTableCell align='center'>User</StyledTableCell>
                  <StyledTableCell align='center'>Email</StyledTableCell>
                  <StyledTableCell align='center'>Date</StyledTableCell>
                  <StyledTableCell align='center'>Total</StyledTableCell>
                  <StyledTableCell align='center'>Shipped</StyledTableCell>
                  <StyledTableCell align='center'>options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {success &&
                  orders
                    .filter((order) => order.isDelivered == false)
                    .map((filteredOrder) => (
                      <StyledTableRow hover key={filteredOrder._id}>
                        <StyledTableCell align='center'>
                          {filteredOrder._id}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {filteredOrder.user.firstName}{' '}
                          {filteredOrder.user.lastName}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {filteredOrder.user.email.toLowerCase()}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {DateFormat(filteredOrder.createdAt)}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          ${filteredOrder.totalPrice.toFixed(2)}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {filteredOrder.isDelivered ? (
                            <ImCheckmark style={{ color: '#007E33' }} />
                          ) : (
                            <ImCross style={{ color: '#CC0000' }} />
                          )}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/order/${filteredOrder._id}`}
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

              <>
                <Pagination
                  count={1}
                  page={parseInt(pageNumber)}
                  shape='rounded'
                />
              </>
            </Box>
          </TableContainer>

          <Typography
            variant='h3'
            className={classes.title}
            style={{ marginTop: '5rem' }}
          >
            Shipped Orders
          </Typography>
          <TableContainer className={classes.root}>
            <Table className={classes.table} aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Id</StyledTableCell>
                  <StyledTableCell align='center'>User</StyledTableCell>
                  <StyledTableCell align='center'>Email</StyledTableCell>
                  <StyledTableCell align='center'>Date</StyledTableCell>
                  <StyledTableCell align='center'>Total</StyledTableCell>
                  <StyledTableCell align='center'>Shipped</StyledTableCell>
                  <StyledTableCell align='center'>options</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {success &&
                  orders
                    .filter((order) => order.isDelivered == true)
                    .map((filteredOrder) => (
                      <StyledTableRow hover key={filteredOrder._id}>
                        <StyledTableCell align='center'>
                          {filteredOrder._id}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {filteredOrder.user.firstName}{' '}
                          {filteredOrder.user.lastName}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {filteredOrder.user.email.toLowerCase()}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          {DateFormat(filteredOrder.createdAt)}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          ${filteredOrder.totalPrice.toFixed(2)}
                        </StyledTableCell>

                        <StyledTableCell align='center'>
                          {filteredOrder.isDelivered ? (
                            <ImCheckmark style={{ color: '#007E33' }} />
                          ) : (
                            <ImCross style={{ color: '#CC0000' }} />
                          )}
                        </StyledTableCell>
                        <StyledTableCell align='center'>
                          <Link
                            style={{ textDecoration: 'none' }}
                            to={`/order/${filteredOrder._id}`}
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

              <>
                <Pagination
                  count={1}
                  page={parseInt(pageNumber)}
                  shape='rounded'
                />
              </>
            </Box>
          </TableContainer>
        </>
      )}
    </PageWrapper>
  )
}

export default OrderListScreen
