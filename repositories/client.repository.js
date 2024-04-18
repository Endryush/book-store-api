import Client from "../src/models/client.model.js"

async function createClient (client) {
  try {
    return await Client.create(client)
  } catch (error) {
    throw error
  }
}

export default {
  createClient
}