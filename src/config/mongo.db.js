import mongoose from "mongoose"

async function connect () {
  const uri =  process.env.DB_MONGO
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'book_store'
  })
}

export { connect }