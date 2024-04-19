import express from 'express';
import saleController from '../controllers/sale.controller.js';

const router = express.Router()

router
  .post('/', saleController.createSale)
  .put('/', saleController.updateSale)
  .get('/:id', saleController.getSale)
  .get('/', saleController.getAllSales)
  .delete('/:id', saleController.deleteSale)

export default router