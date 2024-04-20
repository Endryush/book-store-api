import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateBookReview(bookReview) {
  const requiredFields = ['title', 'client', 'rating', 'description']
  validateFieldsDefault(requiredFields, bookReview)
}