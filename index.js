//Função assincrona
(async () => {

    const database = require('./db');
    const Produto = require('./model/produto');
    const Fabricante = require('./model/fabricante')
    const Categoria = require('./model/categoria');
    await database.sync({ force: true }); //{ force: true } para recriar o BD 

    //INSERT INTO (C)
    const novoFabricante = await Fabricante.create({nome: 'Motorola'})
    const outroFabricante = await Fabricante.create({nome: 'Apple'})

    //INSERT INTO
    const novoProduto = await Produto.create({
        nome: 'Moto g1000',
        preco: 1000,
        descricao: 'Celular ruim',
        idFabricante: novoFabricante.id //Definindo relação 1-N
    })
    //console.log(novoProduto);

    //Definindo uma relação N-M com .add
    const novaCategoria = await Categoria.create({nome: 'Celular'})
    const produto = await Produto.findByPk(1)
    produto.addCategoria([novaCategoria])

    // Lazy loading: não é a melhor opção para READ, 
    // pois precisa de duas funções assíncronas para buscar a relação 
    const lazyProduto = await Produto.findByPk(1);
    const fabricanteProduto = await lazyProduto.getFabricante()
    console.log(fabricanteProduto.nome);

    // Eager loading: incluir parametros na busca. Melhor pois só usa uma função assíncrona 
    const eagerProduto = await Produto.findByPk(1, {include: Fabricante})
    console.log(eagerProduto.fabricante.nome);
 
    //SELECT *
    const produtos = await Produto.findAll();

    //SELECT buscando pela primary key
    const produtoUnico = await Produto.findByPk(1);

    //SELECT * WHERE
    const produto15 = await Produto.findAll({
        where: {
            preco: 30   
        }
    });

    //Update    
    const produtoUpdate = await Produto.findByPk(1)
    produtoUpdate.descricao = 'Alterei a descricao'
    await produtoUpdate.save() //Salvar alterações
    //console.log(produtoUpdate)

    //DELETE 
    outroFabricante.destroy()

})();