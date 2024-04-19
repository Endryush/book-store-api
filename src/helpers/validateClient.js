import validateFieldsDefault from "./validateFieldsDefault.js"

export function validateClient(client) {
  const requiredFields = ['name', 'email', 'phone', 'password', 'address']
  validateFieldsDefault(requiredFields, client)
}