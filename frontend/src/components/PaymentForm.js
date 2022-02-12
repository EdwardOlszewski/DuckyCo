// Dependencies
import { useDispatch } from 'react-redux'
// Components
import { FormControl, Button, makeStyles, Grid } from '@material-ui/core'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import useStyles from '../styles/MainStyleSheet'
// Actions
import { cardCharge } from '../actions/orderActions'

const PaymentForm = ({ amount, orderId, billingDetails, shippingDetails }) => {
  // ----- init variables ----- //
  const stripe = useStripe()
  const elements = useElements()
  const classes = useStyles()
  const dispatch = useDispatch()

  // Function called on submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails,
    })

    if (!error) {
      const { id } = paymentMethod

      dispatch(cardCharge(id, amount, orderId, billingDetails, shippingDetails))
    }
  }

  return (
    <FormControl className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <CardElement className={classes.cardForm} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Button
            style={{ marginTop: '-.1rem' }}
            className={classes.submitPaymentBtn}
            onClick={handleSubmit}
          >
            Submit Payment
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  )
}

export default PaymentForm
