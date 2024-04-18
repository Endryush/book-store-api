import { validateClient } from "../../helpers/validateClient.js"
import clientService from "../services/client.service.js"

async function createClient (req, res, next) {
  try {
    const client = req.body
  
    validateClient(client)
    await clientService.createClient(client)
    res.status(201).send()
    logger.info(`POST EM /CLIENT ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

export default {
  createClient
}