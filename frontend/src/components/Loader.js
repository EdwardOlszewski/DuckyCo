import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

export default function SimpleBackdrop() {
  // Mui Style Sheet
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={'true'}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}