import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateSale(sale) {
  const requiredFields = ['date', 'value', 'clientId', 'bookId']
  validateFieldsDefault(requiredFields, sale)
}