import express from 'express';
import authorController from '../controllers/author.controller.js';

const router = express.Router()

router
  .post('/', authorController.createAuthor)
  .put('/', authorController.updateAuthor)
  .get('/:id', authorController.getAuthor)
  .get('/', authorController.getAllAuthors)
  .delete('/:id', authorController.deleteAuthor)

export default router