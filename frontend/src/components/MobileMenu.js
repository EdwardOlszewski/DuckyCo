import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { makeStyles, IconButton, Box } from '@material-ui/core'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import MenuIcon from '@material-ui/icons/Menu'

// Actions
import { logout } from '../actions/userActions'
//Icons
import {
  IoCartOutline,
  IoShirtOutline,
  IoNewspaperOutline,
} from 'react-icons/io5'
import { VscAccount } from 'react-icons/vsc'
import { CgLogOut } from 'react-icons/cg'
import { MdOutlinePhone } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
import { GoPackage } from 'react-icons/go'
import { BsChatRightDots, BsQuestionSquare } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  hamburgerIcon: {
    color: 'white',
    width: '5rem',
    height: '5rem',
  },
  btn: {
    color: '#222222',
    fontSize: '1.5rem',
  },
  icons: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 25,
    backgroundColor: '#7e7e7e',
    borderRadius: 100,
    padding: 5,
    color: '#111111',
  },
  iconBox: {
    marginTop: 10,
    margin: 'auto',
  },
}))

export default function MobileMenu({ userInfo }) {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [state, setState] = useState(false)

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role='presentation'
    >
      <List>
        <Link to='/gear' style={{ textDecoration: 'none' }}>
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <IoShirtOutline className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='Apparel' style={{ color: 'black' }} />
          </ListItem>
        </Link>

        <Link to='/cart' style={{ textDecoration: 'none' }}>
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <IoCartOutline className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='Cart' style={{ color: 'black' }} />
          </ListItem>
        </Link>

        {userInfo ? (
          <Link to='/profile' style={{ textDecoration: 'none' }}>
            <ListItem button onClick={toggleDrawer('left', false)}>
              <ListItemIcon>
                <VscAccount className={classes.btn} />
              </ListItemIcon>
              <ListItemText
                primary={userInfo.firstName}
                style={{ color: 'black' }}
              />
            </ListItem>
          </Link>
        ) : (
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <ListItem button onClick={toggleDrawer('left', false)}>
              <ListItemIcon>
                <VscAccount className={classes.btn} />
              </ListItemIcon>
              <ListItemText primary={'Login'} style={{ color: 'black' }} />
            </ListItem>
          </Link>
        )}

        <Link to='/about' style={{ textDecoration: 'none' }}>
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <IoNewspaperOutline className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='About' style={{ color: 'black' }} />
          </ListItem>
        </Link>

        <Link to='/contact' style={{ textDecoration: 'none' }}>
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <BsChatRightDots className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='Contact' style={{ color: 'black' }} />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        <a
          href='mailto:support@duckyandco.com'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <AiOutlineMail className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='support@ duckyandco.com' />
          </ListItem>
        </a>

        <a
          href='tel:+7082976672'
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <MdOutlinePhone className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='(708) 297-6672 ' />
          </ListItem>
        </a>
      </List>
      <Divider />

      {userInfo && (
        <ListItem button onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <CgLogOut className={classes.btn} />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      )}

      <Divider />
      <ListItem>
        <Box className={classes.iconBox}>
          <a href='https://www.facebook.com/Ducky-Co-111575008092973/?notif_id=1643729627265123&notif_t=page_fan&ref=notif'>
            <FaFacebookF className={classes.icons} />
          </a>
          <a href='https://www.instagram.com/ducky_and_co_/'>
            <TiSocialInstagram className={classes.icons} />
          </a>
        </Box>
      </ListItem>

      {userInfo && userInfo.isAdmin && (
        <>
          <Divider />
          <ListItem style={{ marginTop: '1rem' }}>
            <ListItemText
              primary='* ADMIN MENU *'
              style={{ color: '#eb5202' }}
            />
          </ListItem>

          <Link to='/admin/orderlist' style={{ textDecoration: 'none' }}>
            <ListItem button onClick={toggleDrawer('left', false)}>
              <ListItemIcon>
                <IoShirtOutline className={classes.btn} />
              </ListItemIcon>
              <ListItemText primary='Orders' style={{ color: '#eb5202' }} />
            </ListItem>
          </Link>

          <Link to='/admin/productlist' style={{ textDecoration: 'none' }}>
            <ListItem button onClick={toggleDrawer('left', false)}>
              <ListItemIcon>
                <GoPackage className={classes.btn} />
              </ListItemIcon>
              <ListItemText primary='Products' style={{ color: '#eb5202' }} />
            </ListItem>
          </Link>

          <Link to='/admin/userlist' style={{ textDecoration: 'none' }}>
            <ListItem button onClick={toggleDrawer('left', false)}>
              <ListItemIcon>
                <FiUsers className={classes.btn} />
              </ListItemIcon>
              <ListItemText primary='Users' style={{ color: '#eb5202' }} />
            </ListItem>
          </Link>

          <Link to='/admin/questionlist' style={{ textDecoration: 'none' }}>
            <ListItem button onClick={toggleDrawer('left', false)}>
              <ListItemIcon>
                <BsQuestionSquare className={classes.btn} />
              </ListItemIcon>
              <ListItemText primary='Questions' style={{ color: '#eb5202' }} />
            </ListItem>
          </Link>
        </>
      )}
    </div>
  )

  return (
    <Box key={'left'}>
      <IconButton
        onClick={toggleDrawer('left', true)}
        className={classes.hamburgerIcon}
        id='back-to-top-anchor'
      >
        <MenuIcon fontSize='large' />
      </IconButton>

      <SwipeableDrawer
        open={Boolean(state['left'])}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </Box>
  )
}
