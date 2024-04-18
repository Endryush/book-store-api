import express from 'express';

const router = express.Router()

router
  .get('/', (req, res) => {
    try {
      res.status(200).send('Server is running')
      logger.info('get /health-check')
    } catch (error) {
      res.status(500).send(`Error: ${error}`)
    }
  })

export default router