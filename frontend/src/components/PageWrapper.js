import React from 'react'

import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Meta from '../components/Meta'

const pageWrapper = ({ children, title }) => {
  return (
    <>
      <Meta title={title} />
      <Nav />
      {children}
      <Footer />
    </>
  )
}

export default pageWrapper
