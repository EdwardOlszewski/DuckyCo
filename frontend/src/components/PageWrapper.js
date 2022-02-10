// Components
import { Box, Fade } from '@material-ui/core'
import Nav from '../components/Nav'
import Nav2 from '../components/Nav2'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import Marquee from '../components/Marquee'

const PageWrapper = ({ children, title }) => {
  return (
    <Box>
      <Meta title={title} />
      <Nav />
      <Fade in={true} timeout={500}>
        <Box style={{ minHeight: '150vh' }}>{children}</Box>
      </Fade>
      <Marquee />
      <Footer />
    </Box>
  )
}

export default PageWrapper
