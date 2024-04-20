import Sequelize from 'sequelize'
import db from '../config/db.js'
import Author from './author.model.js'

const Book = db.define('books', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  value: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, { timestamps: true, underscored: true })

Book.belongsTo(Author, { foreignKey: 'authorId' })

export default Book