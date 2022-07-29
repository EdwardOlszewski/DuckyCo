// React/Redux
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// Components
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
} from '@material-ui/core'
import StyledInput from '../components/StyledInput'
import PageWrapper from '../components/PageWrapper'
import Loader from '../components/Loader'
// Actions
import {
  getQuestionDetails,
  updateQuestionToAnswered,
} from '../actions/questionActions'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '8rem',
  },
  text: {
    paddingTop: '2rem',
  },
  title: {
    paddingTop: '2rem',
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  contactText: {
    fontWeight: 300,
    marginTop: '1rem',
    paddingLeft: 3,
    [theme.breakpoints.up('xs')]: {
      textAlign: 'center',
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  btn: {
    backgroundColor: '#007E33',
    color: 'white',
    marginTop: '3rem',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
    },

    '&:hover': {
      backgroundColor: '#00b84a',
    },
  },
}))

const HomeScreen = () => {
  // ----- init ----- //
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const questionId = useParams().id

  // ----- state variables ----- //
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // ----- get data from redux store ----- //
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const questionDetails = useSelector((state) => state.questionDetails)
  const { question, loading, success, error } = questionDetails

  const questionAnswered = useSelector((state) => state.questionAnswered)
  const { success: answeredSuccess } = questionAnswered

  const answerQuestionHandler = () => {
    dispatch(updateQuestionToAnswered(question))
  }

  // ----- use effect hook ----- //
  useEffect(() => {
    if (!userInfo) {
      navigate(`/login`, { replace: true })
    } else if (!question || question._id !== questionId) {
      dispatch(getQuestionDetails(questionId))
    }
  }, [dispatch, navigate, questionId, question, userInfo, answeredSuccess])

  return (
    <PageWrapper>
      <Container maxWidth='lg' className={classes.root}>
        {success && (
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography variant='h3' className={classes.title}>
                {question.firstName} {question.lastName}
              </Typography>
              <Typography variant='h5' className={classes.contactText}>
                <a
                  style={{
                    textDecoration: 'none',
                    color: '#f0491c',
                    fontWeight: 400,
                  }}
                  href={`mailto:${question.email}`}
                >
                  {question.email}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container>
                <Grid item>
                  <Typography variant='subtitle1' className={classes.text}>
                    {question.message}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.btn}
                    onClick={answerQuestionHandler}
                  >
                    Answered
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </PageWrapper>
  )
}

export default HomeScreen
