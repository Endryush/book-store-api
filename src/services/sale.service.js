import saleRepository from "../repositories/sale.repository.js";
import NotFoundException from "../exceptions/NotFoundException.js";

async function createSale (sale) {
  return await saleRepository.createSale(sale);
}

async function updateSale (sale) {
  if (!await getSaleById(sale.id)) throw new NotFoundException('Sale not Found')

  return await saleRepository.updateSale(sale)
}

async function getSaleById (id) {
  return await saleRepository.getSaleById(id)
}

async function getAllSales(params) {
  if (Object.entries(params).length > 0) {
    const [paramName, paramValue] = Object.entries(params)[0]
  
    return await saleRepository.getAllSalesByParams(paramName, paramValue)
  }

  return await saleRepository.getAllSales(params)
}

async function deleteSale (id) {
  if (!await getSaleById(id)) throw new NotFoundException('Sale not Found')

  return await saleRepository.deleteSale(id)
}

export default {
  createSale,
  updateSale,
  getSaleById,
  getAllSales,
  deleteSale
}