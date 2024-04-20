import Sequelize from 'sequelize'
import db from '../config/db.js'
import Client from './client.model.js'
import Book from './book.model.js'
import Author from './author.model.js'

const Sale = db.define('sale', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  }
}, { timestamps: true, underscored: true })

Sale.belongsTo(Client, { foreignKey: 'clientId' })
Sale.belongsTo(Book, { foreignKey: 'bookId' })
Sale.belongsTo(Author, { foreignKey: 'authorId' })

export default Sale