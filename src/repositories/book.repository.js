import Book from "../models/book.model.js"

async function createBook (book) {
  try {
    return await Book.create(book)
  } catch (error) {
    throw error
  }
}

async function updateBook (book) {
  try {
    await Book.update(book, {
      where: { id: book.id }
    })

    return await getBookById(book.id)
  } catch (error) {
    throw error
  }
}

async function getAllBooks () {
  try {
    return await Book.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getAllBooksByAuthorId (value) {
  try {
    return await Book.findAll({
      where: { authorId: value },
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getBookById (id) {
  try {
    return await Book.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function deleteBook (id) {
  try {
    return await Book.destroy({
      where: { id }
    })
  } catch (error) {
    throw error
  }
}


export default {
  createBook,
  updateBook,
  getBookById,
  getAllBooks,
  deleteBook,
  getAllBooksByAuthorId
}