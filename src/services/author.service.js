import authorRepository from "../repositories/author.repository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

async function createAuthor (author) {
  return await authorRepository.createAuthor(author);
}

async function updateAuthor (author) {
  if (!await getAuthorById(author.id)) throw new NotFoundException('Author not Found')

  return await authorRepository.updateAuthor(author)
}

async function getAuthorById (id) {
  return await authorRepository.getAuthorById(id)
}

async function getAllAuthors() {
  return await authorRepository.getAllAuthors()
}

async function deleteAuthor (id) {
  if (!await getAuthorById(id)) throw new NotFoundException('Author not Found')

  return await authorRepository.deleteAuthor(id)
}

export default {
  createAuthor,
  updateAuthor,
  getAuthorById,
  getAllAuthors,
  deleteAuthor
}