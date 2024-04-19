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

async function getAllSales() {
  return await saleRepository.getAllSales()
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