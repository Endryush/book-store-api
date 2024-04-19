import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateAuthor(author) {
  const requiredFields = ['name', 'email', 'phone']
  validateFieldsDefault(requiredFields, author)
}