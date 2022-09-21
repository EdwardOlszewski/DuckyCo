// Components
import { Box, makeStyles, Typography, Container } from '@material-ui/core'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'black',
    padding: '.2rem',
    textAlign: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
  },
  text: {
    color: 'white',
  },
}))

const Nav = (props) => {
  // ----- init ----- //
  const classes = useStyles()

  return (
    <Box className={classes.root} fontWeight={800}>
      <Typography variant={'subtitle2'} className={classes.text}>
        <Box fontWeight={500}>FREE SHIPPING ON ORDERS $50 OR MORE!</Box>
      </Typography>
      <Typography variant={'subtitle2'} className={classes.text}>
        <Box fontWeight={400} style={{ marginTop: '.5rem' }}>
          DUE TO HIGH VOLUME ALL ORDERS PLACED BEFORE 9/20/22 WILL BE PROCESSED
          9/26/22
        </Box>
      </Typography>
    </Box>
  )
}
export default Nav
