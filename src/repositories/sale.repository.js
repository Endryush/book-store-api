import Sale from "../models/sale.model.js"

async function createSale (sale) {
  try {
    return await Sale.create(sale)
  } catch (error) {
    throw error
  }
}

async function updateSale (sale) {
  try {
    await Sale.update(sale, {
      where: { id: sale.id }
    })

    return await getSaleById(sale.id)
  } catch (error) {
    throw error
  }
}

async function getAllSales () {
  try {
    return await Sale.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function getSaleById (id) {
  try {
    return await Sale.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error
  }
}

async function deleteSale (id) {
  try {
    return await Sale.destroy({
      where: { id }
    })
  } catch (error) {
    throw error
  }
}


export default {
  createSale,
  updateSale,
  getSaleById,
  getAllSales,
  deleteSale
}