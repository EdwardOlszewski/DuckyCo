// Components
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const Loader = () => {
  // Mui Style Sheet
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default Loader
