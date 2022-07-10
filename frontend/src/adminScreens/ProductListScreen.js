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
  Grid,
  Container,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Pagination from '@mui/material/Pagination'

// Icons
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { ImCross, ImCheckmark } from 'react-icons/im'

// Actions
import { PRODUCT_CREATE_RESET } from '../types/productTypes'
import {
  createProduct,
  listProducts,
  deleteProduct,
} from '../actions/productActions'

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
    width: '100%',
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
  tableButton: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const ProductListScreen = () => {
  // Mui Style Sheet
  const classes = useStyles()
  // Init dispatch
  const dispatch = useDispatch()
  // Init navigate for redirect
  const navigate = useNavigate()
  // Get keyword from the URL
  const keyword = useParams().keyword

  // Get the user information from redux
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // Go to the productList in the state and pull out information
  const productList = useSelector((state) => state.productList)
  const { loading, success, products, pages } = productList

  // Go to the productCreate in the state and pull out information
  const productCreate = useSelector((state) => state.productCreate)
  const {
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  // Go to the productDelete in the state and pull out information
  const productDelete = useSelector((state) => state.productDelete)
  const { success: successDelete } = productDelete

  // Function to be called on create submit
  const createProductHandler = () => {
    dispatch(createProduct())
  }

  // Function to be called on delete submit
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const handlePageChange = (e, value) => {
    navigate(`/admin/productlist/${value}`, { replace: true })
  }

  useEffect(() => {
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`, { replace: true })
      dispatch({ type: PRODUCT_CREATE_RESET })
    } else {
      dispatch(listProducts(keyword))
    }
  }, [
    navigate,
    successDelete,
    userInfo,
    successCreate,
    createdProduct,
    keyword,
  ])

  return (
    <PageWrapper title={'ADMIN product list'}>
      <Typography variant='h3' className={classes.title}>
        Products
      </Typography>

      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth='xl'>
          <Grid container spacing={1}>
            <Grid item xs={12} md={2}>
              <TableContainer>
                <Table aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>Options</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>All</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Retired`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Retired</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/MISC`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>MISC</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Hat`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Hats</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Shirt`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Shirts</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Tanktop`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Tanktops</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Short`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Shorts</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Crewneck`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Crewneckss</Typography>
                      </StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow hover>
                      <StyledTableCell
                        align='center'
                        className={classes.tableButton}
                        onClick={() =>
                          navigate(`/admin/productlist/search/Hoodie`, {
                            replace: true,
                          })
                        }
                      >
                        <Typography variant='button'>Hoodies</Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} md={10}>
              <TableContainer className={classes.root}>
                <Table className={classes.table} aria-label='customized table'>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align='center'>Image</StyledTableCell>
                      <StyledTableCell align='center'>Name</StyledTableCell>
                      <StyledTableCell align='center'>Price</StyledTableCell>
                      <StyledTableCell align='center'>Category</StyledTableCell>
                      <StyledTableCell align='center'>
                        Published
                      </StyledTableCell>
                      <StyledTableCell align='center'>Options</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {success &&
                      products.map((product) => (
                        <StyledTableRow hover key={product._id}>
                          <StyledTableCell align='center'>
                            <img
                              src={product.image}
                              alt={product.image}
                              width='80rem'
                              height='80rem'
                            />
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {product.name}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            ${product.price.toFixed(2)}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {product.category}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            {product.isPublished ? (
                              <ImCheckmark style={{ color: '#007E33' }} />
                            ) : (
                              <ImCross style={{ color: '#CC0000' }} />
                            )}
                          </StyledTableCell>
                          <StyledTableCell align='center'>
                            <Link to={`/admin/product/${product._id}/edit`}>
                              <FaEdit className={classes.editBtn} />
                            </Link>

                            <FaTrashAlt
                              className={classes.trashBtn}
                              onClick={() => deleteHandler(product._id)}
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
                  >
                    {errorCreate && (
                      <Message severity={'error'}>{errorCreate}</Message>
                    )}
                  </Box>

                  <>
                    <Pagination
                      count={pages}
                      page={parseInt(1)}
                      shape='rounded'
                      onChange={handlePageChange}
                    />
                  </>

                  <Button
                    style={{ backgroundColor: '#007E33' }}
                    className={classes.btn}
                    onClick={createProductHandler}
                  >
                    Create Product
                  </Button>
                </Box>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      )}
    </PageWrapper>
  )
}

export default ProductListScreen
