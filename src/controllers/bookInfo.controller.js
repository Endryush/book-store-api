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

async function updateBookInfo (req, res, next) {
  try {
    const bookInfo = req.body
    validateBookInfo(bookInfo)
    await bookInfoService.updateBookInfo(bookInfo)

    res.status(200).send(bookInfo)
    logger.info(`PUT /book/info ${bookInfo}`)
  } catch (error) {
    next(error)
  }
}

async function getAllBooks (req, res, next) {
  try {
    res.status(200).send(await bookInfoService.getAllBooks())
    logger.info('GET All BookInfo in /book/info')
  } catch (error) {
    next(error)
  }
}

async function getBookInfo (req, res, next) {
  try {
    const { id }  = req.params

    res.status(200).send(await bookInfoService.getBookInfo(id))
  } catch (error) {
    next(error)
  }
}

async function deleteBookInfo (req, res, next) {
  try {
    const bookId = parseInt(req.params.id)

    if (!bookId) throw new Error('Invalid Book Id')
    await bookInfoService.deleteBookInfo(bookId)

    res.status(204).send()
    logger.warn(`DELETE BOOKINFO BY ID: ${bookId}`)
  } catch (error) {
    next(error)
  }
}

export default {
  createBookInfo,
  deleteBookInfo,
  getAllBooks,
  updateBookInfo,
  getBookInfo
}