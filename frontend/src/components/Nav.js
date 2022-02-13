// React
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Components
import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  ListItemText,
  withStyles,
  Divider,
  Hidden,
} from '@material-ui/core'
import MobileNav from '../components/MobileMenu'
// Icons
import { VscAccount } from 'react-icons/vsc'
import { IoCartOutline, IoShirtOutline, IoSettings } from 'react-icons/io5'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { GoPackage } from 'react-icons/go'
import { CgLogOut } from 'react-icons/cg'
import { GrUserSettings } from 'react-icons/gr'
import { FiUsers } from 'react-icons/fi'
// Actions
import { logout } from '../actions/userActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    height: '9rem',
    boxShadow: 'none',
    backgroundColor: '#272829',
    color: 'white',
    [theme.breakpoints.up('xs')]: {
      padding: '0 2rem 0 0',
    },
    [theme.breakpoints.up('sm')]: {
      padding: '0 5rem 0 5rem',
    },
  },
  imgCont: {
    width: '200px',
    height: '200px',
    marginTop: 5,
  },

  // menu buttons
  btnBox: {
    flexGrow: 1,
    textAlign: 'right',
  },
  btn: {
    textAlign: 'center',
    color: 'white',
    fontSize: '1rem',
    marginLeft: 20,
    '&:hover': {
      backgroundColor: 'rgb(0,0,0,0)',
      color: '#a2a2a2',
      borderRadius: 0,
    },
  },
  icon: {
    fontSize: '1.5rem',
    paddingRight: '1rem',
  },
}))

//Menu Style
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '9rem',
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

const Nav = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()

  // ----- state variables ----- //
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [anchorEl2, setAnchorEl2] = useState(null)
  const open2 = Boolean(anchorEl2)

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <AppBar className={classes.root} position='sticky'>
      <Toolbar disableGutters>
        <Hidden mdUp>
          <Container className={classes.imgCont}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <img
                src='/images/Logo2.svg'
                alt='Duckylogo'
                width='100%'
                height='100%'
                layout='responsive'
              />
            </Link>
          </Container>
        </Hidden>

        <Hidden smDown>
          <Container className={classes.imgCont}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <img
                src='/images/Logo2.svg'
                alt='Duckylogo'
                width='100%'
                height='100%'
                layout='responsive'
              />
            </Link>
          </Container>
        </Hidden>

        <Hidden smDown>
          <Box className={classes.btnBox}>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <Button startIcon={<IoShirtOutline />} className={classes.btn}>
                Apparel
              </Button>
            </Link>

            <Link to='/cart' style={{ textDecoration: 'none' }}>
              <Button startIcon={<IoCartOutline />} className={classes.btn}>
                Cart
              </Button>
            </Link>

            {userInfo ? (
              <>
                <Button
                  id='user-btn'
                  startIcon={<VscAccount />}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  className={classes.btn}
                  endIcon={anchorEl ? <MdExpandLess /> : <MdExpandMore />}
                >
                  {userInfo.firstName}
                </Button>
                <StyledMenu
                  id='customized-menu'
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  <Link
                    to='/profile'
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <StyledMenuItem>
                      <GrUserSettings className={classes.icon} />
                      <ListItemText primary='Profile' />
                    </StyledMenuItem>
                  </Link>

                  <Divider />

                  <StyledMenuItem onClick={() => dispatch(logout())}>
                    <CgLogOut className={classes.icon} />
                    <ListItemText primary='Logout' />
                  </StyledMenuItem>
                </StyledMenu>

                {userInfo.isAdmin && (
                  <>
                    <Button
                      style={{ color: '#eb5202' }}
                      startIcon={<IoSettings />}
                      onClick={(e) => setAnchorEl2(e.currentTarget)}
                      className={classes.btn}
                      endIcon={anchorEl2 ? <MdExpandLess /> : <MdExpandMore />}
                    >
                      Admin
                    </Button>
                    <StyledMenu
                      id='customized-menu2'
                      anchorEl={anchorEl2}
                      keepMounted
                      open={open2}
                      onClose={() => setAnchorEl2(null)}
                    >
                      <Link
                        to='/admin/productlist'
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <StyledMenuItem>
                          <IoShirtOutline className={classes.icon} />
                          <ListItemText primary='Products' />
                        </StyledMenuItem>
                      </Link>

                      <Link
                        to='/admin/orderlist'
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <StyledMenuItem>
                          <GoPackage className={classes.icon} />
                          <ListItemText primary='Orders' />
                        </StyledMenuItem>
                      </Link>

                      <StyledMenuItem>
                        <FiUsers className={classes.icon} />
                        <ListItemText primary='Users' />
                      </StyledMenuItem>
                    </StyledMenu>
                  </>
                )}
              </>
            ) : (
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <Button startIcon={<VscAccount />} className={classes.btn}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Box className={classes.btnBox}>
            <MobileNav userInfo={userInfo} />
          </Box>
        </Hidden>
      </Toolbar>
    </AppBar>
  )
}
export default Nav
