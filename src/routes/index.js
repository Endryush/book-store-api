import express from 'express';
import healthCheckRouter from './health-check.route.js'
import clientRouter from './client.route.js'
import basicAuthMiddleware from '../middlewares/basicAuth.js';

const router = express.Router();

router
  .use('/health-check', healthCheckRouter)
  .use('/client', clientRouter)

export default router