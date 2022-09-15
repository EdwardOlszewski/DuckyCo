// Components
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  IconButton,
} from '@material-ui/core'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  imageCont: {
    backgroundColor: '#fafafa',
  },
  mainGrid: {
    textAlign: 'center',
    marginTop: '2rem',
    margin: 'auto',
    width: '95%',
  },
  btn: {
    padding: '1rem',
    backgroundColor: '#007E33',
    color: 'white',
    width: '100%',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },

  // Reviews
  reviewGrid: {
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '65%',
    },
  },
  reviewBtn: {
    padding: '1rem',
    backgroundColor: '#007E33',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00b84a',
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
  trashIcon: {
    fontSize: '1.5rem',
    color: '#CC0000',
    '&:hover': {
      cursor: 'pointer',
      color: '#ff0404',
    },
  },
}))

const Color = ({ setColor, color }) => {
  // ----- init ----- //
  const classes = useStyles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h6' style={{ marginTop: '2rem' }}>
          Size
        </Typography>
      </Grid>

      <Grid item>
        <IconButton
          style={{
            fontSize: '1rem',
            color: color === 'black' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setColor('black')}
        >
          <Typography variant='h6'>Black</Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          style={{
            fontSize: '1rem',
            color: color === 'gray' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setColor('gray')}
        >
          <Typography variant='h6'>Gray</Typography>
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default Color
