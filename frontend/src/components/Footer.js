import {
  Box,
  Typography,
  Grid,
  Container,
  Divider,
  makeStyles,
} from '@material-ui/core'
import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#111111',
    display: 'flex',
    minHeight: '30vh',
    flexDirection: 'column',
    marginTop: 200,
  },
  cont: {
    marginTop: 50,
    color: 'white',
    textAlign: 'center',
  },

  //Connect
  connectBox: {
    width: '50%',
    margin: 'auto',
    textAlign: 'left',
  },

  //Icons
  iconBox: {
    textAlign: 'center',
  },
  icons: {
    fontSize: 20,
    marginLeft: 40,
    backgroundColor: '#7e7e7e',
    borderRadius: 100,
    padding: 5,
    color: '#111111',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#5f5f5f',
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
  // assign Mui style sheet
  const classes = useStyles()
  // get current year
  const currentYear = new Date()

  return (
    <Box className={classes.root}>
      <Container className={classes.cont} maxWidth='xl'>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box className={classes.connectBox}>
              <Typography variant='h4'>Connect With Us</Typography>
              <Typography variant='subtitle1'>
                Reach us at support@Ducky&Co.com or call <br />
                us at (708) 904-8915.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box className={classes.iconBox}>
              <FaFacebookF className={classes.icons} />
              <FaTwitter className={classes.icons} />
              <TiSocialInstagram className={classes.icons} />
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
