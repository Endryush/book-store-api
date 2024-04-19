import express from 'express';
import bookController from '../controllers/book.controller.js';

const router = express.Router()

router
  .post('/', bookController.createBook)
  .put('/', bookController.updateBook)
  .get('/:id', bookController.getBook)
  .get('/', bookController.getAllBooks)
  .delete('/:id', bookController.deleteBook)

export default router