// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

// Components
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  Menu,
  withStyles,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core'
import PageWrapper from '../components/PageWrapper'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

// Actions
import { addToCart } from '../actions/cartActions'

// Icons
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    marginTop: '4rem',
    width: '70%',
  },
  divider: {
    backgroundColor: '#f2f2f2',
    width: '90%',
    margin: 'auto',
    marginTop: '1rem',
    marginBottom: '1rem',
    boxShadow: 'rgba(0, 0, 0, 0.04) 0px 3px 5px',
  },
  text: {
    fontSize: '1.2rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2rem',
    },
  },
  subText: {
    fontWeight: 1,
    fontSize: '1rem',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2rem',
    },
  },
  select: { marginTop: -3, marginLeft: 5, border: 'none' },
  orderSum: {
    textAlign: 'center',
    margin: 'auto',
  },
  removeBtnBox: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '2rem',
      marginTop: '2rem',
    },
  },
  removeBtn: {},
}))

//Menu Style
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '6rem',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem)

export default function ApparelScreen() {
  // Mui Style Sheet
  const classes = useStyles()
  // Init dispatch
  const dispatch = useDispatch()
  // Go to the cart in the state and select the cartItems
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const [newQty, setNewQty] = useState(1)
  const [newSize, setNewSize] = useState('sm')

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [anchorEl2, setAnchorEl2] = useState(null)
  const open2 = Boolean(anchorEl2)

  // useEffect hook to do something
  useEffect(() => {}, [addToCart])

  return (
    <PageWrapper title={'Apparel'}>
      <Grid container className={classes.root}>
        <Grid container xs={12} md={7}>
          {cartItems.map((product) => (
            <Grid container style={{ marginTop: '2rem' }}>
              <Grid item xs={12} md={4} style={{ textAlign: 'right' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  width={'100%'}
                  height={'100%'}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant='h5' className={classes.text}>
                  {product.name}
                </Typography>
                <Typography className={classes.text}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant='h6' className={classes.subText}>
                  Size:
                  <FormControl className={classes.formControl}>
                    <Select
                      disableUnderline
                      className={classes.select}
                      native
                      value={product.size}
                      onChange={(e) =>
                        dispatch(
                          addToCart(
                            product.product,
                            product.quantity,
                            e.target.value
                          )
                        )
                      }
                    >
                      <option value={'small'}>small</option>
                      <option value={'medium'}>medium</option>
                      <option value={'large'}>large</option>
                      <option value={'xlarge'}>xlarge</option>
                    </Select>
                  </FormControl>
                </Typography>

                <Typography variant='h6' className={classes.subText}>
                  Quantity:
                  <Select
                    disableUnderline
                    className={classes.select}
                    native
                    value={product.quantity}
                    onChange={(e) =>
                      dispatch(
                        addToCart(product.product, e.target.value, product.size)
                      )
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </Select>
                </Typography>

                <Box className={classes.removeBtnBox}>
                  <Button className={classes.removeBtn}> Remove</Button>
                </Box>
              </Grid>
              <Divider className={classes.divider} />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          xs={12}
          md={5}
          style={{
            marginTop: '1rem',
          }}
        >
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant='h4'>Order Summary</Typography>
            </Grid>

            <Grid container style={{ paddingTop: '1rem' }}>
              <Grid item xs={10}>
                <Typography variant='h5'>Subtotal</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='h6'>$0.00</Typography>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: '1rem' }}>
              <Grid item xs={10}>
                <Typography variant='h5'>Shipping</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant='h6'>$0.00</Typography>
              </Grid>
            </Grid>

            <Divider style={{ marginTop: '1rem' }} />
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant='h5'>Total</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant='h6'>$0.00</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider />
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

/*
<Button
                    style={{ color: '#eb5202' }}
                    startIcon={<IoSettings />}
                    onClick={(e) => setAnchorEl2(e.currentTarget)}
                    className={classes.btn}
                    endIcon={anchorEl2 ? <MdExpandLess /> : <MdExpandMore />}
                  >
                    Admin
                  </Button>
*/
