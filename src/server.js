import express from "express";
import cors from 'cors'
import logger from './logger.js'
import routes from './routes/index.js'

const app = express()

app
  .use(express.json())
  .use(cors())
  .use('/api', routes)
  .use((error, req, res, next) => {
    logger.error(`Error processing request: ${req.method} - ${req.baseUrl} - ${error.message ?? JSON.stringify(error)}`)
    res.status(400).send({ error: error.message ?? error })
  })

export default app