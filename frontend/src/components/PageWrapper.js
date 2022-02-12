// Components
import { Box } from '@material-ui/core'
import Nav from '../components/Nav'
import Nav2 from '../components/Nav2'
import Footer from '../components/Footer'
import Meta from '../components/Meta'

const PageWrapper = ({ children, title }) => {
  return (
    <Box>
      <Meta title={title} />
      <Nav />

      <Box style={{ minHeight: '150vh' }}>{children}</Box>

      <Footer />
    </Box>
  )
}

export default PageWrapper
