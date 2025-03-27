
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// khi chua connect thi se la null
let trelloDatabaseInstance = null

//khoi tao doi tuong mongoClientInstance de connect den mongodb
const mongoClientInstance = new MongoClient( env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  // connect voi MongoDB Atlas voi URI da duoc khai bao o tren
  await mongoClientInstance.connect()

  // connect thanh cong lay ra db va gan nguoc lai cho trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first!')
  return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}


