import bookRepository from "../repositories/book.repository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

async function createBook (book) {
  return await bookRepository.createBook(book);
}

async function updateBook (book) {
  if (!await getBookById(book.id)) throw new NotFoundException('Book not Found')

  return await bookRepository.updateBook(book)
}

async function getBookById (id) {
  return await bookRepository.getBookById(id)
}

async function getAllBooks() {
  return await bookRepository.getAllBooks()
}

async function deleteBook (id) {
  if (!await getBookById(id)) throw new NotFoundException('Book not Found')

  return await bookRepository.deleteBook(id)
}

export default {
  createBook,
  updateBook,
  getBookById,
  getAllBooks,
  deleteBook
}