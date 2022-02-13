// React/Redux
import {
  Box,
  Typography,
  Grid,
  Container,
  Divider,
  makeStyles,
  Hidden,
} from '@material-ui/core'
// Icons
import { FaFacebookF } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#272829',
    display: 'flex',
    minHeight: '23vh',
    flexDirection: 'column',
  },
  cont: {
    marginTop: 50,
    color: 'white',
    textAlign: 'center',
  },

  //Connect
  connectBox: {
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
      textAlign: 'left',
    },
  },

  //Icons
  iconBox: {
    textAlign: 'center',
  },
  icons: {
    fontSize: 35,
    backgroundColor: '#7e7e7e',
    borderRadius: 100,
    color: '#111111',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5f5f5f',
    },

    [theme.breakpoints.up('xs')]: {
      padding: 5,
      marginLeft: 20,
      marginRight: 20,
    },
    [theme.breakpoints.up('md')]: {
      padding: 5,
      marginLeft: 40,
    },
  },

  //Divider
  divider: {
    marginTop: 50,
    backgroundColor: '#2f2f2f',
    width: '90%',
    textAlign: 'center',
    margin: 'auto',
  },

  //Copyright
  copyright: {
    color: '#5b5b5b',
    textAlign: 'center',
    padding: '2rem',
  },
}))

const Footer = () => {
  // ----- init ----- //
  const classes = useStyles()
  const currentYear = new Date()

  return (
    <Box className={classes.root}>
      <Container className={classes.cont} maxWidth='xl'>
        <Grid container>
          <Hidden smDown>
            <Grid item xs={12} md={6}>
              <Box className={classes.connectBox}>
                <Typography variant='h4'>Connect With Us</Typography>
                <Typography variant='subtitle1'>
                  Reach us at support@duckyandco.com or call us at (708)
                  297-6672.
                </Typography>
              </Box>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={6}>
            <Box className={classes.iconBox}>
              <a href='https://www.facebook.com/Ducky-Co-111575008092973/?notif_id=1643729627265123&notif_t=page_fan&ref=notif'>
                <FaFacebookF className={classes.icons} />
              </a>

              <a href='https://www.instagram.com/ducky_and_co_/'>
                <TiSocialInstagram className={classes.icons} />
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider className={classes.divider} />
      <Typography className={classes.copyright} variant='subtitle1'>
        ©{currentYear.getFullYear()} Ducky {'&'} Co. ALL RIGHTS
      </Typography>
    </Box>
  )
}

export default Footer
