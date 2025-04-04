/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { corsOptions} from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import 'dotenv/config'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errHandlingMiddleware'

const START_SERVER = () => {
  const app = express()
  app.use(cors(corsOptions))
  // Enable req.body to be parsed as JSON
  app.use(express.json())
  // use APIs v1
  app.use('/v1', APIs_V1)
  // Middleware xu li loi tap trung
  app.use(errorHandlingMiddleware)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, Server is running Successful!  ${env.APP_HOST}:${env.APP_PORT}/`)
  })
  exitHook(() => {
    console.log('4. Server is shutting down...')
    CLOSE_DB()
  })
}

// console.log('1. Connecting to MongoDB...')
// // connect db -> start server
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB successfully!'))
//   .then(() => START_SERVER())
//   .catch( error => {
//     console.log('error', error)
//     process.exit(0)
//   })

// IIFE - Immediately Invoked Function Expression
(async () => {
  try {
    console.log('1. Connecting to MongoDB...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB successfully!')
    START_SERVER()
  } catch (error) {
    console.log('error', error)
    process.exit(0)
  }
})()

