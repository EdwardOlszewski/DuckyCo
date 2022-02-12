import { Box, makeStyles } from '@material-ui/core'
import Marquee from 'react-fast-marquee'

const useStyles = makeStyles((theme) => ({
  marquee: {
    marginTop: '10rem',
    width: '100%',
  },
}))

export default function MarqueeComp() {
  // Mui Style Sheet
  const classes = useStyles()

  const array = []

  for (let i = 1; i <= 7; i++) {
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
        <Box style={{ backgroundColor: '#2f2f2f' }}>
          <img
            src={`/images/${image}.jpg`}
            alt='whatever'
            width='300'
            height='350'
          />
        </Box>
      ))}
    </Marquee>
  )
}