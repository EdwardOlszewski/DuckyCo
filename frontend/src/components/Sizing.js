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

const Sizing = ({ category, setSize, size }) => {
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
            color: size === 'small' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setSize('small')}
        >
          <Typography variant='h6'> S</Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          style={{
            fontSize: '1rem',
            color: size === 'medium' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setSize('medium')}
        >
          <Typography variant='h6'> M</Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          style={{
            fontSize: '1rem',
            color: size === 'large' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setSize('large')}
        >
          <Typography variant='h6'> L</Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          style={{
            fontSize: '1rem',
            color: size === '1XL' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setSize('1XL')}
        >
          <Typography variant='h6'> 1XL</Typography>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton
          style={{
            fontSize: '1rem',
            color: size === '2XL' && 'black',
            padding: '.5rem 1rem .5rem 1rem',
          }}
          onClick={(e) => setSize('2XL')}
        >
          <Typography variant='h6'> 2XL</Typography>
        </IconButton>
      </Grid>

      {category == 'Shirt' && (
        <Grid item>
          <IconButton
            style={{
              fontSize: '1rem',
              color: size === '3XL' && 'black',
              padding: '.5rem 1rem .5rem 1rem',
            }}
            onClick={(e) => setSize('3XL')}
          >
            <Typography variant='h6'> 3XL</Typography>
          </IconButton>
        </Grid>
      )}
    </Grid>
  )
}

export default Sizing
