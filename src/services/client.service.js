import clientRepository from "../repositories/client.repository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

async function createClient (client) {
  return await clientRepository.createClient(client);
}

async function updateClient (client) {
  if (!await getClientById(client.id)) throw new NotFoundException('Client not Found')

  return await clientRepository.updateClient(client)
}

async function getClientById (id) {
  return await clientRepository.getClientById(id)
}

async function getAllClients() {
  return await clientRepository.getAllClients()
}

async function deleteClient (id) {
  if (!await getClientById(id)) throw new NotFoundException('Client not Found')

  return await clientRepository.deleteClient(id)
}

export default {
  createClient,
  updateClient,
  getClientById,
  getAllClients,
  deleteClient
}