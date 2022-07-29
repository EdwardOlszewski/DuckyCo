// Components
import { Box } from '@material-ui/core'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import Marquee from '../components/Marquee'

const PageWrapper = ({ children, title }) => {
  return (
    <Box>
      <Meta title={title} />
      <Nav />
      <Box style={{ minHeight: '50vh' }}>{children}</Box>
      <Marquee />
      <Footer />
    </Box>
  )
}

export default PageWrapper
