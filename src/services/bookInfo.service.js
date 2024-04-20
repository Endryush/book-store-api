import bookInfoRepository from "../repositories/bookInfo.repository.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createBookInfo (bookInfo) {
  return await bookInfoRepository.createBookInfo(bookInfo) 
}

export default {
  createBookInfo
}
