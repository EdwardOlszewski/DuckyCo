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
      <Typography variant={'subtitle1'} className={classes.text}>
        <Box fontWeight={800}>Free Shipping On Orders $50 Or More!</Box>
      </Typography>
    </Box>
  )
}
export default Nav
