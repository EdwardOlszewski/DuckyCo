import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Ducky&Co',
  description: 'Ducky&Co Official Website',
  keywords: 'Merch, Gear, Ducky, Ducks, Ducky&Co',
}

export default Meta
