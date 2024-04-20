import { validateSale } from "../helpers/validateSale.js"
import saleService from "../services/sale.service.js"
import NotFoundException from "../exceptions/NotFoundException.js";

async function createSale (req, res, next) {
  try {
    const sale = req.body
  
    validateSale(sale)
    await saleService.createSale(sale)
    res.status(201).send()
    logger.info(`POST IN /SALE ${JSON.stringify(sale)}`)
  } catch (error) {
    next(error)
  }
}

async function updateSale (req, res, next) {
  try {
    const sale = req.body

    if (!sale.id) throw new Error('Sale ID is required')
    validateSale(sale)

    
    res.status(200).send(await saleService.updateSale(sale))
    logger.info(`PUT IN /SALE ${JSON.stringify(sale)}`)
  } catch (error) {
    next(error)
  }
}

async function getSale (req, res, next) {
  try {
    const { id } = req.params
    const sale = await saleService.getSaleById(id)
    if(!sale) throw new NotFoundException("Sale not found")

    res.status(200).send(sale)
    logger.info(`GET IN SALE BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}

async function getAllSales (req, res, next) {
  try {
    res.status(200).send(await saleService.getAllSales(req.query))
    logger.info('GET ALL SALES')
  } catch (error) {
    next(error)
  }
}

async function deleteSale (req, res, next) {
  try {
    const { id } = req.params
    await saleService.deleteSale(id)
    res.status(204).send()
    logger.warn(`DELETE IN SALE BY ID: ${id}`)
  } catch (error) {
    next(error)
  }
}
export default {
  createSale,
  updateSale,
  getSale,
  getAllSales,
  deleteSale
}