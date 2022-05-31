const Sequelize = require('sequelize');
const database = require('../db');

const Categoria = database.define('categoriaProduto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    }
})

module.exports = Categoria;