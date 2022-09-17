import { ApiClient, ListsSegments } from 'klaviyo-sdk'
import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'

dotenv.config()

const defaultClient = ApiClient.instance

const ApiKeyAuth = defaultClient.authentications['ApiKeyAuth']
ApiKeyAuth.apiKey = process.env.KLAVPRIVATEKEY

const addToList = asyncHandler(async (req, res) => {
  const opts = {
    profiles: [
      {
        email: 'yaboyg@gmail.com',
        'First Name': 'George',
        'Last Name': 'Washington',
      },
    ],
  }

  ListsSegments.addMembers('TY3GzA', opts)
})

export { addToList }
