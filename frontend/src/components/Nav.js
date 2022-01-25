import {
  Button,
  AppBar,
  Box,
  Toolbar,
  Container,
  makeStyles,
} from '@material-ui/core'
import { VscAccount } from 'react-icons/vsc'
import { IoCartOutline, IoShirtOutline } from 'react-icons/io5'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100px',
    padding: '2rem 5rem 0 5rem',
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
  },
  btn: {
    textAlign: 'center',
    color: 'black',
    fontSize: '1.2rem',
    marginLeft: 20,
    '&:hover': {
      backgroundColor: 'white',
      color: '#a2a2a2',
      borderRadius: 0,
    },
  },
}))

const ResponsiveAppBar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.root} position='static'>
      <Toolbar disableGutters>
        <Container className={classes.imgCont}>
          <img
            src='/images/DuckyLogo.png'
            width='220'
            height='170'
            layout='responsive'
          />
        </Container>

        <Box className={classes.btnBox}>
          <Button startIcon={<IoShirtOutline />} className={classes.btn}>
            Apparel
          </Button>

          <Button startIcon={<IoCartOutline />} className={classes.btn}>
            Cart
          </Button>
          <Button startIcon={<VscAccount />} className={classes.btn}>
            Edward Olszewski
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default ResponsiveAppBar
