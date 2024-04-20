import mongoose from "mongoose"

async function connect () {
  const uri =  process.env.DB_MONGO
  return await mongoose.connect(uri, {
    dbName: 'book_store'
  })
}

async function close () {
  return await mongoose.connection.close()
}

export { connect, close }