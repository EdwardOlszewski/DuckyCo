// Components
import {
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Container,
} from '@material-ui/core'

// ----- mui styles ----- //
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  icon: {
    '&$activeIcon': {
      color: '#f0491c',
    },
    '&$completedIcon': {
      color: '#f0491c',
    },
  },
  activeIcon: {
    color: '#f0491c',
  },
  completedIcon: {
    color: '#f0491c',
  },
}))

const CheckoutSteps = ({ activeStep }) => {
  // ----- init ----- //
  const classes = useStyles()
  const steps = ['Shipping', 'Review', 'Payment']

  return (
    <Container>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className={classes.stepper}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                classes: {
                  root: classes.icon,
                  active: classes.activeIcon,
                  completed: classes.completedIcon,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Container>
  )
}

export default CheckoutSteps
