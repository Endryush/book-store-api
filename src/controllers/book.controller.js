import { validateBook } from "../helpers/validateBook.js"
import bookService from "../services/book.service.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createBook (req, res, next) {
  try {
    const book = req.body
  
    validateBook(book)
    await bookService.createBook(book)
    res.status(201).send()
    logger.info(`POST IN /AUTHOR ${JSON.stringify(book)}`)
  } catch (error) {
    next(error)
  }
}

async function updateBook (req, res, next) {
  try {
    const book = req.body

    if (!book.id) throw new Error('Book ID is required')
    validateBook(book)

    
    res.status(200).send(await bookService.updateBook(book))
    logger.info(`PUT IN /AUTHOR ${JSON.stringify(book)}`)
  } catch (error) {
    next(error)
  }
}

async function getBook (req, res, next) {
  try {
    const { id } = req.params
    const book = await bookService.getBookById(id)
    if(!book) throw new NotFoundException("Book not found")

    res.status(200).send(book)
    logger.info(`GET IN AUTHOR BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}

async function getAllBooks (req, res, next) {
  try {
    res.status(200).send(await bookService.getAllBooks(req.query.authorId))
    logger.info('GET ALL AUTHORS')
  } catch (error) {
    next(error)
  }
}

async function deleteBook (req, res, next) {
  try {
    const { id } = req.params
    await bookService.deleteBook(id)
    res.status(204).send()
    logger.warn(`DELETE IN AUTHOR BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}
export default {
  createBook,
  updateBook,
  getBook,
  getAllBooks,
  deleteBook
}