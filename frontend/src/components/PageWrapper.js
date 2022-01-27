import { Box } from '@material-ui/core'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Meta from '../components/Meta'

const pageWrapper = ({ children, title }) => {
  return (
    <>
      <Meta title={title} />
      <Nav />
      <Box style={{ minHeight: '55vh' }}>{children}</Box>
      <Footer />
    </>
  )
}

export default pageWrapper
