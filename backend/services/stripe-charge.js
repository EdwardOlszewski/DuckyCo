import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.SECRET_KEY)

const createCharge = async (req, res) => {
  const { id, amount, description, billingDetails } = req.body

  try {
    // get list of all customers
    const customers = await stripe.customers.list({})
    // get list of just customers
    const data = customers.data
    // init customer
    let customer = ''

    // See if the customer exists already from email
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === billingDetails.email) {
        customer = data[i].id
        console.log(customer)
      }
    }

    // create a new customer if no customer found
    if (!customer) {
      const newCustomer = await stripe.customers.create({
        name: billingDetails.name,
        email: billingDetails.email,
        address: billingDetails.address,
      })
      customer = newCustomer.id
    }

    // create a payment intent for the customer
    const payment = await stripe.paymentIntents.create({
      customer,
      amount: amount * 100,
      currency: 'USD',
      description,
      payment_method: id,
      confirm: true,
      receipt_email: billingDetails.email,
    })

    return res.status(200).json({
      confirm: 'successfull',
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: error.message,
    })
  }
}

export default createCharge
