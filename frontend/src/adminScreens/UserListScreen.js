// React/Redux
import { useEffect, useState } from 'react'
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
import Message from '../components/Message'
import Loader from '../components/Loader'
import Pagination from '@mui/material/Pagination'

// Icons
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { ImCross, ImCheckmark } from 'react-icons/im'

// Actions
import { listUsers, deleteUser } from '../actions/userActions'
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
    padding: '1rem',
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
    backgroundColor: '#1e2a5a',
    color: 'white',
    boxShadow:
      ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    '&:hover': {
      backgroundColor: '#374da4',
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

const UserListScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const pageNumber = useParams().pageNumber || 1

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  // ----- Function called on delete ----- //
  const deleteHandler = (id, firstName, lastName) => {
    if (
      window.confirm(`Are you sure you want to delete ${firstName} ${lastName}`)
    ) {
      dispatch(deleteUser(id))
    }
  }

  // ----- useEffect Hook ----- //
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      navigate('/login', { replace: true })
    }
  }, [dispatch, navigate, userInfo, successDelete])

  return (
    <PageWrapper title={'ADMIN user list'}>
      <Typography variant='h3' className={classes.title}>
        Users
      </Typography>

      {loading ? (
        <Loader />
      ) : (
        <TableContainer className={classes.root}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>ID</StyledTableCell>
                <StyledTableCell align='center'>NAME</StyledTableCell>
                <StyledTableCell align='center'>EMAIL</StyledTableCell>
                <StyledTableCell align='center'>ADMIN</StyledTableCell>
                <StyledTableCell align='center'>OPTIONS</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users &&
                users.map((user) => (
                  <StyledTableRow hover key={user._id}>
                    <StyledTableCell align='center'>{user._id}</StyledTableCell>
                    <StyledTableCell align='center'>
                      {user.firstName} {user.lastName}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {user.isAdmin ? (
                        <ImCheckmark style={{ color: '#007E33' }} />
                      ) : (
                        <ImCross style={{ color: '#CC0000' }} />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <FaTrashAlt
                        className={classes.trashBtn}
                        onClick={() =>
                          deleteHandler(user._id, user.firstName, user.lastName)
                        }
                      />
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

            <></>
          </Box>
        </TableContainer>
      )}
    </PageWrapper>
  )
}

export default UserListScreen
