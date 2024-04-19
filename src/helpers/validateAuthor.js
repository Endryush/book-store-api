export function validateAuthor(client) {
  const requiredFields = ['name', 'email', 'phone']
  const missingFields = requiredFields.filter(field => !client[field]);
  const message =  missingFields.length === 1 ?  
    `The ${ missingFields[0]} field is required` :
    `The fields ${missingFields.join(', ')} are requried`

  if (missingFields.length > 0) throw new Error(message);
}