import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { makeStyles, Hidden, IconButton, Box } from '@material-ui/core'
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
import { IoCartOutline, IoShirtOutline } from 'react-icons/io5'
import { VscAccount } from 'react-icons/vsc'
import { CgLogOut } from 'react-icons/cg'
import { MdOutlinePhone } from 'react-icons/md'
import { AiOutlineMail } from 'react-icons/ai'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  hamburgerIcon: {
    color: 'white',
    width: '4rem',
    height: '4rem',
  },
  btn: {
    color: '#222222',
    fontSize: '1.5rem',
  },
  icons: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 20,
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
        <Link to='/apparel' style={{ textDecoration: 'none' }}>
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
      </List>

      <Divider />

      <List>
        <a to='mailto:support@duckyandco.com'>
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <AiOutlineMail className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='support@ duckyandco.com' />
          </ListItem>
        </a>

        <a to='tel:+7082976672'>
          <ListItem button onClick={toggleDrawer('left', false)}>
            <ListItemIcon>
              <MdOutlinePhone className={classes.btn} />
            </ListItemIcon>
            <ListItemText primary='(708) 297-6672 ' />
          </ListItem>
        </a>
      </List>
      <Divider />

      <ListItem button onClick={() => dispatch(logout())}>
        <ListItemIcon>
          <CgLogOut className={classes.btn} />
        </ListItemIcon>
        <ListItemText primary='Logout' />
      </ListItem>

      <Divider />
      <ListItem button onClick={() => dispatch(logout())}>
        <Box className={classes.iconBox}>
          <FaFacebookF className={classes.icons} />
          <FaTwitter className={classes.icons} />
          <TiSocialInstagram className={classes.icons} />
        </Box>
      </ListItem>
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
