import express from 'express';
import clientController from '../controllers/client.controller.js';

const router = express.Router()

router
  .post('/', clientController.createClient)
  .put('/', clientController.updateClient)
  .get('/:id', clientController.getClient)
  .get('/', clientController.getAllClients)
  .delete('/:id', clientController.deleteClient)

export default router