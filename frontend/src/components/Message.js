// Components
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Message = ({ children, severity }) => {
  return (
    <Alert
      style={{
        width: '95%',
        margin: 'auto',
      }}
      severity={severity}
    >
      <AlertTitle>{children}</AlertTitle>
    </Alert>
  )
}

export default Message
