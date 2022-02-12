// Components
import { Box } from '@material-ui/core'
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

      <Box style={{ minHeight: '150vh' }}>{children}</Box>

      <Marquee />
      <Footer />
    </Box>
  )
}

export default PageWrapper
