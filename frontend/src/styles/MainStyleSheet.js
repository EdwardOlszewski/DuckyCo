import { makeStyles } from '@material-ui/core/'

const useStyles = makeStyles((theme) => ({
  test: {
    color: 'green',
  },

  root: {
    textAlign: 'center',
  },

  // Containers
  imgCont: {
    width: '100%',
  },
  formCont: {
    textAlign: 'center',
    margin: 'auto',
    paddingTop: '2rem',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '40rem',
    },
  },
  productEditCont: {
    textAlign: 'center',
    margin: 'auto',
    width: '70%',
  },
  imageCont: {
    backgroundColor: '#fafafa',
  },
  profileCont: {
    padding: '3rem',
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
  formTitle: {
    textAlign: 'center',
    marginTop: '5rem',
  },
  cardForm: {
    margin: 'auto',
    width: '100%',
    marginTop: '2rem',
    padding: '1rem',
    paddingBottom: '1rem',
    border: 'solid #c4c4c4 2px',
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
  submitPaymentBtn: {
    margin: 'auto',
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
    paddingBottom: '5rem',
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
