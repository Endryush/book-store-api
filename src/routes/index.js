import express from 'express';
import healthCheckRouter from './health-check.route.js'
import clientRouter from './client.route.js'
import authorRoute from './author.route.js'
import bookRoute from './book.route.js'
import saleRoute from './sale.route.js'
import basicAuthMiddleware from '../middlewares/basicAuth.js';

const router = express.Router();

router
  .use('/health-check', basicAuthMiddleware, healthCheckRouter)
  .use('/client', basicAuthMiddleware, clientRouter)
  .use('/author', basicAuthMiddleware, authorRoute)
  .use('/book', basicAuthMiddleware, bookRoute)
  .use('/sale', basicAuthMiddleware, saleRoute)

export default router