import { validateAuthor } from "../../helpers/validateAuthor.js"
import authorService from "../services/author.service.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createAuthor (req, res, next) {
  try {
    const author = req.body
  
    validateAuthor(author)
    await authorService.createAuthor(author)
    res.status(201).send()
    logger.info(`POST IN /AUTHOR ${JSON.stringify(author)}`)
  } catch (error) {
    next(error)
  }
}

async function updateAuthor (req, res, next) {
  try {
    const author = req.body

    if (!author.id) throw new Error('Author ID is required')
    validateAuthor(author)

    
    res.status(200).send(await authorService.updateAuthor(author))
    logger.info(`PUT IN /AUTHOR ${JSON.stringify(author)}`)
  } catch (error) {
    next(error)
  }
}

async function getAuthor (req, res, next) {
  try {
    const { id } = req.params
    const author = await authorService.getAuthorById(id)
    if(!author) throw new NotFoundException("Author not found")

    res.status(200).send(author)
    logger.info(`GET IN AUTHOR BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}

async function getAllAuthors (req, res, next) {
  try {
    res.status(200).send(await authorService.getAllAuthors())
    logger.info('GET ALL AUTHORS')
  } catch (error) {
    next(error)
  }
}

async function deleteAuthor (req, res, next) {
  try {
    const { id } = req.params
    await authorService.deleteAuthor(id)
    res.status(204).send()
    logger.warn(`DELETE IN AUTHOR BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}
export default {
  createAuthor,
  updateAuthor,
  getAuthor,
  getAllAuthors,
  deleteAuthor
}