import bookInfoRepository from "../repositories/bookInfo.repository.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createBookInfo (bookInfo) {
  return await bookInfoRepository.createBookInfo(bookInfo) 
}

async function getAllBooks () {
  return await bookInfoRepository.getAllBookInfo()
}

async function deleteBookInfo (bookId) {
  const bookInfo = await bookInfoRepository.getBookInfo(bookId)
  if (!bookInfo) throw new NotFoundException("Book Not Found")

  return await bookInfoRepository.deleteBookInfo(bookId)
}

export default {
  createBookInfo,
  deleteBookInfo,
  getAllBooks
}
