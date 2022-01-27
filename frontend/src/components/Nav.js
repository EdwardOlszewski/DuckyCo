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
} from '@material-ui/core'

// Actions
import { logout } from '../actions/userActions'

// Icons
import { VscAccount } from 'react-icons/vsc'
import { IoCartOutline, IoShirtOutline, IoSettings } from 'react-icons/io5'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { GoPackage } from 'react-icons/go'
import { CgLogOut } from 'react-icons/cg'
import { GrUserSettings } from 'react-icons/gr'
import { FiUsers } from 'react-icons/fi'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '7.5rem',
    padding: '.5rem 5rem 0 5rem',
    boxShadow: 'none',
    backgroundColor: 'white',
  },
  imgCont: {
    textAlign: 'left',
    width: '250px',
    height: '100px',
  },

  // menu buttons
  btnBox: {
    flexGrow: 1,
    textAlign: 'right',
    marginTop: '1rem',
  },
  btn: {
    textAlign: 'center',
    color: 'black',
    fontSize: '1rem',
    marginLeft: 20,
    '&:hover': {
      backgroundColor: 'white',
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

const ResponsiveAppBar = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [anchorEl2, setAnchorEl2] = useState(null)
  const open2 = Boolean(anchorEl2)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <AppBar className={classes.root} position='sticky'>
      <Toolbar disableGutters>
        <Container className={classes.imgCont}>
          <img
            src='/images/DuckyLogo.png'
            alt='Duckylogo'
            width='120'
            height='100'
            layout='responsive'
          />
        </Container>

        <Box className={classes.btnBox}>
          <Link to='/apparel' style={{ textDecoration: 'none' }}>
            <Button startIcon={<IoShirtOutline />} className={classes.btn}>
              Apparel
            </Button>
          </Link>

          <Button startIcon={<IoCartOutline />} className={classes.btn}>
            Cart
          </Button>

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

                <StyledMenuItem>
                  <GoPackage className={classes.icon} />
                  <ListItemText primary='Orders' />
                </StyledMenuItem>

                <Divider />

                <StyledMenuItem onClick={logoutHandler}>
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

                    <StyledMenuItem>
                      <GoPackage className={classes.icon} />
                      <ListItemText primary='Orders' />
                    </StyledMenuItem>

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
      </Toolbar>
    </AppBar>
  )
}
export default ResponsiveAppBar
