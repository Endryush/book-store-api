import Client from "../models/client.model.js"

async function createClient (client) {
  try {
    return await Client.create(client)
  } catch (error) {
    throw error
  }
}

async function updateClient (client) {
  try {
    await Client.update(client, {
      where: { id: client.id }
    })

    return await getClientById(client.id)
  } catch (error) {
    throw error
  }
}

async function getAllClients () {
  try {
    return await Client.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getClientById (id) {
  try {
    return await Client.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function deleteClient (id) {
  try {
    return await Client.destroy({
      where: { id }
    })
  } catch (error) {
    throw error
  }
}


export default {
  createClient,
  updateClient,
  getClientById,
  getAllClients,
  deleteClient
}