import express from 'express';
import healthCheckRouter from './health-check.route.js'
import clientRouter from './client.route.js'
import authorRoute from './author.route.js'
import bookRoute from './book.route.js'
import basicAuthMiddleware from '../middlewares/basicAuth.js';

const router = express.Router();

router
  .use('/health-check', healthCheckRouter)
  .use('/client', clientRouter)
  .use('/author', authorRoute)
  .use('/book', bookRoute)

export default router