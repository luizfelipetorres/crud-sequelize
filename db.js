//Importa o ORM Sequelize
const Sequelize = require('sequelize');

//Configura a conexão com o banco de dados
const sequelize = new Sequelize('crud', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
})

//Exporta
module.exports = sequelize;