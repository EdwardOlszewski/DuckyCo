// Dependencies
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
// Components
import { FormControl, Button, makeStyles, Grid } from '@material-ui/core'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import useStyles from '../styles/MainStyleSheet'
import StyledInput from './StyledInput'
// Actions
import { cardCharge } from '../actions/orderActions'
import { createOrder, getTotals } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../types/orderTypes'
// Icons
import { Navigate } from 'react-router-dom'

const PaymentForm = ({
  email,
  amount,
  orderId,
  billingDetails,
  shippingDetails,
}) => {
  // Init Stripe
  const stripe = useStripe()
  // Init Elements
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

      dispatch(cardCharge(id, amount, orderId, billingDetails, shippingDetails))
    }
  }

  return (
    <FormControl className={classes.form}>
      <Grid container spacing={7}>
        <Grid item xs={12} md={7}>
          <CardElement className={classes.cardForm} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Button className={classes.submitPaymentBtn} onClick={handleSubmit}>
            Submit Payment
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  )
}

export default PaymentForm
