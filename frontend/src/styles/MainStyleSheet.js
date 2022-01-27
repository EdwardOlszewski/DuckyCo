import { makeStyles } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },

  // Containers
  imgCont: {
    width: '75%',
  },
  formCont: {
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '3rem',
    width: '30rem',
  },
  productEditCont: {
    textAlign: 'center',
    margin: 'auto',
    width: '70%',
  },

  // Form Section
  form: {
    width: '100%',
  },
  input: {
    '&:-webkit-autofill': {
      '-webkit-text-fill-color': 'black',
      WebkitBoxShadow: '0 0 0 1000px white inset',
    },
  },

  // Button Section
  Btn: {
    marginTop: 30,
    width: '100%',
    padding: '1rem',
    backgroundColor: '#1e2a5a',
    color: 'white',
    boxShadow:
      ' rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
    '&:hover': {
      backgroundColor: '#374da4',
    },
  },

  // Sign up
  newUse: {
    marginTop: 10,
    display: 'inline-block',
    color: '#b3b3b3',
  },
  signUp: {
    color: 'black',
    display: 'inline-block',
    marginLeft: 10,
    cursor: 'pointer',
    '&:hover': {
      color: '#b3b3b3',
    },
  },

  // title
  title: {
    paddingTop: '2rem',
    paddingBottom: '5rem',
  },
}))

export default useStyles
