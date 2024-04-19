import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateBook(book) {
  const requiredFields = ['name', 'value', 'stock', 'authorId']
  validateFieldsDefault(requiredFields, book)
}