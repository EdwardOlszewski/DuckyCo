import { useState } from 'react'
import { Box, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  displayIMG: {
    backgroundColor: '#fafafa',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))

const Product = ({ imgURL, zoomImgURL, itemName, itemPrice }) => {
  const classes = useStyles()

  const [newImgURL, setImgURL] = useState(imgURL)

  return (
    <>
      <Box className={classes.displayIMG}>
        <img
          src={newImgURL}
          alt={newImgURL}
          onMouseOver={(e) => setImgURL(zoomImgURL)}
          onMouseOut={(e) => setImgURL(imgURL)}
          height='100%'
          width='100%'
          layout={'responsive'}
        />
      </Box>

      <Box>
        <Typography variant='h5'>{itemName}</Typography>
        <Typography variant='h6'>${itemPrice}</Typography>
      </Box>
    </>
  )
}

export default Product
