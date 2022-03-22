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
    [theme.breakpoints.up('md')]: {
      height: '80%',
    },
  },
  imgBox: {
    [theme.breakpoints.up('md')]: {
      padding: '3rem',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '5rem',
    },
  },
  imgShirt: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(2) translate(-15%, 25%)',
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
        transform: 'scale(2) translate(-30%, -30%)',
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
            <Box className={classes.imgBox}>
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
            <Box className={classes.imgBox}>
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
            <Box className={classes.imgBox}>
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
            <Box className={classes.imgBox}>
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
            <Box className={classes.imgBox}>
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
          <Typography variant='h6'>{product.name}</Typography>
          <Typography variant='h6'>${product.price}</Typography>
        </Link>
      </Box>
    </>
  )
}

export default Product
