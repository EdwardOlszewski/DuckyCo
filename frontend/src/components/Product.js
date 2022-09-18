// React
import { Link } from 'react-router-dom'
// Components
import { Box, Typography, makeStyles } from '@material-ui/core'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  displayIMG: {
    backgroundColor: '#fbfbfb',
    '&:hover': {
      cursor: 'pointer',
    },
    overflow: 'hidden',
    padding: 5,
    [theme.breakpoints.up('md')]: {
      height: '80%',
    },
  },
  imgBox: {
    [theme.breakpoints.up('md')]: {
      marginTop: '-2rem',
      padding: '2rem',
    },
  },
  imgShirt: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(2) translate(-15%, 25%)',
      },
    },
  },
  imgMISC: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
  },
  imgHat: {
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        transform: 'scale(1.5)',
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
  priceCut: {
    textDecoration: 'line-through;',
    marginRight: '10px',
    color: 'red',
  },
}))

const Product = ({ product, priceCut }) => {
  // ----- init ----- //
  const classes = useStyles()

  return (
    <>
      <Link to={`/product/${product._id}`} className={classes.link}>
        <Box className={classes.displayIMG}>
          {product.category === 'MISC' ? (
            <Box className={classes.imgBox}>
              <img
                className={classes.imgMISC}
                src={product.image}
                alt={product.name}
                height='100%'
                width='100%'
                layout={'responsive'}
              />
            </Box>
          ) : product.category === 'Beanie' ? (
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
          ) : product.category === 'Hat' ? (
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

          <Typography display='inline' variant='h6'>
            ${product.price}
          </Typography>
        </Link>
      </Box>
    </>
  )
}

export default Product
