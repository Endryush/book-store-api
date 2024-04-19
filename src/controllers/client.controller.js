import { validateClient } from "../helpers/validateClient.js"
import clientService from "../services/client.service.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createClient (req, res, next) {
  try {
    const client = req.body
  
    validateClient(client)
    await clientService.createClient(client)
    res.status(201).send()
    logger.info(`POST IN /CLIENT ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

async function updateClient (req, res, next) {
  try {
    const client = req.body

    if (!client.id) throw new Error('Client ID is required')
    validateClient(client)

    
    res.status(200).send(await clientService.updateClient(client))
    logger.info(`PUT IN /CLIENT ${JSON.stringify(client)}`)
  } catch (error) {
    next(error)
  }
}

async function getClient (req, res, next) {
  try {
    const { id } = req.params
    const client = await clientService.getClientById(id)
    if(!client) throw new NotFoundException("Client not found")

    res.status(200).send(client)
    logger.info(`GET IN CLIENT BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}

async function getAllClients (req, res, next) {
  try {
    res.status(200).send(await clientService.getAllClients())
    logger.info('GET ALL CLIENTS')
  } catch (error) {
    next(error)
  }
}

async function deleteClient (req, res, next) {
  try {
    const { id } = req.params
    await clientService.deleteClient(id)
    res.status(204).send()
    logger.warn(`DELETE IN CLIENT BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}
export default {
  createClient,
  updateClient,
  getClient,
  getAllClients,
  deleteClient
}