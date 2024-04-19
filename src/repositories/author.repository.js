import Author from "../models/author.model.js"

async function createAuthor (author) {
  try {
    return await Author.create(author)
  } catch (error) {
    throw error
  }
}

async function updateAuthor (author) {
  try {
    await Author.update(author, {
      where: { id: author.id }
    })

    return await getAuthorById(author.id)
  } catch (error) {
    throw error
  }
}

async function getAllAuthors () {
  try {
    return await Author.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getAuthorById (id) {
  try {
    return await Author.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function deleteAuthor (id) {
  try {
    return await Author.destroy({
      where: { id }
    })
  } catch (error) {
    throw error
  }
}


export default {
  createAuthor,
  updateAuthor,
  getAuthorById,
  getAllAuthors,
  deleteAuthor
}