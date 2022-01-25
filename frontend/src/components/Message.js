import { useState } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Message = ({ children, severity }) => {
  // Declare new state variables using useState hook
  const [bgColor, setBgColor] = useState('#f8d0d1')

  return (
    <Alert
      style={{
        backgroundColor: bgColor,
        width: '100%',
        margin: 'auto',
      }}
      severity={severity}
    >
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  )
}

export default Message
