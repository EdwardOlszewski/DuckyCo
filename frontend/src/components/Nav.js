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
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core'

// Actions
import { logout } from '../actions/userActions'

// Icons
import { VscAccount } from 'react-icons/vsc'
import { IoCartOutline, IoShirtOutline } from 'react-icons/io5'
import { MdManageAccounts } from 'react-icons/md'
import { GoPackage } from 'react-icons/go'
import { CgLogOut } from 'react-icons/cg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '9rem',
    padding: '.5rem 5rem 0 5rem',
    boxShadow: 'none',
    backgroundColor: 'white',
    boxShadow:
      'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset',
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
    width: '8rem',
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

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <AppBar className={classes.root} position='sticky'>
      <Toolbar disableGutters>
        <Container className={classes.imgCont}>
          <img
            src='/images/DuckyLogo.png'
            width='150'
            height='120'
            layout='responsive'
          />
        </Container>

        <Box className={classes.btnBox}>
          <Link to='/' style={{ textDecoration: 'none' }}>
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
                startIcon={<VscAccount />}
                onClick={handleClick}
                className={classes.btn}
              >
                {userInfo.firstName + ' ' + userInfo.lastName}
              </Button>
              <StyledMenu
                id='customized-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to='/profile' style={{ textDecoration: 'none' }}>
                  <StyledMenuItem>
                    <MdManageAccounts className={classes.icon} />
                    <ListItemText primary='Profile' />
                  </StyledMenuItem>
                </Link>

                <StyledMenuItem>
                  <GoPackage className={classes.icon} />
                  <ListItemText primary='Orders' />
                </StyledMenuItem>

                <StyledMenuItem onClick={logoutHandler}>
                  <CgLogOut className={classes.icon} />
                  <ListItemText primary='Logout' />
                </StyledMenuItem>
              </StyledMenu>

              {userInfo.isAdmin && (
                <>
                  {' '}
                  <Button
                    startIcon={<VscAccount />}
                    onClick={handleClick}
                    className={classes.btn}
                  >
                    Admin
                  </Button>
                  <StyledMenu
                    id='customized-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                      <StyledMenuItem>
                        <MdManageAccounts className={classes.icon} />
                        <ListItemText primary='Profile' />
                      </StyledMenuItem>
                    </Link>

                    <StyledMenuItem>
                      <GoPackage className={classes.icon} />
                      <ListItemText primary='Orders' />
                    </StyledMenuItem>

                    <StyledMenuItem onClick={logoutHandler}>
                      <CgLogOut className={classes.icon} />
                      <ListItemText primary='Logout' />
                    </StyledMenuItem>
                  </StyledMenu>
                </>
              )}
            </>
          ) : (
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <Button
                startIcon={<VscAccount />}
                onClick={handleClick}
                className={classes.btn}
              >
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
