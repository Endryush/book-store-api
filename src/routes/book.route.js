import express from 'express';
import bookController from '../controllers/book.controller.js';
import bookInfoController from '../controllers/bookInfo.controller.js';

const router = express.Router()

router
  .post('/', bookController.createBook)
  .post('/info', bookInfoController.createBookInfo)
  .put('/', bookController.updateBook)
  .get('/', bookController.getAllBooks)
  .get('/:id', bookController.getBook)
  .delete('/:id', bookController.deleteBook)
  .delete('/info/:id', bookInfoController.deleteBookInfo)

export default router