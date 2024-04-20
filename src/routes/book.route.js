import express from 'express';
import bookController from '../controllers/book.controller.js';
import bookInfoController from '../controllers/bookInfo.controller.js';

const router = express.Router()

router
  .post('/', bookController.createBook)
  .post('/info', bookInfoController.createBookInfo)
  .post('/:id/review', bookInfoController.createReview)
  .put('/', bookController.updateBook)
  .put('/info', bookInfoController.updateBookInfo)
  .get('/', bookController.getAllBooks)
  .get('/:id', bookController.getBook)
  .get('/info/all', bookInfoController.getAllBooks)
  .get('/info/:id', bookInfoController.getBookInfo)
  .delete('/:id', bookController.deleteBook)
  .delete('/info/:id', bookInfoController.deleteBookInfo)
  .delete('/:bookId/review/:id', bookInfoController.deleteReview)

export default router