const Sequelize = require('../node_modules/sequelize');
const database = require('../db');
const Fabricante = require('./fabricante')
const CategoriaProduto = require('./categoriaProduto');
const Categoria = require('./categoria');

const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false    
    },
    preco: Sequelize.DECIMAL,
    descricao: Sequelize.STRING
})

//Relacionamento 1-1
Produto.belongsTo(Fabricante, {
    constraint: true,
    foreignKey: 'idFabricante'
})

//Relacionamento 1-N
Fabricante.hasMany(Produto, {
    foreignKey: 'idFabricante'
})

//Relacionamento N-M
Produto.belongsToMany(Categoria, {
    through:{
        model: CategoriaProduto
    },
    foreignKey: 'idProduto',
    constraint: true
})

//Relacionamento N-M
Categoria.belongsToMany(Produto, {
    through:{
        model: CategoriaProduto
    },
    foreignKey: 'idCategoria',
    constraint: true
})

//Super Many-To-Many
Produto.hasMany(CategoriaProduto, {foreignKey: 'idProduto'})
CategoriaProduto.belongsTo(Produto, {foreignKey: 'idProduto'})
Categoria.hasMany(CategoriaProduto, {foreignKey: 'idCategoria'})
CategoriaProduto.belongsTo(Categoria, {foreignKey: 'idCategoria'})

module.exports = Produto;