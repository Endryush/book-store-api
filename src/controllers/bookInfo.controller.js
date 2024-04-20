import NotFoundException from "../exceptions/NotFoundException.js";
import bookInfoService from "../services/bookInfo.service.js";
import { validateBookInfo } from '../helpers/validadeBookInfo.js' 

async function createBookInfo (req, res, next) {
 try {
  const bookInfo = req.body
  validateBookInfo(bookInfo)
  await bookInfoService.createBookInfo(bookInfo)

  res.status(201).send()
  logger.info(`POST IN /BOOK/INFO ${JSON.stringify(book)}`)
 } catch (error) {
  next(error)
 }
}

export default {
  createBookInfo
}