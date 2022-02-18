// React
import { Link } from 'react-router-dom'
// Components
import { Box, Typography, makeStyles } from '@material-ui/core'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  displayIMG: {
    backgroundColor: '#fafafa',
    '&:hover': {
      cursor: 'pointer',
    },
    overflow: 'hidden',
    padding: '1rem',
  },
  imgShirt: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(3.5) translate(-15%, 25%)',
      },
    },
  },
  imgHat: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(1.5) translate(0%, -20%)',
      },
    },
  },
  imgShorts: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(3) translate(-30%, -30%)',
      },
    },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}))

const Product = ({ product }) => {
  // ----- init ----- //
  const classes = useStyles()

  return (
    <>
      <Link to={`/product/${product._id}`} className={classes.link}>
        <Box className={classes.displayIMG}>
          {product.category === 'Hat' ? (
            <Box>
              <img
                className={classes.imgHat}
                src={product.image}
                alt={product.name}
                height='100%'
                width='100%'
                layout={'responsive'}
              />
            </Box>
          ) : product.category === 'Special' ? (
            <Box style={{ minHeight: '30rem' }}>
              <img
                className={classes.imgShirt}
                src={product.image}
                alt={product.name}
                height='100%'
                width='100%'
                layout={'responsive'}
              />
            </Box>
          ) : product.category === 'Shorts' ? (
            <Box style={{ minHeight: '32rem' }}>
              <img
                className={classes.imgShorts}
                src={product.image}
                alt={product.name}
                height='100%'
                width='100%'
                layout={'responsive'}
              />
            </Box>
          ) : product.category === 'Shirt' ? (
            <Box style={{ minHeight: '30rem' }}>
              <img
                className={classes.imgShirt}
                src={product.image}
                alt={product.name}
                height='100%'
                width='100%'
                layout={'responsive'}
              />
            </Box>
          ) : (
            <Box style={{ minHeight: '34rem' }}>
              <img
                className={classes.imgShirt}
                src={product.image}
                alt={product.name}
                height='100%'
                width='100%'
                layout={'responsive'}
              />
            </Box>
          )}
        </Box>
      </Link>
      <Box>
        <Link to={`/product/${product._id}`} className={classes.link}>
          <Typography variant='h5'>{product.name}</Typography>
          <Typography variant='h6'>${product.price}</Typography>
        </Link>
      </Box>
    </>
  )
}

export default Product
