import bookInfoRepository from "../repositories/bookInfo.repository.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createBookInfo (bookInfo) {
  return await bookInfoRepository.createBookInfo(bookInfo) 
}

async function updateBookInfo (bookInfo) {
  const hasBooking = await bookInfoRepository.getBookInfo(bookInfo.bookId)
  if (!hasBooking) throw new NotFoundException('Book not found to update')

  return await bookInfoRepository.updateBookInfo(bookInfo)
}

async function getAllBooks () {
  return await bookInfoRepository.getAllBookInfo()
}

async function getBookInfo (bookId) {
  const bookInfo = await bookInfoRepository.getBookInfo(bookId)
  if (!bookInfo) throw new NotFoundException('Book with ID informed not found')

  return bookInfo
}

async function deleteBookInfo (bookId) {
  const bookInfo = await bookInfoRepository.getBookInfo(bookId)
  if (!bookInfo) throw new NotFoundException("Book Not Found")

  return await bookInfoRepository.deleteBookInfo(bookId)
}

async function createReview (review, bookId) {
  const bookInfo = await bookInfoRepository.getBookInfo(bookId)
  if (!bookInfo) throw new NotFoundException('Book with ID informed not found')

  return await bookInfoRepository.createReview(review, bookId)
}

async function deleteReview (bookId, id) {
  return await bookInfoRepository.deleteBookInfo(bookId, id)
}

export default {
  createBookInfo,
  deleteBookInfo,
  getAllBooks,
  updateBookInfo,
  getBookInfo,
  createReview,
  deleteReview
}
