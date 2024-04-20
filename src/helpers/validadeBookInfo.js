import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateBookInfo(bookInfo) {
  const requiredFields = ['bookId', 'category', 'pages', 'description', 'author']
  validateFieldsDefault(requiredFields, bookInfo)
}