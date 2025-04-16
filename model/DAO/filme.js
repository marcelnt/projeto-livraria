/**************************************************************************************************************
 * Objetivo: Arquivo responsável pelo acesso ao Banco de dados MySQL, aqui faremos o CRUD na tabela de Filme
 * Data: 01/02/2024
 * Autor: Marcel
 * Versão: 1.0
 * 
 **************************************************************************************************************/

//Import da biblioteca do prisma client para manipular scripts SQL
const { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
const prisma = new PrismaClient();

//Função para inserir um filme no BD
const insertLivro = async function(dadosFilme){

    try {
 
        let sql;

          
            sql = `insert into tbl_livro (  title,
                                            subtitle,
                                            image,
                                            price
                ) values (
                                                '${dadosFilme.title}',
                                                '${dadosFilme.subtitle}',
                                                '${dadosFilme.image}',
                                                '${dadosFilme.price}'
                )`;
       
        //$executeRawUnsafe() - serve para executar scripts sem retorno de dados 
            //(insert, update e dele)
        //$queryRawUnsafe() - serve para executar scripts com retorno de dados (select)
        let result = await prisma.$executeRawUnsafe(sql);

        if(result)
            return true;
        else
            return false;

    } catch (error) {
        return false;    
    }



}

//Função para atualizar um filme no BD
const updateLivro = async function(){

}

//Função para excluir um filme no BD
const deleteLivro = async function(){

}

//Função para Listar todos os filmes do BD
const selectAllLivros = async function(){

    //Script SQL para o Banco de dados
    let sql = 'select * from tbl_livro';

    //$queryRawUnsafe(sql)
    //$queryRaw('select * from tbl_filme')

    //Executa o script SQL no Banco de dados e recebe o retorno dos dados
    let rsFilmes = await prisma.$queryRawUnsafe(sql);

    //Validação para retornar os dados
    if(rsFilmes.length > 0)
        return rsFilmes;
    else
        return false;
}

//Função para buscar uma filme no BD filtrando pelo ID
const selectByIdLivro = async function(id){
    try {
        //Script SQL para filtrar pelo ID
        let sql = `select * from tbl_livro where id = ${id}`;
    
        //Executa o SQL no Banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql);

        return rsFilme;

    } catch (error) {
        return false;
    }
    
    
}

module.exports = {
    insertLivro,
    updateLivro, 
    deleteLivro,
    selectAllLivros,
    selectByIdLivro
}