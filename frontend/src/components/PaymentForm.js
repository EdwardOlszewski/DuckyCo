// Dependencies
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'

// Components
import {
  Container,
  FormControl,
  Button,
  TextField,
  Grid,
  Typography,
  withStyles,
} from '@material-ui/core'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

// Actions
import { cardCharge } from '../actions/orderActions'
// Icons
import useStyles from '../styles/MainStyleSheet'

const PaymentForm = ({ updateBillingInfo, billingDetails, history }) => {
  const stripe = useStripe()
  const elements = useElements()

  // Mui Style Sheet
  const classes = useStyles()
  // Assign useDispatch hook
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
      var amount = parseInt(50 * 100)
      dispatch(cardCharge(id, amount, '12345'))
    }
  }

  return (
    <FormControl className={classes.form}>
      <CardElement />
      <Button
        style={{ marginTop: '2rem' }}
        type='submit'
        onClick={handleSubmit}
      >
        Submit Payment
      </Button>
    </FormControl>
  )
}

export default PaymentForm
