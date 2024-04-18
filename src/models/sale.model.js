import Sequelize from 'sequelize'
import db from '../repositories/db.js'
import Client from './client.model.js'
import Book from './book.model.js'

const Book = db.define('books', {
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
}, { timestamps: true })

Book.belongsTo(Client, { foreignKey: 'clientId' })
Book.belongsTo(Book, { foreignKey: 'bookId' })

export default Book