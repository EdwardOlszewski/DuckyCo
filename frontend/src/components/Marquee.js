// Components
import { Box, makeStyles } from '@material-ui/core'
import Marquee from 'react-fast-marquee'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  marquee: {
    marginTop: '10rem',
    width: '100%',
  },
}))

const MarqueeComp = () => {
  // ----- init ----- //
  const classes = useStyles()
  const array = []

  for (let i = 1; i <= 9; i++) {
    array.push('bottomPicture' + i)
  }

  return (
    <Marquee
      className={classes.marquee}
      play={true}
      speed={50}
      gradient={false}
      pauseOnHover={false}
    >
      {array.map((image) => (
        <Box key={image} style={{ backgroundColor: '#2f2f2f' }}>
          <img
            src={`/images/${image}.jpg`}
            alt={image}
            width='300'
            height='350'
          />
        </Box>
      ))}
    </Marquee>
  )
}

export default MarqueeComp
