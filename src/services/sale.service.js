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
    return await getSalesByParams(params)
  }

  return await saleRepository.getAllSales(params)
}

async function getSalesByParams(params) {
  const [paramName, paramValue] = Object.entries(params)[0]

  if (['bookId', 'clientId'].includes(paramName)) {
    const sales = await saleRepository.getAllSalesByParams(paramName, paramValue)
    if (sales.length === 0) throw new NotFoundException(`No sales found with ${paramName}=${paramValue}`);

    return sales
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