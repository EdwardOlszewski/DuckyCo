// Components
import { withStyles, TextField } from '@material-ui/core'

const inputStyle = { WebkitBoxShadow: '0 0 0 1000px white inset' }

const StyledInput = withStyles({
  root: {
    width: '100%',
    '& label.Mui-focused': {
      color: '#272829',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#1e2a5a',
      },
    },
    '& .MuiInputBase-root': {
      borderRadius: 0,
      color: 'black',
      '& input': {
        fontSize: '1rem',
        borderRadius: 0,
      },
    },

    '&:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
  },
})((props) => (
  <TextField variant='outlined' inputProps={{ style: inputStyle }} {...props} />
))

export default StyledInput
