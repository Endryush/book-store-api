import clientRepository from "../../repositories/client.repository.js";

async function createClient (client) {
  return await clientRepository.createClient(client);
}


export default {
  createClient
}